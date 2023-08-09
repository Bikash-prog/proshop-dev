import { Row, Col, Alert } from "react-bootstrap";
import Product from "../components/Product.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";

const HomeScreen = () => {
  const { data: response, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <p>Latest Products</p>
          <Row>
            {response.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
