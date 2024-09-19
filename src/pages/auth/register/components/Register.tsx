import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ThemeToggle from "../../../../components/ThemeToggle";

const schema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

type FormData = z.infer<typeof schema>;

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Here you would typically handle the registration logic
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white dark:bg-graydark">
      {/* Welcome Text */}
      <div className="w-full mb-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Hi there, Welcome!
        </h1>
        <p className="font-medium text-gray-500 dark:text-gray-300">
          Pomoro is a simple pomodoro app
        </p>
      </div>

      {/* Form */}
      <form
        className="w-full max-w-sm mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name Input */}
        <div className="w-full mb-5">
          <label
            htmlFor="name"
            className={`block mb-2 text-sm font-medium ${
              dirtyFields.name && !errors.name
                ? "text-green-700 dark:text-green-500"
                : errors.name
                ? "text-red-700 dark:text-red-500"
                : "text-gray-900 dark:text-gray-300"
            }`}
          >
            Name
          </label>
          <div className="flex items-center px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-600">
            <i className="text-xl ri-user-fill text-primary"></i>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Your Name"
              className={`flex-1 bg-transparent focus:outline-none p-2.5 ${
                dirtyFields.name && !errors.name
                  ? "text-green-900 dark:text-green-500 placeholder-green-700 dark:placeholder-green-500"
                  : errors.name
                  ? "text-red-900 dark:text-red-500 placeholder-red-700 dark:placeholder-red-500"
                  : "text-gray-900 dark:text-gray-300"
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="w-full mb-5">
          <label
            htmlFor="email"
            className={`block mb-2 text-sm font-medium ${
              dirtyFields.email && !errors.email
                ? "text-green-700 dark:text-green-500"
                : errors.email
                ? "text-red-700 dark:text-red-500"
                : "text-gray-900 dark:text-gray-300"
            }`}
          >
            Email
          </label>
          <div className="flex items-center px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-600">
            <i className="text-xl ri-mail-fill text-primary"></i>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="name@example.com"
              className={`flex-1 bg-transparent focus:outline-none p-2.5 ${
                dirtyFields.email && !errors.email
                  ? "text-green-900 dark:text-green-500 placeholder-green-700 dark:placeholder-green-500"
                  : errors.email
                  ? "text-red-900 dark:text-red-500 placeholder-red-700 dark:placeholder-red-500"
                  : "text-gray-900 dark:text-gray-300"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className={`block mb-2 text-sm font-medium ${
              dirtyFields.password && !errors.password
                ? "text-green-700 dark:text-green-500"
                : errors.password
                ? "text-red-700 dark:text-red-500"
                : "text-gray-900 dark:text-gray-300"
            }`}
          >
            Password
          </label>
          <div className="flex items-center px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-600">
            <i className="text-xl ri-lock-password-fill text-primary"></i>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="••••••••"
              className={`flex-1 bg-transparent focus:outline-none p-2.5 ${
                dirtyFields.password && !errors.password
                  ? "text-green-900 dark:text-green-500 placeholder-green-700 dark:placeholder-green-500"
                  : errors.password
                  ? "text-red-900 dark:text-red-500 placeholder-red-700 dark:placeholder-red-500"
                  : "text-gray-900 dark:text-gray-300"
              }`}
            />
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-blue-700 text-white font-medium rounded-xl py-2.5 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Register
        </button>
      </form>

      {/* Login Link */}
      <div className="flex items-center justify-center mt-5 space-x-2">
        <p className="text-gray-900 dark:text-gray-300">
          Already have an account?
        </p>
        <Link to="/login" className="text-blue-700 dark:text-blue-500">
          Login
        </Link>
      </div>
      {/* Toggle Theme */}
      <div className="absolute bottom-6 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Register;
