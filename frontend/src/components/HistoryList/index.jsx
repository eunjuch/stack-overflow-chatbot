import * as S from './index.styles.js';
import HistoryItem from '../HistoryItem/index.jsx';

const HistoryList = ({ list, isSelectedId, onClick, setList, setIsSelectedId }) => {
  return (
    <S.HistoryContent>
      <S.List>
        {list.map((item) => (
          <HistoryItem
            key={item.id}
            onClick={onClick}
            list={list}
            item={item}
            selected={isSelectedId === item.id}
            setIsSelectedId={setIsSelectedId}
            setList={setList}
          />
        ))}
      </S.List>
    </S.HistoryContent>
  );
};

export default HistoryList;
