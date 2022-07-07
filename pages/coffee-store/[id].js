// note: http request is made using file name, not functional component
import { useRouter } from 'next/router';
// useRouter like most things in JS is an object

import Link from "next/link";
import Head from 'next/head';
import Image from 'next/image';

import coffeeStoreData from "../../data/coffee-stores.json";

import styles from '../../styles/coffee-store.module.css';
import cls from "classnames";

import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/store-context';

import { isEmpty } from '../../utils';

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log('params', params);

  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return (
      coffeeStore.id.toString() === params.id //dynamic id
    )
  });

  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  // i can prerender all of the coffeestores by mapping
  // them out and finding the id
  const paths = coffeeStores.map( (coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return {
    // this is what manually prerendering pages looks like
    /*: [
      { params: { id: '0' } }, 
      { params: { id: '1' } }, 
    ],*/
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  const id = router.query.id;
  // Does route exist in getStaticPaths? If not, return Loading...
  // Then, does route exist in the data? show route if it does,
  // show error if not. //fallback: false auto goes to error
  if(router.isFallback) {
    return (
      <div>Loading...</div> 
      )
    };
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore)

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const  {
        id, name, voting, imgUrl, neighborhood, address
      } = coffeeStore;

      const response = await fetch('/api/createCoffeeStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: `${id}`, 
          name, 
          voting: 0, 
          imgUrl, 
          neighborhood: neighborhood || '', 
          address: address || '',
        }),
      });

      const dbCoffeeStore = response.json();
      console.log({dbCoffeeStore})
    }catch(error) {
      console.error("Error with creating the coffee store: ", error);
    }
  }
  
  useEffect(() => {
    if(isEmpty(initialProps.coffeeStore)){
      if(coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
          return (
            coffeeStore.id.toString() === id //dynamic id
          )
        });

        if (coffeeStoreFromContext) {
          setCoffeeStore(coffeeStoreFromContext);
          handleCreateCoffeeStore(coffeeStoreFromContext);
        }
      }
    } else {
      //any static generated routes
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps, initialProps.coffeeStore]);  
  //console.log('router', router);

    // the address needs to be destrusctured AFTER the 
    // loading state if it wasn't a pre-rendered page
    // otherwise you will return undefined
    const {name, address, neighborhood, imgUrl} = coffeeStore;

    const [votingCount, setVotingCount] = useState(0);

    const handleUpvoteButton = () => {
      let count = votingCount + 1;
      setVotingCount(count);
    };
    
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/"><a>← Back to home</a></Link>
          </div>
          <div className={styles.namewrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image 
            src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} 
            alt={`${name} image`}
            width={600} height={360}
            className={styles.storeImg}
          />
        </div>

        <div className={cls('glass',styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image 
                src='/static/icons/places.svg' 
                width='24' height='24' 
                alt={`places icon`}
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image 
                src='/static/icons/nearMe.svg' 
                width='24' height='24' 
                alt={`nearMe icon`}
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image 
              src='/static/icons/star.svg' 
              width='24' height='24' 
              alt={`star icon`}
            />
            <p className={styles.text}>{votingCount}</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Upvote!
          </button>
        </div>
      </div>
    </div>
  )
};

export default CoffeeStore;