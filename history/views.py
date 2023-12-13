import json
import time
from django.http import JsonResponse
from history.models import History, Prompt
from rest_framework.views import APIView
from history.forms import HistoryForm

from openai import OpenAI
import os

OpenAI.api_key = os.environ.get('OPENAI_API_KEY')

client = OpenAI(organization='org-o3IP2SrQdimuzRhvZu8A07Bp', api_key=OpenAI.api_key)


class HistoryView(APIView):
    def post(self, request, *args, **kwargs):
        form = HistoryForm(request.POST, request.FILES)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.is_file_exist = 'file' in request.FILES
            instance.save()

            return JsonResponse({'message': 'SUCCESS!'}, status=201)
        else:
            return JsonResponse(form.errors, status=400)

    def get(self, request):
        histories = History.objects.all()
        results = []
        # source file 내용으로 -> source_file field 추가
        for history in histories:
            results.append(
                {
                    "history_id": history.id,
                    "user_id": history.users_id,
                    "title": history.title,
                    "file": history.file.name,
                    "is_file_exist": history.is_file_exist,
                    "created_at": history.created_at
                }
            )
        return JsonResponse({'histories': results}, status=200)

    class Prompt(APIView):
        def post(self, request):
            data = json.loads(request.body.decode('utf-8'))
            history = History.objects.get(id=data["history_id"])

            # 파일 없는 경우
            if history.is_file_exist == False:
                response = client.chat.completions.create(
                    name="질문 답변",
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
                if assistant_files.first_id != history.file_name:
                    # assistant 파일 삭제
                    deleted_assistant_file = client.beta.assistants.files.delete(
                        assistant_id="asst_i0FVYvdkKY4ht9OjPjYVUTKn",
                        file_id=assistant_files.first_id
                    )

                    if deleted_assistant_file.deleted:
                        print("assistant file delete complete!")

                    source_file_assistant = client.files.create(
                        file=open("source_files/" + history.file_name, "rb"),
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
                    print(run_status)
                    print("---messages---")
                    print(client.beta.threads.messages.list(thread_id=thread.id))
                    if run_status.status == 'completed':
                        messages = client.beta.threads.messages.list(thread_id=thread.id)
                        print("---completed---")
                        print(messages)
                        break
                    else:
                        print("processing...")

                # Response 수신
                answer = messages.data[0].content[0].text.value

            Prompt.objects.create(
                history_id=data["history_id"],
                user_message=data["user_message"],
                answer=answer
            )

            return JsonResponse({'message': 'created'}, status=201)
