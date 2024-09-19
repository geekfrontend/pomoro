import Header from "../../../components/Header";
import Search from "../../../components/Search";
import DefaultLayout from "../../../components/layout/DefaultLayout";

const Home = () => {
  return (
    <>
      <DefaultLayout>
        <Header title="Pomoro" />
        <Search />
      </DefaultLayout>
    </>
  );
};

export default Home;
