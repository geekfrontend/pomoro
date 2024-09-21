const UserInformation = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-6 space-y-2">
      <img
        className="w-16 h-16 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src={`https://ui-avatars.com/api/?name=Geek+Frontend&background=0D8ABC&color=fff&rounded=true`}
        alt="Avatar"
      />
      <div className="mx-auto space-y-2 w-full max-w-[95%]">
        <span className="ml-3 text-sm text-neutral-500">Name</span>
        <div className="p-1 bg-neutral-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-xl">
          <div className="flex items-center justify-between p-3">
            <span>Geek Frontend</span>
          </div>
        </div>
      </div>
      <div className="mx-auto space-y-2 w-full max-w-[95%]">
        <span className="ml-3 text-sm text-neutral-500">Email</span>
        <div className="p-1 bg-neutral-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-xl">
          <div className="flex items-center justify-between p-3">
            <span>geekfrontend@gmail</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
