import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { RegisterUser } from "./pages/RegisterUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alunos" element={<Users />} />
        <Route path="/cadastro-de-aluno" element={<RegisterUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
