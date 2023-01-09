import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Header from "./components/Header";
import TodoDetail from "./components/todo/TodoDetail";
import Auth from "./pages/Auth";
import Todos from "./pages/Todos";
import authState from "./recoils/auth";
import GlobalStyle from "./style/GlobalStyle";

function App() {
  const useAuth = () => {
    const loginUser = useRecoilValue(authState);
    return loginUser.token;
  };

  const RequiredAuth = ({ children }: { children: JSX.Element }) => {
    const user = useAuth();
    if (user) {
      return <Navigate to="/" replace={true} />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/:id" element={<TodoDetail />} />
        <Route
          path="/auth"
          element={
            <RequiredAuth>
              <Auth />
            </RequiredAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
