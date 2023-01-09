import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState } from "recoil";
import authState from "../recoils/auth";
import { useNavigate } from "react-router-dom";

type User = {
  email: string;
  password: string;
};

type Response = {
  message: string;
  token: string;
};

export const baseUrl = import.meta.env.VITE_API_URL;

const Auth = () => {
  const naviagate = useNavigate();

  const [loginUser, setLoginUser] = useRecoilState(authState);

  const { mutate: auth } = useMutation(async (user: User) => {
    try {
      const response: any = await axios.post(`${baseUrl}/users/create`, user);
      // console.log(response?.data);
      if (response.data.token) {
        alert(`${response.data.message}. 로그인 후 이용해주세요.`);
      }
    } catch (e: any) {
      if (e.response.data.details === "이미 존재하는 유저입니다") {
        const response: any = await axios.post(`${baseUrl}/users/login`, user);
        // console.log(response.data);
        setLoginUser((prev) => ({
          ...prev,
          email: user.email,
          token: response.data.token,
        }));
        naviagate("/");
      } else {
        console.log(e);
      }
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data: any) => {
    auth({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="이메일"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          })}
        />
        <input
          type="password"
          placeholder="비밀번호(8자리 이상)"
          {...register("password", {
            required: true,
            minLength: 8,
          })}
        />
        <Button disabled={!isValid}>로그인/회원가입</Button>
      </Form>
    </Container>
  );
};

export default Auth;

const Container = styled.section`
  width: 1020px;
  margin: 0 auto;
  padding: 40px;
`;

const Form = styled.form`
  width: 520px;
  margin: 0 auto;
  padding: 20px 16px;
  background: #f5f5f5;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  > input {
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    padding: 4px;
    margin: 4px 0;
    width: 320px;
  }
`;

const Button = styled.button`
  background: #444;
  color: #fff;
  padding: 4px 8px;
  margin-top: 4px;
  border-radius: 5px;
  &:disabled {
    background: #e0e0e0;
  }
`;
