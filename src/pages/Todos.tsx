import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef } from "react";
import styled from "styled-components";
import { baseUrl } from "./Auth";
import { useRecoilValue } from "recoil";
import authState from "../recoils/auth";
import instance from "../utilities/api";

const Todos = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const loginUser = useRecoilValue(authState);

  const { mutate: createTodo } = useMutation(
    async ({ title, content }: { title: string; content: string }) => {
      const response = await axios.post(
        `${baseUrl}/todos`,
        {
          title,
          content,
        },
        { headers: { Authorization: loginUser.token } }
      );
      console.log(response);
      return response;
    }
  );

  return (
    <Container>
      <InnerContainer>
        <input type="text" placeholder="제목을 입력하세요." ref={titleRef} />
        <input type="text" placeholder="할 일을 입력하세요." ref={contentRef} />
        <Button
          onClick={() => {
            if (titleRef.current && contentRef.current) {
              createTodo({
                title: titleRef.current.value,
                content: contentRef.current.value,
              });
            }
          }}
        >
          추가
        </Button>
      </InnerContainer>
    </Container>
  );
};

export default Todos;

const Container = styled.section`
  width: 1020px;
  margin: 0 auto;
  padding: 40px 16px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > input {
    border-bottom: 1px solid #bdbdbd;
    padding: 4px;
    margin: 8px 0 4px 0;
    width: 480px;
    font-size: 15px;
    &::placeholder {
      font-size: 14px;
      color: #bdbdbd;
    }
    &:focus {
      outline: none;
    }
  }
  > input:last-of-type {
    border-bottom: 2px solid #bdbdbd;
  }
`;

const Button = styled.button`
  background: #444;
  color: #fff;
  padding: 4px 32px;
  border-radius: 5px;
  font-size: 14px;
  margin-top: 16px;
  &:hover {
    background: #757575;
  }
`;
