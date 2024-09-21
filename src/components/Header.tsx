import PropTypes from "prop-types";

const Header = ({ title, onBack }: { title: string; onBack?: () => void }) => {
  return (
    <header className="sticky top-0 z-50 mb-3 bg-white border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="h-auto px-6 py-4 space-y-6 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2 text-blue-500 dark:text-blue-400">
            {onBack && (
              <button onClick={onBack}>
                <i className="inline-flex items-center justify-center w-10 h-10 mr-2 text-xl font-bold text-white bg-blue-600 rounded-full ri-arrow-left-line hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"></i>
              </button>
            )}
            <h1 className="text-2xl font-semibold whitespace-nowrap dark:text-white">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func,
};

export default Header;
