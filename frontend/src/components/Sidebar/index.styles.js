import styled from 'styled-components';

export const Layout = styled.section`
  width: 250px;
  height: 100%;
  padding: 34px 16px 36px 0;
  color: white;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 600;
  padding-left: 16px;
`;

export const Bottom = styled.div`
  padding-left: 16px;
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid #807ab526;
  color: #807ab526;
  background-image: linear-gradient(45deg, #807ab580 50%, #ffffff 50%);
  background-position: 99%;
  background-size: 400%;
  transition: background 800ms ease-in-out;
  font-size: 15px;
  color: black;
  border-radius: 8px;
  &:hover {
    background-position: 0;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Username = styled.div`
  flex: 1;
`;
