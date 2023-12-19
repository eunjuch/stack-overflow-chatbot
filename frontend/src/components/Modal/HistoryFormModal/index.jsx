import { useState } from 'react';
import Input from '../../Input/index.jsx';
import ModalFrame from '../ModalFrame';
import * as S from './index.styles.js';

const HistoryFormModal = ({ handleClickModalClose, width, height }) => {
  const [extensionName, setExtensionName] = useState(null);
  const [fileName, setFileName] = useState("");
  const handleChangeTextInput = () => { };
  const handleChangeFileInput = (event) => {
    console.log(event.target.value);
    const arr = event.target.value.split('\\');
    const file = arr[arr.length - 1];
    const extension = arr[arr.length - 1].split('.')[1];
    setFileName(file);
    setExtensionName(extension);
  };
  return (
    <ModalFrame onClick={handleClickModalClose} width={width} height={height}>
      <S.Wrapper>
        <Input type="text" placeholder="History Title" onChange={() => { }} />
        <S.FileInputWrapper>
          <S.FilenameInput value={fileName} disabled="disabled" placeholder='Choose File' />
          <label for="FileInputID">Upload</label>
          <S.HiddenInput type="file" onChange={handleChangeFileInput} id="FileInputID" />
        </S.FileInputWrapper>
        <S.Button>Add New History</S.Button>
      </S.Wrapper>
    </ModalFrame>

    // <ModalFrame onClick={handleClickModalClose} width={width} height={height}>
    // <S.Wrapper>
    //   <Input type="text" label="Title" placeholder="히스토리 제목을 입력해주세요." onChange={() => {}} />
    //   <Input type="file" extensionName={extensionName} label="Code" placeholder="" onChange={handleChangeFileInput} />
    //   <S.Button>Add New History</S.Button>
    // </S.Wrapper>
    // </ModalFrame>
  );
};

export default HistoryFormModal;
