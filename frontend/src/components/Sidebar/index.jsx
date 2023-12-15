import HistoryList from '../HistoryList/index.jsx';
import * as S from './index.styles.js';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import useModal from '../../hooks/useModal.js';
import HistoryFormModal from '../Modal/HistoryFormModal/index.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, handleClickModalOpen, handleClickModalClose] = useModal();
  const [isSelectedId, setIsSelectedId] = useState(null);

  const handleClickItem = (id) => {
    setIsSelectedId(id);
  };
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
      <HistoryList isSelectedId={isSelectedId} onClick={handleClickItem} />
      <S.Bottom>
        <S.Button onClick={handleClickModalOpen}>Add History</S.Button>
      </S.Bottom>
      {isOpen && <HistoryFormModal handleClickModalClose={handleClickModalClose} width="400px" height="auto" />}
    </S.Layout>
  );
};

export default Sidebar;
