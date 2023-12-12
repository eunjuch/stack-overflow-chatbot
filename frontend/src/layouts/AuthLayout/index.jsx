import Sidebar from '../../components/Sidebar/index.jsx';
import * as S from './index.styles.js';

const AuthLayout = ({ children }) => {
  return (
    <S.Layout>
      <Sidebar />
      <S.Content>
        <S.ContentInner>{children}</S.ContentInner>
      </S.Content>
    </S.Layout>
  );
};

export default AuthLayout;
