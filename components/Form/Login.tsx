import { useRouter } from "next/router";
import React, { FormEventHandler, useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { fetchUser, registerUser } from "../../store/slice/auth";
import { toast } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [re_enter_password, setRe_enter_password] = React.useState("");
  const [formtype, setFormtype] = React.useState<"login" | "register">("login");
  const router = useRouter();
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const stateSetters: {
      [key: string]: React.Dispatch<React.SetStateAction<string>>;
    } = {
      email: setEmail,
      password: setPassword,
      name: setName,
      "re-enter_password": setRe_enter_password,
    };

    if (stateSetters[name]) {
      stateSetters[name](value);
    }
  };

  const login: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the fetchUser async thunk to fetch user data from the API
      await dispatch(fetchUser({ email, password }));
      if (localStorage.getItem("token")) {
        await router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (password !== re_enter_password) {
      toast.error("Password does not match");
      return;
    }

    try {
      // Dispatch the registerUser async thunk to register the user
      await dispatch(registerUser({ email, password, name }));

      // After successful registration, dispatch the fetchUser async thunk to perform the login
      await dispatch(fetchUser({ email, password }));

      if (localStorage.getItem("token")) {
        await router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full sm:border sm:w-1/3 ">
      <form
        className="form-control"
        onSubmit={formtype === "login" ? login : register}
      >
        <input
          placeholder="email"
          type="text"
          id="email"
          name="email"
          className="input input-bordered mb-4"
          onChange={onchange}
          required
        />
        <input
          placeholder="password"
          type="password"
          id="password"
          name="password"
          className="input input-bordered mb-4"
          onChange={onchange}
          required
        />
        {formtype === "register" && (
          <>
            <input
              placeholder="confirm password"
              type="password"
              id="re-enter_password"
              name="re-enter_password"
              className="input input-bordered mb-4"
              onChange={onchange}
              required
            />
            <input
              placeholder="name"
              type="text"
              id="name"
              name="name"
              className="input input-bordered mb-4"
              onChange={onchange}
              required
            />
          </>
        )}

        <div className="flex">
          {formtype === "register" ? (
            <>
              <p> Already have an account? </p>
              &nbsp;
              <button
                className="text-pink-500"
                onClick={() => setFormtype("login")}
              >
                login here
              </button>
            </>
          ) : (
            <>
              <p> Do not have an account </p>
              &nbsp;
              <button
                className="text-pink-500"
                onClick={() => setFormtype("register")}
              >
                register here
              </button>
            </>
          )}
        </div>
        <div className="ml-auto mr-0 mt-2">
          <button className="btn btn-primary" type="submit">
            {formtype === "register" ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
