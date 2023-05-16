import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { RegisterUser } from "./pages/RegisterUser";
import { ToastContainer } from "react-toastify";
import { UpdateUser } from "./pages/UpdateUser";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer pauseOnHover={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alunos" element={<Users />} />
          <Route path="/cadastro-de-aluno" element={<RegisterUser />} />
          <Route path="/editar-aluno/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
