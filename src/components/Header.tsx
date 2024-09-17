import PropTypes from "prop-types";

const Header = ({ title, onBack }: { title: string; onBack?: () => void }) => {
  return (
    <header className="sticky top-0 z-50">
      <div className="h-auto px-6 py-4 space-y-6 bg-white dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2 text-blue-500 dark:text-blue-400">
            {onBack && (
              <button onClick={onBack}>
                <i className="mr-2 text-xl font-bold ri-arrow-left-line"></i>
              </button>
            )}
            <h1 className="text-2xl font-bold">{title}</h1>
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
