import * as S from './index.styles.js';

const Input = ({ type, label, placeholder, onChange }) => {
  return (
    <S.Box>
      <S.Label>{label}</S.Label>
      <S.Input type={type} placeholder={placeholder} onChange={onChange} />
    </S.Box>
  );
};

export default Input;
