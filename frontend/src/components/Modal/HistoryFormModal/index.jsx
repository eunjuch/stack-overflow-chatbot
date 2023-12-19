import { useState } from 'react';
import Input from '../../Input/index.jsx';
import ModalFrame from '../ModalFrame';
import * as S from './index.styles.js';
import { api } from '../../../api/axiosService.js';
import { useNavigate } from 'react-router-dom';

const HistoryFormModal = ({ handleClickModalClose, setIsSelectedId, setList, width, height }) => {
  const [extensionName, setExtensionName] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [historyName, setHistoryName] = useState('');
  const navi = useNavigate();

  const handleChangeTextInput = (event) => {
    setHistoryName(event.target.value);
  };
  const handleChangeFileInput = (event) => {
    const arr = event.target.value.split('\\');
    const file = arr[arr.length - 1];
    const extension = arr[arr.length - 1].split('.')[1];
    setExtensionName(extension);
    setFile(event.target.files[0]);
    setFileName(file);
  };
  const handleClick = async () => {
    const formData = new FormData();

    formData.append('user_id', 'kamoo');
    formData.append('title', historyName);
    formData.append('file', file);

    const {
      data: {
        is_success,
        result: { history_id },
      },
    } = await api.post('http://127.0.0.1:8000/history/histories/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (is_success) {
      const data = await api.get('http://127.0.0.1:8000/history/histories/');
      setList(data.data.result.history_list);
      handleClickModalClose();
      navi(`/history/${history_id}`);
      setIsSelectedId(history_id);
    } else {
      handleClickModalClose();
      navi(`/`);
      setIsSelectedId(null);
    }
  };
  return (
    <ModalFrame onClick={handleClickModalClose} width={width} height={height}>
      <S.Wrapper>
        <Input type="text" placeholder="History Title" onChange={handleChangeTextInput} />
        <S.FileInputWrapper>
          <S.FilenameInput value={fileName} disabled="disabled" placeholder="Choose File" />
          <label for="FileInputID">Upload</label>
          <S.HiddenInput type="file" onChange={handleChangeFileInput} id="FileInputID" />
        </S.FileInputWrapper>
        <S.Button onClick={handleClick}>Add New History</S.Button>
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
