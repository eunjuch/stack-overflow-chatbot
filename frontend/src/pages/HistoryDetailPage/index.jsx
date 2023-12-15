import { useParams } from 'react-router-dom';
import * as S from './index.styles.js';
import { UncontrolledCollapse } from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState } from 'react';

const HistoryDetailPage = () => {
  const { historyId } = useParams();
  const [question, setQuestion] = useState('');
  const title = 'IndexOutOfBoundsException error';
  const code = `
    package testpackage;

    public class IndexOutOfBoundsExceptionExample {
        public static void main(String[] args) {
            int[] numbers = {1, 2, 3, 4, 5};
    
            int invalidIndex = 10;
            int value = numbers[invalidIndex];
    
            System.out.println("Value at index " + invalidIndex + ": " + value);

            int[] numbers = {1, 2, 3, 4, 5};
    
            int invalidIndex = 10;
            int value = numbers[invalidIndex];
    
            System.out.println("Value at index " + invalidIndex + ": " + value);

            int[] numbers = {1, 2, 3, 4, 5};
    
            int invalidIndex = 10;
            int value = numbers[invalidIndex];
    
            System.out.println("Value at index " + invalidIndex + ": " + value);
        }
    }  
  `;

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };
  return (
    <S.Inner>
      <S.Info>
        <S.Title>{title}</S.Title>
        <S.ToggleButton id="toggle">CODE OPEN</S.ToggleButton>
        <UncontrolledCollapse toggler="#toggle" className="m-0 p-0">
          <S.CodeWrapper>
            <SyntaxHighlighter language="java" style={dracula}>
              {code}
            </SyntaxHighlighter>
          </S.CodeWrapper>
        </UncontrolledCollapse>
      </S.Info>
      {/* flex : 1 */}
      <S.Line></S.Line>
      <S.ChatBox>
        <S.ChatHistory>
          <S.Question>IndexOutOfBoundsException, line number 7</S.Question>
          <S.Answer>
            <div>
              <SyntaxHighlighter language="java" style={dracula}>
                {code}
              </SyntaxHighlighter>
            </div>
          </S.Answer>
          <S.Question>IndexOutOfBoundsException, line number 7</S.Question>
          <S.Answer>
            <div>
              <SyntaxHighlighter language="java" style={dracula}>
                {code}
              </SyntaxHighlighter>
            </div>
          </S.Answer>
        </S.ChatHistory>
      </S.ChatBox>
      <S.ChatInputBox>
        <S.ChatInput type="textarea" onChange={handleChange} value={question} />
        <S.Button
          type="submit"
          onSubmit={(e) => {
            console.log(e);
          }}
        >
          Send
        </S.Button>
      </S.ChatInputBox>
    </S.Inner>
  );
};

export default HistoryDetailPage;
