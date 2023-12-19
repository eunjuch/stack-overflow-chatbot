import styled from 'styled-components';

export const UserInfoWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px;

  // > :last-child {
  //   opacity: 0;
  // }

  // &:hover {
  //   > :last-child {
  //     opacity: 1;
  //   }
  // }
`

export const IconWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  
  &:hover {
    cursor: pointer;
  }
`