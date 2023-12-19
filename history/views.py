import json
import time
from django.http import JsonResponse
from history.models import History, Prompt
from rest_framework.views import APIView
from history.forms import HistoryForm
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from openai import OpenAI
import os
#test

OpenAI.api_key = os.environ.get('OPENAI_API_KEY')

client = OpenAI(organization='org-o3IP2SrQdimuzRhvZu8A07Bp', api_key=OpenAI.api_key)


class HistoryView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        form = HistoryForm(request.POST, request.FILES)

        if History.objects.filter(user_id=request.POST['user_id']).count() >= 10:
            History.objects.filter(user_id=request.POST['user_id']).order_by('pk').first().delete()

        if form.is_valid():
            instance = form.save(commit=False)
            instance.is_file_exist = 'file' in request.FILES
            instance.save()

            last_data = History.objects.order_by('-created_at').first()
            print(last_data.id)
            response = {
                'is_success': True,
                'result': {'history_id': last_data.id}
            }
            return JsonResponse(response, status=status.HTTP_200_OK)
        else:
            response = {
                'is_success': False,
                'message': form.errors
            }
            return JsonResponse(response, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        history_list = list(History.objects.all().values())
        response = {
            'is_success': True,
            'result': {'history_list': history_list}
        }
        return JsonResponse(response, status=status.HTTP_200_OK)


class HistoryDeleteGetView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, history_id):
        prompt_list = list(Prompt.objects.filter(history_id=history_id).values())
        history: History
        try:
            history = get_object_or_404(History, pk=history_id)
        except:
            response = {
                'is_success': False,
                'message': {'message': 'History not exist'}
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        if history.file:
            language = ''
            with open('source_files/' + history.file.name, 'r', encoding='UTF8') as file:
                file_content = file.read()
                language = file.name[file.name.index('.') + 1:].upper()
                if language == 'CPP':
                    language = 'C++'
                elif language == 'CS':
                    language = 'C#'
                elif language == 'JS':
                    language = 'Java Script'
                elif language == 'PY':
                    language = 'Python'
                elif language == 'KT':
                    language = 'Kotlin'
            if not prompt_list:
                response = {
                    'is_success': True,
                    'result': {
                        'title': history.title,
                        'source_code': file_content,
                        'language': language
                    }
                }
                return JsonResponse(response, status=status.HTTP_200_OK)
            else:
                response = {
                    'is_success': True,
                    'result': {
                        'title': history.title,
                        'source_code': file_content,
                        'prompt_list': prompt_list,
                        'language': language
                    }
                }
                return JsonResponse(response, status=status.HTTP_200_OK)
        else:
            if not prompt_list:
                response = {
                    'is_success': True,
                    'result': {
                        'title': history.title
                    }
                }
                return JsonResponse(response, status=status.HTTP_200_OK)
            else:
                response = {
                    'is_success': True,
                    'result': {
                        'title': history.title,
                        'prompt_list': prompt_list
                    }
                }
                return JsonResponse(response, status=status.HTTP_200_OK)

    def delete(self, request, history_id):
        history = get_object_or_404(History, pk=history_id)
        history.delete()
        response = {
            'is_success': True,
            'result': {'message': 'History delete success'}
        }
        return JsonResponse(response, status=status.HTTP_200_OK)


class PromptPostView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        history = History.objects.get(id=data["history_id"])

        # 파일 없는 경우
        if history.is_file_exist == False:
            response = client.chat.completions.create(
                model="gpt-4-1106-preview",
                messages=[
                    {"role": "user",
                     "content": data["user_message"]}
                ]
            )
            print(response.choices[0].message.content)
            answer = response.choices[0].message.content

        # 파일 있는 경우
        else:
            # my_assistant = client.beta.assistants.retrieve("asst_i0FVYvdkKY4ht9OjPjYVUTKn")
            assistant_files = client.beta.assistants.files.list(
                assistant_id="asst_i0FVYvdkKY4ht9OjPjYVUTKn"
            )

            # assistant가 바라보고 있는 파일과 대상 파일이 일치하지 않는 경우
            if assistant_files.first_id != history.file.name:
                # assistant 파일 삭제
                deleted_assistant_file = client.beta.assistants.files.delete(
                    assistant_id="asst_i0FVYvdkKY4ht9OjPjYVUTKn",
                    file_id=assistant_files.first_id
                )

                if deleted_assistant_file.deleted:
                    print("assistant file delete complete!")

                source_file_assistant = client.files.create(
                    file=open("source_files/" + history.file.name, "rb"),
                    purpose='assistants'
                )

                # assistant에 파일 업뎃
                client.beta.assistants.update(
                    assistant_id="asst_i0FVYvdkKY4ht9OjPjYVUTKn",
                    file_ids=[source_file_assistant.id]
                )

            # Thread 생성
            thread = client.beta.threads.create()

            # Message 생성
            client.beta.threads.messages.create(
                thread_id=thread.id,
                role="user",
                content=data["user_message"]
            )

            # Run 객체 생성
            run = client.beta.threads.runs.create(
                thread_id=thread.id,
                assistant_id="asst_i0FVYvdkKY4ht9OjPjYVUTKn"
            )

            # Thread 실행
            while True:
                run_status = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
                time.sleep(3)
                print("---status---")
                print(run_status.status)
                if run_status.status == 'completed':
                    messages = client.beta.threads.messages.list(thread_id=thread.id)
                    print("---completed---")
                    print(messages)
                    break
                else:
                    print("processing...")

            # Response 수신
            answer_tmp = messages.data[0].content[0].text.value
            answer = answer_tmp[answer_tmp.find('\n') + 1:answer_tmp.rfind('\n')]
            # language = history.file.name[history.file.name.find('.') + 1:]
            print(answer)

        prompt = Prompt.objects.create(
            history_id=data["history_id"],
            user_message=data["user_message"],
            answer=answer
        )

        try:
            Prompt.objects.get(pk=prompt.pk)
            response = {
                'is_success': True
            }
            return JsonResponse(response, status=status.HTTP_200_OK)

        except Prompt.DoesNotExist:
            response = {
                'is_success': False,
                'message': 'Prompt-answer create fail..'
            }
            return JsonResponse(response, status=status.HTTP_400_BAD_REQUEST)

class PromptDeleteView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, prompt_id):
        prompt = get_object_or_404(Prompt, pk=prompt_id)
        prompt.delete()

        try:
            Prompt.objects.get(pk=prompt_id)
            response = {
                'is_success': False,
                'result': {'message': 'Prompt-answer create fail..'}
            }
            return JsonResponse(response, status=status.HTTP_400_BAD_REQUEST)

        except Prompt.DoesNotExist:
            response = {
                'is_success': True,
                'result': {'message': 'Prompt-answer create  success'}
            }
            return JsonResponse(response, status=status.HTTP_200_OK)

