import * as S from './index.styles.ts';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const Header = () => {
  return (
    <S.Header>
      <S.Inner>
        <Logo height="25" width="25" />
        <div>TryCatch</div>
      </S.Inner>
    </S.Header>
  );
};

export default Header;
