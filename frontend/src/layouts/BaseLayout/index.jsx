import Header from '../../components/Header';
import * as S from './index.styles.ts';

const BaseLayout = ({ children }) => {
  return (
    <S.Layout>
      <Header />
      {children}
    </S.Layout>
  );
};

export default BaseLayout;
