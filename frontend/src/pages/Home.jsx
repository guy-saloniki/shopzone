import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);
  return (
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
  );
};

export default Home;
