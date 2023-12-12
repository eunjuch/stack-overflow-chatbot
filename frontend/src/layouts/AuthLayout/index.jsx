import Header from '../../components/Header';
import * as S from './index.styles.ts';

const AuthLayout = ({ children }) => {
  return (
    <S.Layout>
      <Header />
      {children}
    </S.Layout>
  );
};

export default AuthLayout;
