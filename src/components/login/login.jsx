import { logo } from "../../constants/constants";
import { Input } from "../../ui";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signUserFailure,
  signUserStart,
  signUserSuccess,
} from "../../slice/auth";
import AuthService from "../../service/auth";
import { ValidationError } from "../";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { email, password };
    try {
      const response = await AuthService.userLogin(user);
      dispatch(signUserSuccess(response.user));
      navigate("/");
    } catch (error) {
      dispatch(signUserFailure(error && error.response.data.errors));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="d-flex align-items-center py-4 text-center mt-5">
      <main className="form-signin w-25 m-auto">
        <form>
          {logo}
          <h1 className="h3 mb-3 fw-normal">Please login</h1>
          <ValidationError />

          <Input label={"Email address"} state={email} setState={setEmail} />
          <Input
            label={"Password"}
            type="password"
            state={password}
            setState={setPassword}
          />
          <button
            className="btn btn-primary w-100 py-2 mt-2"
            type="submit"
            disabled={isLoading}
            onClick={loginHandler}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>{" "}
                <span role="status">Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
          <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
