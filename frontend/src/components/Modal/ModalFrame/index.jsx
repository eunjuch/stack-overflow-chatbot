import ModalPortal from '../ModalPortal';
import * as S from './index.styles.js';
import { ReactComponent as CloseIcon } from '../../../assets/close.svg';

const ModalFrame = ({ children, extensionName, onClick, width, height }) => {
  return (
    <ModalPortal>
      <S.Dim>
        <S.ModalContainer width={width} height={height}>
          <S.Header>
            <CloseIcon onClick={onClick} />
          </S.Header>
          <S.Main>{children}</S.Main>
        </S.ModalContainer>
      </S.Dim>
    </ModalPortal>
  );
};

export default ModalFrame;
