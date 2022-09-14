import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate])

  const onLogout = () => {
    sendLogout()
    navigate("/")
  };

  if (isError) toast.error(error.data?.message)

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>MyGym</h1>
        </Link>
      </div>
      <ul>
        {token ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="auth/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="auth/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
