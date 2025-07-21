import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { registerRequest } from '../api/auth.js'

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  // console.log(user);

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
    // console.log(values);
    // const res = await registerRequest(values);
    // console.log(res);
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <h1 className="text-2xl font-bold">Register</h1>
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="Username"
            className="w-full bg-zinc-700 text-white px-4 py- rounded-md my-2"
          />
          {errors.username && (
            <p className="text-red-500">Username is requiered</p>
          )}

          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full bg-zinc-700 text-white px-4 py- rounded-md my-2"
          />
          {errors.email && <p className="text-red-500">Email is requiered</p>}

          <input
            type="text"
            {...register("password", { required: true })}
            placeholder="Password"
            className="w-full bg-zinc-700 text-white px-4 py- rounded-md my-2"
          />
          {errors.password && (
            <p className="text-red-500">Password is requiered</p>
          )}
          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
          >
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Already have account?{" "}
          <Link to="/login" className="text-sky-500">
            Sing in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
