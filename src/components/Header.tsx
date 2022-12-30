import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import authState from "../recoils/auth";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const loginUser = useRecoilValue(authState);
  // console.log(loginUser);
  const setLoginUser = useSetRecoilState(authState);

  return (
    <MainHeader>
      <nav>
        <h1>Todos</h1>
        {loginUser.token || location.pathname === "/auth" ? (
          loginUser.token ? (
            <div>
              <p>{loginUser.email}</p>
              <button
                onClick={() => {
                  setLoginUser({ email: "", token: "" });
                }}
              >
                로그아웃
              </button>
            </div>
          ) : null
        ) : (
          <button onClick={() => navigate("/auth")}>로그인</button>
        )}
      </nav>
    </MainHeader>
  );
};

export default Header;

const MainHeader = styled.header`
  width: 100%;
  > nav {
    width: 1020px;
    margin: 0 auto;
    text-align: center;
    > h1 {
      margin: 10px 0;
      font-size: 20px;
      font-weight: 700;
    }
    button {
      font-size: 14px;
      background: #757575;
      color: #fff;
      padding: 4px 32px;
      border-radius: 5px;
      &:hover {
        background: #616161;
      }
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      > p {
        font-size: 14px;
        color: #757575;
        margin-right: 10px;
      }
      > button {
        padding: 1px 10px;
        font-weight: 200;
      }
    }
  }
`;
