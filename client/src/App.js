import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Login from "./features/auth/Login";
import PersistLogin from "./features/auth/PersistLogin";
import Register from "./features/auth/Register";
import Protein from "./features/protein/Protein";
import ProteinProduct from "./features/protein/previewProteinProduct/PreviewProteinProduct";
import NewProtein from "./features/protein/newProtein/NewProtein";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />

          <Route element={<PersistLogin />}>
            <Route index element={<Home />} />
            <Route path="protein">
              <Route index element={<Protein />} />
              <Route path="newProtein" element={<NewProtein />} />
              <Route path=":id" element={<ProteinProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
