const UserInformation = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-6 space-y-4">
      <img
        className="w-16 h-16 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src={`https://ui-avatars.com/api/?name=Geek+Frontend&background=0D8ABC&color=fff&rounded=true`}
        alt="Avatar"
      />
      <div className="w-4/5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          disabled
          placeholder="Geek Frontend"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="w-4/5 ">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          disabled
          placeholder="geekfrontend@gmail.com"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default UserInformation;
