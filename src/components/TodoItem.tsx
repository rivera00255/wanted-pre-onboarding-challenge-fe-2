import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import PencilIcon from "../assets/icon/pencil.svg";
import TrashIcon from "../assets/icon/trash.svg";
import { baseUrl } from "../pages/Auth";
import api from "../utilities/api";

export type Todo = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo } = useMutation(
    (id: string) => {
      return api.delete(`${baseUrl}/todos/${id}`).catch((e) => console.log(e));
    },
    { onSuccess: () => queryClient.invalidateQueries(["todo"]) }
  );

  return (
    <Card>
      <label>
        <input type="text" defaultValue={todo.title} readOnly />
      </label>
      <label>
        <input type="text" defaultValue={todo.content} readOnly />
      </label>
      <p>{new Date(todo.createdAt).toLocaleDateString()}</p>
      <div>
        <button>
          <img src={PencilIcon} alt="edit" />
        </button>
        <button onClick={() => deleteTodo(todo.id)}>
          <img src={TrashIcon} alt="delete" />
        </button>
      </div>
    </Card>
  );
};

export default TodoItem;

const Card = styled.div`
  width: 720px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  padding: 10px 16px;
  position: relative;
  margin-bottom: 10px;
  > label {
    display: block;
    > input {
      &:focus {
        outline: none;
      }
    }
    &:last-of-type {
      margin-bottom: 4px;
      > input {
        color: #757575;
      }
    }
  }
  > p {
    font-size: 12px;
    color: #bdbdbd;
  }
  > div {
    position: absolute;
    top: 10px;
    right: 16px;
  }
  button {
    background: #fff;
    > img {
      width: 21px;
      height: auto;
      opacity: 0.3;
    }
    &:first-of-type {
      margin-right: 10px;
    }
    &:hover {
      > img {
        opacity: 0.6;
      }
    }
  }
`;
