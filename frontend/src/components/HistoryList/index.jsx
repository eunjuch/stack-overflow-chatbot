import * as S from './index.styles.js';
import HistoryItem from '../HistoryItem/index.jsx';

const historyItems = [
  { id: 1, title: 'IOException error' },
  { id: 2, title: 'create text for argument blabla' },
  { id: 3, title: 'Merge branch conflick' },
];

const HistoryList = ({ isSelectedId, onClick }) => {
  return (
    <S.HistoryContent>
      <S.List>
        {historyItems.map((item) => (
          <HistoryItem key={item.id} onClick={onClick} item={item} selected={isSelectedId === item.id} />
        ))}
      </S.List>
    </S.HistoryContent>
  );
};

export default HistoryList;
