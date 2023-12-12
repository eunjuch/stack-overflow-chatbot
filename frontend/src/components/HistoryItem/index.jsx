import * as S from './index.styles.js';
import { ReactComponent as MessageIcon } from '../../assets/message.svg';

const HistoryItem = ({ item: { id, title }, handleClickItem, selected }) => {
  return (
    <S.Item onClick={() => handleClickItem(id)} selected={selected}>
      <MessageIcon />
      <S.Title>{title}</S.Title>
    </S.Item>
  );
};

export default HistoryItem;
