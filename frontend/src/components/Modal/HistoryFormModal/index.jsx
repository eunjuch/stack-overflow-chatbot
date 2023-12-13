import { useState } from 'react';
import Input from '../../Input/index.jsx';
import ModalFrame from '../ModalFrame';
import * as S from './index.styles.js';

const HistoryFormModal = ({ handleClickModalClose, width, height }) => {
  const [extensionName, setExtensionName] = useState(null);
  const handleChangeTextInput = () => {};
  const handleChangeFileInput = (event) => {
    const arr = event.target.value.split('\\');
    const extension = arr[arr.length - 1].split('.')[1];
    setExtensionName(extension);
  };
  return (
    <ModalFrame onClick={handleClickModalClose} width={width} height={height}>
      <S.Wrapper>
        <Input type="text" label="Title" placeholder="히스토리 제목을 입력해주세요." onChange={() => {}} />
        <Input type="file" extensionName={extensionName} label="Code" placeholder="" onChange={handleChangeFileInput} />
        <S.Button>Add New History</S.Button>
      </S.Wrapper>
    </ModalFrame>
  );
};

export default HistoryFormModal;
