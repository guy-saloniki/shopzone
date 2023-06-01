import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to ShopZone',
  description: 'Here you will find top quality products with the best prices',
  keywords: 'electronics, family, best electronics, cheap electronics',
};

export default Meta;
