import { useState } from 'react';
import * as S from './index.styles.js';
import HistoryItem from '../HistoryItem/index.jsx';

const historyItems = [
  { id: 1, title: 'IOException error' },
  { id: 2, title: 'create text for argument blabla' },
  { id: 3, title: 'Merge branch conflick' },
];

const HistoryList = () => {
  const [isSelectedId, setIsSelectedId] = useState(null);

  const handleClickItem = (id) => {
    setIsSelectedId(id);
  };
  return (
    <S.HistoryContent>
      <S.List>
        {historyItems.map((item) => (
          <HistoryItem
            key={item.id}
            handleClickItem={handleClickItem}
            item={item}
            selected={isSelectedId === item.id}
          />
        ))}
      </S.List>
    </S.HistoryContent>
  );
};

export default HistoryList;
