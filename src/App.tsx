import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import Todos from "./pages/Todos";
import GlobalStyle from "./style/GlobalStyle";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
