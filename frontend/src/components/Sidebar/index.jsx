import HistoryList from '../HistoryList/index.jsx';
import * as S from './index.styles.js';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import useModal from '../../hooks/useModal.js';
import HistoryFormModal from '../Modal/HistoryFormModal/index.jsx';
import UserInfo from '../UserInfo/index.jsx';

const Sidebar = () => {
  const [isOpen, handleClickModalOpen, handleClickModalClose] = useModal();
  return (
    <S.Layout>
      <S.Logo>
        <LogoIcon />
        CodeMate
      </S.Logo>
      <HistoryList />
      <S.Bottom>
        <S.Button onClick={handleClickModalOpen}>Add History</S.Button>
        <UserInfo />
      </S.Bottom>
      {isOpen && <HistoryFormModal handleClickModalClose={handleClickModalClose} width="400px" height="auto" />}
    </S.Layout>
  );
};

export default Sidebar;
