import Header from '../../components/Header';
import * as S from './index.styles';

const BaseLayout = ({ children }) => {
  return (
    <S.Layout>
      <Header />
      {/* <S.Content> */}
      {children}
      {/* </S.Content> */}
    </S.Layout>
  );
};

export default BaseLayout;
