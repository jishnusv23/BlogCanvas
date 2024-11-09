import Pagination from "../../Components/common/Pagination";
import Blog from "../../Components/features/Blog/Blog";
import Header from "../../Components/layouts/Header";
import TextHead from "../../Components/layouts/TextHead";

const Home = () => {
  return (
    <>
      <Header />
      <div className="pt-20">
        <TextHead />
        <Blog />
      </div>
      <div>
        <Pagination currentPage={1} onPageChange={() => "ksf"} totalPages={5} />
      </div>
    </>
  );
};

export default Home;
