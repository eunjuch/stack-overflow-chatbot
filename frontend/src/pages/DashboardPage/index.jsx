import * as S from './index.styles.js';
import logo from '../../assets/logo2.png';

const DashBoardPage = () => {
  return (
    <S.Content>
      <S.Inner>
        <S.Logo>
          <img src={logo} width={30} alt="sdf" />
          <span>CodeMate</span>
        </S.Logo>
        <S.PBox>
          <S.PTitle>
            Experience seamless chatbot interaction with <span>CodeMate</span> 👀
          </S.PTitle>
          <S.PDes>Get instant answer, engaging conversations and helpful recommendations</S.PDes>
          <S.PDes>with our advanced AI-Powered app.</S.PDes>
        </S.PBox>
        <S.Guide>
          <span>Guide</span>
          <S.GuideStep>1. Please create a new history.</S.GuideStep>
          <S.GuideStep>
            2. Click history and endter additional error information to request a corrected code.
          </S.GuideStep>
          <S.GuideStep>3. Save the desired modified code to the history.</S.GuideStep>
        </S.Guide>
      </S.Inner>
    </S.Content>
  );
};

export default DashBoardPage;
