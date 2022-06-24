// note: http request is made using file name, not functional component
import { useRouter } from 'next/router';
// useRouter like most things in JS is an object

import Link from "next/link";

const CoffeeStore = () => {
    const router = useRouter();
    console.log('router', router)
    return (
        <div>
            Coffee Store Page {router.query.id}
            <Link href="/">
                <a>Back to home</a>
            </Link>
            <Link href="/coffee-store/dynamic">
                <a>Go to page dynamic</a>
            </Link>

        </div>
    )
};

export default CoffeeStore;