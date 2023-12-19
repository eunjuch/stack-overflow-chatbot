import styled from 'styled-components';

export const AuthInput = styled.input`
  width: 100%;
  height: 45px;
  background: #FFF;
  margin-top: 20px;
  padding: 0px 10px;
  font-size: 14px;
`

export const AuthSubmit = styled.input`
  height: 45px;
  background: #041C24;
  color: #FFF;
  margin-top: 20px;

  &:hover {
    cursor: pointer;
  }
`

export const CheckButton = styled.button`
  height: 45px;
  width: 100px;
  margin-top: 20px;
  font-size: 14px;
`

export const ErrorMessage = styled.p`
  color: red;
  font-size: 13px;
  margin: 0px;
`