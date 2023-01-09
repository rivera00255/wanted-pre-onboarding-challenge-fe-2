import styled from "styled-components";

export type Todo = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

const TodoListItem = ({ todo }: { todo: Todo }) => {
  return (
    <ItemWrapper>
      <p>
        <strong>{todo.title}</strong>
      </p>
      <p>{todo.content}</p>
      <p>{new Date(todo.createdAt).toLocaleDateString()}</p>
    </ItemWrapper>
  );
};

export default TodoListItem;

const ItemWrapper = styled.div`
  width: 700px;
  background: #fafafa;
  border-radius: 5px;
  box-shadow: 2px 3px 4px #eee;
  padding: 10px 16px;
  position: relative;
  margin-bottom: 16px;
  > p {
    font-size: 14px;
    color: #757575;
    > strong {
      font-size: 15px;
      font-weight: 500;
      color: #757575;
    }
    &:nth-of-type(2) {
      margin: 8px 0;
    }
    &:last-of-type {
      font-size: 12px;
      color: #bdbdbd;
    }
  }
  &:hover {
    background: #f5f5f5;
  }
`;
