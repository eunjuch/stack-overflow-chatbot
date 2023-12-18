import { ReactComponent as UserIcon } from '../../assets/userinfo.svg'
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg'

import * as S from './index.styles';
import axios from "axios";


const UserInfo = () => {
  const username = window.localStorage.getItem("username");
  const refreshToken = window.localStorage.getItem("refreshToken");
  const accessToken = window.localStorage.getItem("accessToken");

  const onLogoutClick = () => {
    axios.post('http://localhost:8000/user/logout/', {
      refresh: refreshToken,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    ).then((res) => {
      console.log(res);
      if (res.data.is_success === true) {
        window.localStorage.clear();
        window.location.replace('/');
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <S.UserInfoWrapper>
      <UserIcon />
      {username}
      <S.IconWrapper onClick={onLogoutClick}>
        <LogoutIcon />
      </S.IconWrapper>
    </S.UserInfoWrapper>
  )
}

export default UserInfo;