import Header from "../../../components/Header";
import Search from "../../../components/Search";
import DefaultLayout from "../../../components/layout/DefaultLayout";

const Archive = () => {
  return (
    <>
      <DefaultLayout>
        <Header title="Archive" />
        <Search />
        <div className="grid pb-32 grid-cols-1 p-2 gap-4 max-w-[480px] mx-auto"></div>
      </DefaultLayout>
    </>
  );
};

export default Archive;
