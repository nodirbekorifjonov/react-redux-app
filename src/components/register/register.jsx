import { logo } from "../constants/constants";
import { Input } from "../../ui";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserStart,
  registerUserFailure,
  registerUserStart,
  registerUserSuccess,
} from "../../slice/auth";
import AuthService from "../../service/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(registerUserStart());
    const user = {
      username: name,
      email,
      password,
    };
    try {
      const response = await AuthService.userRegister(user);
      console.log(response.data);
      console.log(user);

      dispatch(registerUserSuccess());
    } catch (error) {
      dispatch(registerUserFailure());
    }
  };

  return (
    <div className="d-flex align-items-center py-4 text-center mt-5">
      <main className="form-signin w-25 m-auto">
        <form>
          {logo}
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          <Input label={"Username"} state={name} setState={setName} />
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
            onClick={registerHandler}
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
              "Register"
            )}
          </button>
          <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
        </form>
      </main>
    </div>
  );
};

export default Register;
