import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import authState from "../recoils/auth";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const loginUser = useRecoilValue(authState);
  // console.log(loginUser);

  return (
    <MainHeader>
      <nav>
        <h1>Todos</h1>
        {loginUser.token || location.pathname === "/auth" ? null : (
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
    > button {
      font-size: 14px;
      background: #757575;
      color: #fff;
      padding: 4px 32px;
      border-radius: 5px;
    }
  }
`;
