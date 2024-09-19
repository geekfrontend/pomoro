import Header from "../../../components/Header";
import Search from "../../../components/Search";

const Archive = () => {
  return (
    <>
      <Header title="Archive" />
      <Search />
      <div className="grid pb-32 grid-cols-1 p-2 gap-4 max-w-[480px] mx-auto"></div>
    </>
  );
};

export default Archive;
