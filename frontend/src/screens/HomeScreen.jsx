import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Product from "../components/Product.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const {
    data: response,
    isLoading,
    error,
  } = useGetProductsQuery({ keyword, pageNumber });
  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
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
          <Paginate
            pages={response.pages}
            page={response.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
