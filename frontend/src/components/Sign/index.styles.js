import { style } from '@mui/system';
import styled from 'styled-components';

export const AuthInput = styled.input`
  // width: 200px;
  width: 100%;
  height: 45px;
  background: #FFF;
  margin-top: 20px;
  padding: 0px 10px;
`

export const AuthSubmit = styled.button`
  // width: 200px;
  width: 100%;
  height: 45px;
  background: #041C24;
  color: #FFF;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`

export const CheckButton = styled.button`
  height: 45px;
  width: 100px;
  margin-top: 20px;
`

export const ErrorMessage = styled.p`
  color: red;
  font-size: 13px;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const IconWrapper = styled.div`
  background-color: white;
  height: 45px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`