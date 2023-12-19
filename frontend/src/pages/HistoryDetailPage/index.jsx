import { useParams } from 'react-router-dom';
import * as S from './index.styles.js';
import { UncontrolledCollapse } from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { api } from '../../api/axiosService.js';

const HistoryDetailPage = () => {
  const { historyId } = useParams();
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const chatHistoryRef = useRef(null);
  console.log(historyId);

  const postCreatePromptAPI = async (history_id, message) => {
    setLoading(false);
    const data = await api.post('http://127.0.0.1:8000/history/histories/prompts/', {
      history_id: Number(history_id),
      user_message: message,
    });
    console.log(data);
    getHistoryDetail();
    setLoading(true);
    setQuestion('');
  };

  const getHistoryDetail = async () => {
    const { data } = await api.get(`http://127.0.0.1:8000/history/histories/${historyId}`);
    setHistory(data.result);
  };

  const handleClickDeletePrompt = async (index) => {
    await api.delete(`http://127.0.0.1:8000/history/histories/prompts/${history.prompt_list[index].id}`);
    const { data } = await api.get(`http://127.0.0.1:8000/history/histories/${historyId}`);
    setHistory(data.result);
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [history?.prompt_list]); // history.prompt_list의 변화에 반응

  useEffect(() => {
    getHistoryDetail();
  }, [historyId])

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };
  return (
    <S.Inner>
      <S.Info>
        <S.Title>{history?.title}</S.Title>
        {history?.language && (
          <>
            <S.ToggleButton id="toggle">CODE OPEN</S.ToggleButton>
            <UncontrolledCollapse toggler="#toggle" className="m-0 p-0">
              <S.CodeWrapper>
                <SyntaxHighlighter language={history?.language} style={docco}>
                  {history?.source_code}
                </SyntaxHighlighter>
              </S.CodeWrapper>
            </UncontrolledCollapse>
          </>
        )}
      </S.Info>
      {/* flex : 1 */}
      <S.Line></S.Line>
      <S.ChatBox ref={chatHistoryRef}>
        <S.ChatHistory>
          {history?.prompt_list &&
            history?.prompt_list?.map((item, index) => {
              <>
                <S.Question>
                  {item.user_message}
                  <DeleteIcon onClick={() => handleClickDeletePrompt(index)} />
                </S.Question>
                <S.Answer code="true">
                  <div>
                    <SyntaxHighlighter language={history?.language} style={docco}>
                      {item.answer}
                    </SyntaxHighlighter>
                  </div>
                </S.Answer>
              </>;
            })}
          {history?.language
            ? history?.prompt_list?.map((item, index) => (
              <>
                <S.Question>
                  {item.user_message}
                  <DeleteIcon onClick={() => handleClickDeletePrompt(index)} />
                </S.Question>
                <S.Answer code="true">
                  <div>
                    <SyntaxHighlighter language={history?.language} style={docco}>
                      {item.answer === '' ? '다시 한번 메시지를 보내주세요.' : item.answer}
                    </SyntaxHighlighter>
                  </div>
                </S.Answer>
              </>
            ))
            : history?.prompt_list?.map((item) => (
              <>
                <S.Question>{item.user_message}</S.Question>
                <S.Answer>
                  <div>{item.answer === '' ? '다시 한번 메시지를 보내주세요.' : item.answer}</div>
                </S.Answer>
              </>
            ))}
        </S.ChatHistory>
      </S.ChatBox>
      <S.ChatInputBox>
        <S.ChatInput type="textarea" onChange={handleChange} value={question} />
        <S.Button
          type="button"
          onClick={() => {
            postCreatePromptAPI(historyId, question);
          }}
        >
          {loading ? 'Send' : 'Loading'}
        </S.Button>
      </S.ChatInputBox>
    </S.Inner>
  );
};

export default HistoryDetailPage;
