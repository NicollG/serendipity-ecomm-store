import {useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { initiateCheckout } from '../lib/payments.js';

import products from '../products.json';

const defaultCart = { 
  products: {}
}

export default function Home() {
  
  const [cart, updateCart] = useState(defaultCart);

  const cartItems = Object.keys(cart.products).map(key =>{ 
    const product = products.find(({id}) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: product.price

    }
  });

  const subtotal = cartItems.reduce((accumulator, { pricePerItem, quantity }) => {
    return accumulator + ( pricePerItem * quantity );
  }, 0);

  const totalItems = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  console.log('cartItems', cartItems);

  function addToCart({ id } = {}) {
    updateCart(prev => {
      let cartState = {...prev};
      if (cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;
      } else {
        cartState.products[id] = {
          id, 
          quantity: 1
        }

      }
      return cartState;
    })

  }

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map(({ id, quantity }) => {
        return {
          price: id,
          quantity
        }
    })

  })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Serendipity</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
         Welcome to Serendipity
        </h1>

        <p className={styles.description}>
          The best place for your kids development!! 
          Let's get started 
        </p>

        <p className={styles.description}>
          <strong>Items:</strong> {totalItems}
          <br />
          <strong>Total Cost:</strong> ${subtotal}
          <br />
          <button className={styles.button} onClick={checkout}>CheckOut</button>

        </p>


        <ul className={styles.grid}>
          {products.map(product => {
            const {id, tittle, price, description, image} = product;
            return (
              <li key={id} className={styles.card}>
                <a href="#" >
                  <img src={image} alt={tittle}/>
                  <h3>{ tittle }</h3>
                  <p>${ price }</p>
                  <p>{ description }</p>
                </a>
                <p>
                  <button className={styles.button} onClick={() => {
                    addToCart({
                      id
                    })
                    
                  }}> Add To Cart </button>
                </p>
              </li>
            )
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
