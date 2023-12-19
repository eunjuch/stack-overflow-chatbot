import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  label {
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 0px 5px;
    margin-left: 5px;
    background-color: #b8b8b8;
    color: black;
    cursor: pointer;
    height: 45px;
  }
`;

export const Button = styled.button`
  width: 80%;
  height: 40px;
  background-color: black;
  color: white;
  border-radius: 5px;
`;

export const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip:rect(0,0,0,0);
  border: 0;
`

export const FilenameInput = styled.input`
  display: inline-block;
  padding: 0px 10px;
  font-family: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: #FFF;
  text-overflow: ellipsis;
  width: 100%;
  border-radius: 5px;
  height: 45px;
  color: black;

  &::placeholder { 
    color: lightgray;
  }
`

export const FileInputWrapper = styled.div`
  display: flex;
  width: 80%;
`