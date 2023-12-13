import { useForm } from "react-hook-form";
import * as S from './index.styles';
import { useState } from "react";

export const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSignInSubmit = (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSignInSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      <S.AuthInput placeholder="ID" {...register("id", { required: true })} />
      {errors.id && <S.ErrorMessage>ID Error</S.ErrorMessage>}
      <S.AuthInput placeholder="Password" type="password" {...register("pw", { required: true })} />
      {errors.pw && <S.ErrorMessage>Password Error</S.ErrorMessage>}
      <S.AuthSubmit type="submit" value={"Sign In"} />
    </form>
  )
}

export const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  const [idOverlap, setIdOverlap] = useState(false);
  //SignUpSubmit 시 idcheck 됐는지 확인하고 넘김

  const onSignUpSubmit = (data) => {
    console.log(data);
  }
  const checkId = (id) => {
    console.log("current ID ::", id);
    //ID 중복체크 하고 체크여부 변수 변경
    window.localStorage.setItem('isLogin', true);
    window.localStorage.setItem('loginID', id);
  }

  return (
    <form onSubmit={handleSubmit(onSignUpSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      <S.AuthInput placeholder="Username" {...register("username", {
        required: 'You must specify Username',
        maxLength: { value: 15, message: 'Username must have less than 15 characters' }
      })} />
      {errors.username && <S.ErrorMessage>{errors.username.message}</S.ErrorMessage>}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', width: '100%' }}>
        <S.AuthInput placeholder="ID" {...register("id", {
          required: 'You must specify ID',
          maxLength: { value: 15, message: 'ID must have less than 15 characters' },
          minLength: { value: 4, message: 'ID must have at least 4 characters' },
        })} />
        <S.CheckButton onClick={checkId(getValues("id"))}>CHECK</S.CheckButton>
      </div>
      {errors.id && <S.ErrorMessage>{errors.id.message}</S.ErrorMessage>}
      <S.AuthInput placeholder="Password" type="password" {...register("pw", {
        required: 'You must specify Password',
        maxLength: { value: 15, message: 'Password must have less than 15 characters' },
        minLength: { value: 8, message: 'Password must have at least 4 characters' }
      })} />
      {errors.pw && <S.ErrorMessage>{errors.pw.message}</S.ErrorMessage>}
      <S.AuthInput placeholder="Confirm Password" type="password" {...register("confirmpw", {
        required: 'You must cofirm Password',
        validate: (value) => {
          return (value === getValues("pw")) || "Password does not match"
        }
      })} />
      {errors.confirmpw && <S.ErrorMessage>{errors.confirmpw.message}</S.ErrorMessage>}
      <S.AuthSubmit type="submit" value={"Sign Up"} />
    </form>
  )
}
