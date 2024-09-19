import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  body: z.string().min(1, { message: "Body is required" }),
  archived: z.boolean(),
});

type FormData = z.infer<typeof schema>;

const AddEditNote: React.FC<{
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsBottomSheetOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      body: "",
      archived: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Title"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="mt-2">
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Body
          </label>
          <textarea
            id="body"
            rows={4}
            {...register("body")}
            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.body ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Write your note here..."
          ></textarea>
          {errors.body && (
            <p className="text-sm text-red-500">{errors.body.message}</p>
          )}
        </div>
        <div className="flex items-center justify-end mt-2">
          <input
            type="checkbox"
            id="archived"
            {...register("archived")}
            className="mr-2"
          />
          <label
            htmlFor="archived"
            className="text-sm font-medium text-gray-900 dark:text-white"
          >
            Archived
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};

AddEditNote.propTypes = {
  setIsBottomSheetOpen: PropTypes.func.isRequired,
};

export default AddEditNote;
