import * as S from './index.styles.js';
import { ReactComponent as MessageIcon } from '../../assets/message.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axiosService.js';

const HistoryItem = ({ item: { id, title }, onClick, selected, setList, setIsSelectedId }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    await api.delete(`http://127.0.0.1:8000/history/histories/${id}`);
    const {
      data: {
        result: { history_list },
      },
    } = await api.get('http://127.0.0.1:8000/history/histories/');
    setIsSelectedId(null);
    setList(history_list);
    navigate('/');
  };

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
      {selected && <DeleteIcon onClick={handleClick} />}
    </S.Item>
  );
};

export default HistoryItem;
