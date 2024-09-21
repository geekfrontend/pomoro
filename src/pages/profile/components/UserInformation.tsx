import { useAuth } from "../../../hooks/useAuth";

const UserInformation = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center w-full mt-6 space-y-2">
      <img
        className="w-16 h-16 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src={`https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff&rounded=true`}
        alt="Avatar"
      />
      <div className="mx-auto space-y-2 w-full max-w-[95%]">
        <span className="ml-3 text-sm text-neutral-500">Name</span>
        <div className="px-5 py-1 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg me-2 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <div className="flex items-center justify-between p-3">
            <span>{user?.name}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto space-y-2 w-full max-w-[95%]">
        <span className="ml-3 text-sm text-neutral-500">Email</span>
        <div className="px-5 py-1 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg me-2 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <div className="flex items-center justify-between p-3">
            <span>{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
