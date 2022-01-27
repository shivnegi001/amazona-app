import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return (
    <div className="row center">
      {loading ? (
        <LoadingBox>
          <div className="loading">
            <i className="fa fa-spinner fa-spin"></i> Loading...
          </div>
        </LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))
      )}
    </div>
  );
}
export default HomeScreen;
