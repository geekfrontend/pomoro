import Header from "../../../components/Header";
import UserInformation from "./UserInformation";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import ThemeToggle from "../../../components/ThemeToggle";
import LocaleToggle from "../../../components/LocaleToggle";
import { useAuth } from "../../../hooks/useAuth";
import { useLocale } from "../../../hooks/useLocale";
import { useTheme } from "../../../hooks/useTheme";

const Profile = () => {
  const { logout } = useAuth();
  const { translate, currentLocale } = useLocale();
  const { currentTheme } = useTheme();

  return (
    <>
      <DefaultLayout>
        <div className="dark:bg-gray-900">
          <Header title={`${translate("profile")}`} />
          <UserInformation />
          <div className="mx-auto space-y-2 w-full mt-2 max-w-[95%]">
            <span className="ml-3 text-sm text-neutral-500">
              {translate("theme")}
            </span>
            <div className="px-1 py-1 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg me-2 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              <div className="flex items-center justify-between p-3">
                <span>{`${
                  currentTheme === "light"
                    ? `${translate("lightMode")}`
                    : `${translate("darkMode")}`
                }`}</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
          <div className="mx-auto space-y-2 w-full mt-2 max-w-[95%]">
            <span className="ml-3 text-sm text-neutral-500">
              {translate("language")}
            </span>
            <div className="px-1 py-1 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg me-2 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              <div className="flex items-center justify-between p-3">
                <span>{`${
                  currentLocale === "en"
                    ? `${translate("english")}`
                    : `${translate("indonesia")}`
                }`}</span>
                <LocaleToggle />
              </div>
            </div>
          </div>
          <div className="mx-auto space-y-2 w-full mt-8 max-w-[95%] ">
            <div
              onClick={() => logout()}
              className="px-1 py-1 mb-2 text-sm font-medium text-white bg-red-700 rounded-lg cursor-pointer focus:outline-none hover:bg-red-800 focus:ring-4 focus:ring-red-300 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 "
            >
              <div className="flex items-center justify-center p-3 space-x-2 ">
                <span>{translate("logout")}</span>
                <span>
                  <i className="ri-logout-box-r-line"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="pb-10 mt-4 space-y-2 text-sm font-semibold text-center text-neutral-400 dark:text-neutral-600">
            Pomoro v1.0 Beta
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Profile;
