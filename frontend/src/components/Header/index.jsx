import * as S from './index.styles.js';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <S.Header>
      <Link to="/">
        <S.Logo>
          <LogoIcon />
          CodeMate
        </S.Logo>
      </Link>
    </S.Header>
  );
};

export default Header;
