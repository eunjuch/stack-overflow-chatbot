import HistoryList from '../HistoryList/index.jsx';
import * as S from './index.styles.js';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import useModal from '../../hooks/useModal.js';
import HistoryFormModal from '../Modal/HistoryFormModal/index.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../api/axiosService.js';

const Sidebar = () => {
  const [isOpen, handleClickModalOpen, handleClickModalClose] = useModal();
  const [isSelectedId, setIsSelectedId] = useState(null);
  const [list, setList] = useState([]);

  const handleClickItem = (id) => {
    setIsSelectedId(id);
  };

  useEffect(() => {
    api.get('http://127.0.0.1:8000/history/histories/').then((data) => {
      setList(data.data.histories);
    });
  }, []);

  const navigate = useNavigate();
  return (
    <S.Layout>
      <S.Logo
        onClick={() => {
          navigate('/');
          setIsSelectedId(null);
        }}
      >
        <LogoIcon />
        CodeMate
      </S.Logo>
      <HistoryList
        list={list}
        isSelectedId={isSelectedId}
        onClick={handleClickItem}
        setIsSelectedId={setIsSelectedId}
        setList={setList}
      />
      <S.Bottom>
        <S.Button onClick={handleClickModalOpen}>Add History</S.Button>
      </S.Bottom>
      {isOpen && (
        <HistoryFormModal
          handleClickModalClose={handleClickModalClose}
          setIsSelectedId={setIsSelectedId}
          setList={setList}
          width="400px"
          height="auto"
        />
      )}
    </S.Layout>
  );
};

export default Sidebar;
