import Header from "../../../components/Header";
import UserInformation from "./UserInformation";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import ThemeToggle from "../../../components/ThemeToggle";
import LocaleToggle from "../../../components/LocaleToggle";

const Profile = () => {
  return (
    <>
      <DefaultLayout>
        <Header title="Profile" />
        <UserInformation />
        <div className="block w-4/5 p-1 mx-auto mt-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <ThemeToggle />
        </div>
        <div className="block w-4/5 p-1 mx-auto mt-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <LocaleToggle />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Profile;
