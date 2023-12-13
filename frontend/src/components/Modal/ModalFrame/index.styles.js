import styled from 'styled-components';

export const Dim = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 11;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContainer = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  padding: 6px 6px 30px 6px;
  background-color: #d9d9d9;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  text-align: end;
  svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

export const Main = styled.div`
  flex: 1;
`;
