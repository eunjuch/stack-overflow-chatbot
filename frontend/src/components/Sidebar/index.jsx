import HistoryList from '../HistoryList/index.jsx';
import * as S from './index.styles.js';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';

const Sidebar = () => {
  return (
    <S.Layout>
      <S.Logo>
        <LogoIcon />
        CodeMate
      </S.Logo>
      <HistoryList />
      <S.Bottom>
        <S.Button>ADD HISTORY</S.Button>
      </S.Bottom>
    </S.Layout>
  );
};

export default Sidebar;
