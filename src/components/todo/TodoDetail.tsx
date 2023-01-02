import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PencilIcon from "../../assets/icon/pencil.svg";
import TrashIcon from "../../assets/icon/trash.svg";
import { baseUrl } from "../../pages/Auth";
import api from "../../utilities/api";

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleUpdate = () => {
    if (titleRef.current && contentRef.current) {
      if (titleRef.current.value === "" || contentRef.current.value === "") {
        alert("내용을 입력해주세요.");
      } else {
        updateTodo({
          title: titleRef.current.value,
          content: contentRef.current.value,
        });
      }
    }
  };

  const queryClient = useQueryClient();

  const { data: todoData } = useQuery(["todo"], () => {
    return api.get(`${baseUrl}/todos/${id}`).catch((e) => console.log(e));
  });

  const todo = useMemo(() => todoData?.data.data, [todoData]);
  // console.log(todo);

  const { mutate: updateTodo } = useMutation(
    async ({ title, content }: { title: string; content: string }) => {
      const response = await api.put(`${baseUrl}/todos/${id}`, {
        title,
        content,
      });
      response.status === 200 && setEdit(false);
      return response;
    },
    { onSuccess: () => queryClient.invalidateQueries(["todo"]) }
  );

  const { mutate: deleteTodo } = useMutation(
    (id: string) => {
      return api.delete(`${baseUrl}/todos/${id}`).catch((e) => console.log(e));
    },
    { onSuccess: () => queryClient.invalidateQueries(["todo"]) }
  );

  return (
    <Container>
      <Card>
        <label>
          <input
            type="text"
            className={edit ? "edit" : ""}
            defaultValue={todo.title}
            readOnly={!edit}
            ref={titleRef}
          />
        </label>
        <textarea
          className={edit ? "edit" : ""}
          defaultValue={todo.content}
          readOnly={!edit}
          ref={contentRef}
        />
        <p>{new Date(todo.createdAt).toLocaleDateString()}</p>
        <div>
          <button>
            <img src={PencilIcon} alt="edit" onClick={() => setEdit(true)} />
          </button>
          <button>
            <img
              src={TrashIcon}
              alt="delete"
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?")) {
                  deleteTodo(todo.id);
                  navigate("/");
                }
              }}
            />
          </button>
        </div>
      </Card>
      {edit && (
        <ButtonWrapper>
          <button onClick={() => handleUpdate()}>수정</button>
        </ButtonWrapper>
      )}
    </Container>
  );
};

export default TodoDetail;

const Container = styled.div`
  width: 720px;
  margin: 0 auto;
  padding: 80px 0;
`;

const Card = styled.div`
  width: 700px;
  background: #fafafa;
  border-radius: 5px;
  box-shadow: 2px 3px 4px #eee;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  margin-bottom: 10px;
  .edit {
    border: 1px solid #bdbdbd;
    background: #fefefe;
  }
  > label {
    display: block;
    > input {
      width: 80%;
      background: #fafafa;
      border-radius: 5px;
      margin-bottom: 10px;
      padding: 4px;
      &:focus {
        outline: none;
      }
    }
  }
  > textarea {
    width: 80%;
    margin-bottom: 4px;
    color: #757575;
    resize: none;
    background: #fafafa;
    border-radius: 5px;
    padding: 4px;
    &:focus {
      outline: none;
    }
  }
  > p {
    font-size: 12px;
    color: #bdbdbd;
  }
  > div {
    position: absolute;
    top: 20px;
    right: 20px;
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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    background: #757575;
    color: #fff;
    padding: 4px 16px;
    border-radius: 5px;
    font-size: 14px;
    margin: 10px 8px;
    &:hover {
      background: #616161;
    }
  }
`;
