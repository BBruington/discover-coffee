// note: http request is made using file name, not functional component
import { useRouter } from 'next/router';
// useRouter like most things in JS is an object

const CoffeeStore = () => {
    const router = useRouter();
    console.log('router', router)
    return <div>Coffee Store Page {router.query.id}</div>;
};

export default CoffeeStore;