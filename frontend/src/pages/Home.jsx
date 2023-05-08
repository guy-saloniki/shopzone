import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Products</h1>
          <Row>
            {products.map((item) => {
              return (
                <Col sm="12" md="6" lg="4" xl="3" key={item._id}>
                  <Product product={item} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default Home;
