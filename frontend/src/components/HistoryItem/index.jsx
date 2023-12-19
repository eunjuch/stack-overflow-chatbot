import * as S from './index.styles.js';
import { ReactComponent as MessageIcon } from '../../assets/message.svg';
import { useNavigate } from 'react-router-dom';

const HistoryItem = ({ item: { id, title }, onClick, selected }) => {
  const navigate = useNavigate();
  return (
    <S.Item
      onClick={() => {
        onClick(id);
        navigate(`/history/${id}`);
      }}
      selected={selected}
    >
      <MessageIcon />
      <S.Title>{title}</S.Title>
    </S.Item>
  );
};

export default HistoryItem;
