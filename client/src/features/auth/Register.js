import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { setCredentials } from "./authSlice";
import { useRegisterMutation } from "./authApiSlice";

const Register = () => {
  const userRef = useRef()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [register, { isLoading }] = useRegisterMutation()

  useEffect(() => {
    userRef.current.focus()
  }, []);

  useEffect(() => {
    setErrMsg("")
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await register({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }));
      setUsername("")
      setPassword("")
      setConfirmPassword("")
      navigate("/auth/login")
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response")
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password")
      } else if (err.status === 401) {
        setErrMsg("Unauthorized")
      } else {
        setErrMsg(err.data?.message)
      }
      toast.error(errMsg)
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleConfirmPwdInput = (e) => setConfirmPassword(e.target.value)

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='wrapper'>
      <section className='heading'>
      <h4>Register and start you journey</h4>
      </section>

      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
              value={username}
              ref={userRef}
              placeholder='Enter your username'
              onChange={handleUserInput}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={handlePwdInput}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={confirmPassword}
              placeholder='Confirm password'
              onChange={handleConfirmPwdInput}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block btn-submit'>
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Register