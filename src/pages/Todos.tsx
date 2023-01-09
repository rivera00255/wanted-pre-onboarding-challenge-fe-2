import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { baseUrl } from "./Auth";
import { useRecoilValue } from "recoil";
import authState from "../recoils/auth";
import api from "../utilities/api";
import TodoListItem, { Todo } from "../components/todo/TodoListItem";
import { Link } from "react-router-dom";

const Todos = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();

  const loginUser = useRecoilValue(authState);

  const [enable, setEnable] = useState(false);

  const { data: todos } = useQuery(
    ["todo"],
    () => {
      return axios.get(`${baseUrl}/todos`, {
        headers: { Authorization: loginUser.token },
      });
    },
    { enabled: enable }
  );

  const todoList = useMemo(() => todos?.data.data, [todos]);
  // console.log(todoList);

  const { mutate: createTodo } = useMutation(
    ({ title, content }: { title: string; content: string }) => {
      // const response = await axios.post(
      //   `${baseUrl}/todos`,
      //   {
      //     title,
      //     content,
      //   },
      //   { headers: { Authorization: loginUser.token } }
      // );
      // console.log(response);
      // return response;
      return api
        .post(`${baseUrl}/todos`, {
          title,
          content,
        })
        .catch((e) => console.log(e));
    },
    { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todo"] }) }
  );

  useEffect(() => {
    loginUser.token && loginUser.token !== "" && setEnable(true);
  }, [loginUser.token]);

  return (
    <Container>
      {loginUser.token === "" ? (
        <InnerContainer>로그인해주세요.</InnerContainer>
      ) : (
        <>
          <InnerContainer>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              ref={titleRef}
            />
            <textarea placeholder="할 일을 입력하세요." ref={contentRef} />
            <Button
              onClick={() => {
                if (titleRef.current && contentRef.current) {
                  if (
                    titleRef.current.value === "" ||
                    contentRef.current.value === ""
                  ) {
                    alert("내용을 입력해주세요.");
                  } else {
                    createTodo({
                      title: titleRef.current.value,
                      content: contentRef.current.value,
                    });
                    titleRef.current.value = "";
                    contentRef.current.value = "";
                  }
                }
              }}
            >
              추가
            </Button>
          </InnerContainer>
          <InnerContainer>
            {todoList?.length > 0 &&
              todoList.map((item: Todo) => (
                <Link to={`/${item.id}`} key={item.id}>
                  <TodoListItem key={item.id} todo={item} />
                </Link>
              ))}
          </InnerContainer>
        </>
      )}
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
  margin-bottom: 20px;
  > input {
    border-bottom: 1px solid #bdbdbd;
    padding: 4px;
    margin: 8px 0;
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
  > textarea {
    width: 480px;
    padding: 4px;
    border: 1px solid #bdbdbd;
    resize: none;
    border-radius: 5px;
    &::placeholder {
      font-size: 14px;
      color: #bdbdbd;
    }
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
