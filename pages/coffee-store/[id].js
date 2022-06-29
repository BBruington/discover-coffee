// note: http request is made using file name, not functional component
import { useRouter } from 'next/router';
// useRouter like most things in JS is an object

import Link from "next/link";
import Head from 'next/head';
import Image from 'next/image';

import coffeeStoreData from "../../data/coffee-stores.json";

import styles from '../../styles/coffee-store.module.css';
import cls from "classnames";

export function getStaticProps(staticProps) {

  const params = staticProps.params;
  //console.log('params', params);
  return {
    props: {
      coffeeStore: coffeeStoreData.find((coffeeStore) => {
        return (
          coffeeStore.id.toString() === params.id //dynamic id
        )
      }),
    },
  };
}

export function getStaticPaths() {

  // i can prerender all of the coffeestores by mapping
  // them out and finding the id
  const paths = coffeeStoreData.map( (coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths,
    // this is what manually prerendering pages looks like
    /*: [
      { params: { id: '0' } }, 
      { params: { id: '1' } }, 
    ],*/
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  
  //console.log('router', router);
  
  // Does route exist in getStaticPaths? If not, return Loading...
  // Then, does route exist in the data? show route if it does,
  // show error if not. //fallback: false auto goes to error
  if(router.isFallback) {
    return (
      <div>Loading...</div> 
      )
    };
    //console.log('props', props);

    // the address needs to be destrusctured AFTER the 
    // loading state if it wasn't a pre-rendered page
    // otherwise you will return undefined
    const {address, name, neighbourhood, imgUrl} = props.coffeeStore;

    const handleUpvoteButton = () => {
      console.log('upvote');
    };
    
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/"><a>Back to home</a></Link>
          </div>
          <div className={styles.namewrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image 
            src={imgUrl} 
            alt={`${name} image`}
            width={600} height={360}
            className={styles.storeImg}
          />
        </div>

        <div className={cls('glass',styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image 
              src='/static/icons/places.svg' 
              width='24' height='24' 
              alt={`places icon`}
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image 
              src='/static/icons/nearMe.svg' 
              width='24' height='24' 
              alt={`nearMe icon`}
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image 
              src='/static/icons/star.svg' 
              width='24' height='24' 
              alt={`star icon`}
            />
            <p className={styles.text}>1</p>
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