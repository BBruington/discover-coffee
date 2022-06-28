// note: http request is made using file name, not functional component
import { useRouter } from 'next/router';
// useRouter like most things in JS is an object

import Link from "next/link";

import coffeeStoreData from "../../data/coffee-stores.json";

export function getStaticProps(staticProps) {

  const params = staticProps.params;
  console.log('params', params);
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
  return {
    paths: [
      { params: { id: '0' } }, 
      { params: { id: '1' } },
    ],
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  const {coffeeStore} = props;

  console.log('router', router);

// Does route exist in getStaticPaths? If not, return Loading...
// Then, does route exist in the data? show route if it does,
// show error if not. //fallback: false auto goes to error

  if(router.isFallback) {
    return (
      <div>Loading...</div> 
    )
  };

  console.log('props', props);

    
  return (
    <div>
      Coffee Store Page {router.query.id}
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/dynamic">
        <a>Go to page dynamic</a>
      </Link>
      <p>{coffeeStore.address}</p>
      <p>{coffeeStore.name}</p>
    </div>
  )
};

export default CoffeeStore;