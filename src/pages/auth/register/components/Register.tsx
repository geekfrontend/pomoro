import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../../../components/ThemeToggle";
import LocaleToggle from "../../../../components/LocaleToggle";
import Loading from "../../../../components/Loading";
import { schema } from "../schema";
import { useLocale } from "../../../../hooks/useLocale";

type FormData = z.infer<typeof schema>;

const Register: React.FC = () => {
  const { registerUser, loading, error, isAuthenticated } = useAuth();
  const [secureEntry, setSecureEntry] = useState(true);
  const { translate } = useLocale();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white dark:bg-gray-900">
      <div className="w-full mb-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {translate("welcome")}
        </h1>
        <p className="font-medium text-gray-500 dark:text-gray-300">
          {translate("definitionPomoro")}
        </p>
      </div>
      {error && (
        <p className="my-2 text-sm text-center text-red-600 dark:text-red-500">
          {error}
        </p>
      )}
      <form
        className="w-full max-w-sm mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            {translate("name")}
          </label>
          <div className="flex items-center px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-600">
            <i className="text-xl ri-user-fill text-primary"></i>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder={`${translate("placeholderName")}`}
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
            {translate("email")}
          </label>
          <div className="flex items-center px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-600">
            <i className="text-xl ri-mail-fill text-primary"></i>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder={`${translate("placeholderEmail")}`}
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
            {translate("password")}
          </label>
          <div className="flex items-center px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-600">
            <i className="text-xl ri-lock-password-fill text-primary"></i>
            <input
              type={secureEntry ? "password" : "text"}
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
            <button
              type="button"
              onClick={() => setSecureEntry(!secureEntry)}
              className="ml-2"
            >
              {secureEntry ? (
                <i className="ri-eye-off-fill"></i>
              ) : (
                <i className="ri-eye-fill"></i>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-blue-700 text-white font-medium rounded-xl py-2.5 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <> {translate("register")}</>
          )}
        </button>
      </form>

      <div className="flex items-center justify-center mt-5 space-x-2">
        <p className="text-gray-900 dark:text-gray-300">
          {translate("alreadyHaveAccount")}
        </p>
        <Link to="/login" className="text-blue-700 dark:text-blue-500">
          {translate("login")}
        </Link>
      </div>
      <div className="flex items-center justify-between mt-4 space-x-2">
        <ThemeToggle />
        <LocaleToggle />
      </div>
    </div>
  );
};

export default Register;
