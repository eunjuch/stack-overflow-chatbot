import styled from 'styled-components';

export const Box = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.div`
  text-align: start;
`;

export const Input = styled.input`
  width: 100%;
  height: ${(props) => (props.type === 'text' ? '45px' : 'auto')};
  border-radius: ${(props) => (props.type === 'text' ? '4px' : '0')};
  padding: ${(props) => (props.type === 'text' ? '0 8px' : '0')};

  &::placeholder {
    color: lightgray;
  }
`;
