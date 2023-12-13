import styled from 'styled-components';

export const Item = styled.li`
  width: 240px;
  height: 45px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 16px;
  background-color: ${(props) => (props.selected ? '#807AB526' : 'parent')};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  cursor: pointer;
`;

export const Title = styled.div`
  flex: 1;
  white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정 */
  overflow: hidden; /* 텍스트가 요소의 경계를 벗어나면 숨김 처리 */
  text-overflow: ellipsis;
`;
