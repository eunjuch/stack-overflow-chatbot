import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  background: #0f0c29; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #24243e,
    #302b63,
    #0f0c29
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
`;

export const Content = styled.section`
  flex: 1;
  padding: 34px 16px 34px 16px;
`;

export const ContentInner = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
`;
