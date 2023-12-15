import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
`;

export const Inner = styled.div`
  text-align: center;
  margin-top: 60px;
`;

export const Logo = styled.div`
  font-weight: 700;
  display: flex;
  justify-content: center;
  gap: 10px;
  span {
    font-size: 28px;

    padding-bottom: 7px;
  }
`;

export const PBox = styled.div`
  margin-top: 28px;
`;

export const PTitle = styled.p`
  font-size: 22px;
  font-weight: 600;
  span {
    color: #392b63;
    text-decoration: underline;
  }
`;

export const PDes = styled.p`
  font-size: 13px;
  color: #808080;
  padding: 1px 0;
`;

export const Guide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 65px;
  span {
    text-align: start;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }
`;

export const GuideStep = styled.div`
  width: 100%;
  background-color: #eeeeee;
  text-align: start;
  font-size: 14px;
  padding: 16px;
  border-radius: 4px;
  font-weight: 600;
  margin-bottom: 18px;
`;
