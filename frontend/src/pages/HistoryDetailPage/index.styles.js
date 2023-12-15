import styled from 'styled-components';

export const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Info = styled.div``;

export const CodeWrapper = styled.div`
  overflow-y: scroll;
  height: 200px;
`;

export const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
`;

export const ToggleButton = styled.button`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 4px;
  margin-bottom: 6px;
`;

export const Line = styled.div`
  width: 100%;
  height: 0.5px;
  border: 1px solid lightgray;
  margin: 8px 0;
`;

export const ChatBox = styled.div`
  flex: 1;

  overflow-y: scroll;
`;

export const ChatHistory = styled.div``;

export const Question = styled.div`
  width: 70%;
  padding: 16px 12px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  background-color: #eeeeee;
  margin-bottom: 24px;
`;

export const Answer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;

  div {
    width: 70%;
    pre {
      border-radius: 8px;
    }
  }
`;

export const ChatInputBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  margin-top: 20px;
  gap: 12px;
`;

export const ChatInput = styled.textarea`
  width: 100%;
  height: 100%;

  border: 1px solid lightgray;
  padding: 6px 12px;
  border-radius: 12px;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Button = styled.button`
  width: 80px;
  height: 80px;
  background-color: #392b63;
  border-radius: 12px;
  color: white;
`;
