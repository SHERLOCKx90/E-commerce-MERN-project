import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col my-5 justify-center items-center w-full gap-[2rem] mb-[1rem]" >
            <h1 className="text-[3rem]">
              Our Trending Wear
            </h1>

            <Link
              to="/shop"
              className="bg-red-600 font-bold rounded-full py-2 px-10"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id} className="h-max w-max ease-in-out duration-150 hover:translate-y-2">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
