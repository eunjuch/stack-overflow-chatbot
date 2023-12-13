import styled from 'styled-components';

export const SignWrapper = styled.div`
  width: 500px;
  height: 100%;
  min-width: 300px;
  background: rgba(217, 217, 217, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;

  .MuiTabs-flexContainer {
    justify-content: center;
    margin-top: 24px;
  }

  .Mui-selected {
    background-color: #F0F0F0 !important;
    color: black !important;
  }

  .MuiTab-textColorPrimary{
    color: #F0F0F0;
  }
`
