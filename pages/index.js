import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { initiateCheckOut} from '../lib/payments.js';
import products from '../products.json';


export default function Home() {
  console.log('products', products);
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
                    initiateCheckOut();
                  }}> Buy Now </button>
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
