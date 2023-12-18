import { useForm } from "react-hook-form";
import * as S from './index.styles';
import { useState } from "react";
import { ReactComponent as UserIcon } from '../../assets/sign_username.svg'
import { ReactComponent as PasswordIcon } from '../../assets/sign_password.svg'
import { ReactComponent as ConfirmIcon } from '../../assets/sign_confirm.svg'
import { ReactComponent as SignInIcon } from '../../assets/sign_signin.svg'
import { ReactComponent as SignUpIcon } from '../../assets/sign_signup.svg'
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSignInSubmit = (data) => {
    axios.post('http://localhost:8000/user/login/', {
      user_id: data.id,
      password: data.pw,
    }).then((res) => {
      console.log(res.data);
      if (res.data.is_success === true) {
        window.localStorage.setItem('isLogin', true);
        window.localStorage.setItem('accessToken', res.data.result.tokens.access);
        window.localStorage.setItem('refreshToken', res.data.result.tokens.refresh);
        window.localStorage.setItem('username', res.data.result.user_id);
        window.location.replace('/');
      }
    }).catch((err) => {
      console.log(err);
      if (err)
        window.alert("Failed to sign in!");
    })
  }

  return (
    <form onSubmit={handleSubmit(onSignInSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      <S.InputWrapper>
        <S.IconWrapper><UserIcon /></S.IconWrapper>
        <S.AuthInput placeholder="ID" {...register("id", { required: true })} />
      </S.InputWrapper>
      {errors.id && <S.ErrorMessage>ID Error</S.ErrorMessage>}
      <S.InputWrapper>
        <S.IconWrapper><PasswordIcon /></S.IconWrapper>
        <S.AuthInput placeholder="Password" type="password" {...register("pw", { required: true })} />
      </S.InputWrapper>
      {errors.pw && <S.ErrorMessage>Password Error</S.ErrorMessage>}
      <S.AuthSubmit>
        <SignInIcon /> Sign In
      </S.AuthSubmit>
    </form>
  )
}

export const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  const [idCheck, setIdCheck] = useState(false);
  // const navigate = useNavigate();

  const onSignUpSubmit = (data) => {
    console.log(data);
    if (!idCheck) {
      window.alert("You should check your ID!");
      return;
    }
    else {
      axios.post('http://localhost:8000/user/signup/', {
        user_id: data.id,
        name: data.username,
        password: data.pw,
      }).then((res) => {
        console.log(res);
        window.alert("Succeed to Sign up!");
        // navigate('/auth');
        window.location.replace('/auth');
      }).catch((err) => {
        window.alert("Failed to Sign up!");
        console.log(err);
      })
    }
  }

  const checkId = () => {
    const id = getValues("id");
    axios.post('http://localhost:8000/user/check-user-id/', {
      user_id: id,
    }).then((res) => {
      console.log(res);
      if (res.data.result.is_duplicate === true) {
        setIdCheck(false);
        window.alert("This ID is not available!");
      } else {
        setIdCheck(true);
        window.alert("This ID is available!");
      }
    }).catch((err) => {
      window.alert("You should enter your ID!");
      console.log(err);
    })
  }

  return (
    <form onSubmit={handleSubmit(onSignUpSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      <S.InputWrapper>
        <S.IconWrapper><UserIcon /></S.IconWrapper>
        <S.AuthInput placeholder="Username" {...register("username", {
          required: 'You must specify Username',
          maxLength: { value: 15, message: 'Username must have less than 15 characters' }
        })} />
      </S.InputWrapper>
      {errors.username && <S.ErrorMessage>{errors.username.message}</S.ErrorMessage>}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', width: '100%' }}>
        <S.InputWrapper>
          <S.IconWrapper><UserIcon /></S.IconWrapper>
          <S.AuthInput placeholder="ID" {...register("id", {
            required: 'You must specify ID',
            maxLength: { value: 15, message: 'ID must have less than 15 characters' },
            minLength: { value: 4, message: 'ID must have at least 4 characters' },
          })} />
        </S.InputWrapper>
        <S.CheckButton onClick={checkId}>CHECK</S.CheckButton>
      </div>
      {errors.id && <S.ErrorMessage>{errors.id.message}</S.ErrorMessage>}
      <S.InputWrapper>
        <S.IconWrapper><PasswordIcon /></S.IconWrapper>
        <S.AuthInput placeholder="Password" type="password" {...register("pw", {
          required: 'You must specify Password',
          maxLength: { value: 15, message: 'Password must have less than 15 characters' },
          minLength: { value: 8, message: 'Password must have at least 8 characters' }
        })} />
      </S.InputWrapper>
      {errors.pw && <S.ErrorMessage>{errors.pw.message}</S.ErrorMessage>}
      <S.InputWrapper>
        <S.IconWrapper><ConfirmIcon /></S.IconWrapper>
        <S.AuthInput placeholder="Confirm Password" type="password" {...register("confirmpw", {
          required: 'You must cofirm Password',
          validate: (value) => {
            return (value === getValues("pw")) || "Password does not match"
          }
        })} />
      </S.InputWrapper>
      {errors.confirmpw && <S.ErrorMessage>{errors.confirmpw.message}</S.ErrorMessage>}
      <S.AuthSubmit>
        <SignUpIcon /> Sign Up
      </S.AuthSubmit>
    </form>
  )
}
