import { Link, useLocation, useSearchParams } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ search: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (query) {
      setSearchParams({ search: query });
    }
  };

  return (
    <div>
      <div className="max-w-[480px] mx-auto p-2">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  value={query}
                  onChange={handleSearchChange}
                  className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="max-w-[480px] mx-auto p-2">
        <Link
          className={`${
            location.pathname === "/"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          } text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300`}
          to={"/"}
        >
          Active
        </Link>
        <Link
          className={`${
            location.pathname === "/notes/archive"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          } text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300`}
          to={"/notes/archive"}
        >
          Archive
        </Link>
      </div>
    </div>
  );
};

export default Search;
