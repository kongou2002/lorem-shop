"use client";

import { useRouter } from "next/router";
import React, { FormEventHandler } from "react";

type user = {
  id: number;
  name: string;
  email: string;
  role: string;
};
function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState<user>();
  const router = useRouter();
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const Login: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    //set email and password
    setEmail(e.currentTarget.email.value);
    setPassword(e.currentTarget.password.value);
    //fetch data from prisma
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      //get data from response
      const data = await res.json();
      const { user, token } = data;
      await setUser(user);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full sm:border mr-auto sm:w-1/3">
      <form className="form-control" onSubmit={Login}>
        <input
          placeholder="email"
          type="text"
          id="email"
          name="email"
          className="input input-bordered "
          onChange={onchange}
          required
        />
        <input
          placeholder="password"
          type={"password"}
          id="password"
          name="password"
          className="input input-bordered"
          onChange={onchange}
          required
        />
        <div className="ml-auto mr-0 mt-2">
          <button className="btn btn-primary">register</button>
          <button className="btn btn-primary ml-3" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
