import Header from "../../../components/Header";
import UserInformation from "./UserInformation";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import ThemeToggle from "../../../components/ThemeToggle";
import LocaleToggle from "../../../components/LocaleToggle";
import { useAuth } from "../../../context/AuthContext";
const Profile = () => {
  const { logout } = useAuth();
  return (
    <>
      <DefaultLayout>
        <div className="dark:bg-gray-900">
          <Header title="Profile" />
          <UserInformation />
          <div className="mx-auto space-y-2 w-full mt-2 max-w-[95%]">
            <span className="ml-3 text-sm text-neutral-500">Theme</span>
            <div className="p-1 bg-neutral-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-xl">
              <div className="flex items-center justify-between p-3">
                <span>Dark Mode</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
          <div className="mx-auto space-y-2 w-full mt-2 max-w-[95%]">
            <span className="ml-3 text-sm text-neutral-500">Language</span>
            <div className="p-1 bg-neutral-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-xl">
              <div className="flex items-center justify-between p-3">
                <span>English</span>
                <LocaleToggle />
              </div>
            </div>
          </div>
          <div className="mx-auto space-y-2 w-full mt-4 max-w-[95%] ">
            <div
              onClick={() => logout()}
              className="p-1 text-white bg-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-xl"
            >
              <div className="flex items-center justify-center p-3 space-x-2 ">
                <span>Keluar</span>
                <span>
                  <i className="ri-logout-box-r-line"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="pb-10 mt-2 space-y-2 text-sm text-center text-neutral-400 dark:text-neutral-600">
            Pomoro v1.0 Beta
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Profile;
