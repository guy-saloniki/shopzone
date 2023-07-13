## ShopZone - MERN Stack eCommerce Platform

Full stack web app built using MERN (MongoDB, Express, React,
Node). The app includes a multi-step checkout process with paypal
integration, product search, rating & review, user proles, admin
functionality and more. The UI has created using React & React
Bootstrap library, and state management with Redux & Redux Toolkit.

## Website

https://shopzone-project.onrender.com/

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Products pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration

## Usage

- Create a MongoDB database and obtain your `MongoDB URI`
- Create a PayPal account and obtain your `Client ID`

## Env Variables

Rename the `example.env` file to `.env` and add the following:

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```
