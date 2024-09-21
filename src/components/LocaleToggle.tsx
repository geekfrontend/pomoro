import { useLocale } from "../hooks/useLocale";

export default function LocaleToggle() {
  const { currentLocale, changeCurrentLocale } = useLocale();

  const toggleLocale = () => {
    changeCurrentLocale(currentLocale === "en" ? "id" : "en");
  };

  return (
    <div>
      <button
        onClick={toggleLocale}
        className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800"
      >
        {currentLocale === "en" ? (
          <span className="text-gray-500 dark:text-gray-400">EN</span>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">ID</span>
        )}
        <span className="sr-only">
          Switch to {currentLocale === "en" ? "English" : "Indonesian"}
        </span>
      </button>
    </div>
  );
}
