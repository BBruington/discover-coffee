import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latlong, query, limit) => {
  return (
    `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`
  );
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 30,
  });
  const unsplashResults = photos.response.results
  
  return unsplashResults.map((result) => result.urls['small']);  
};

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos();
  
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

    const response = await fetch(getUrlForCoffeeStores(
      '35.79768407879737%2C-78.68221849038873', 
      'coffee', 
      '6'
      ), 
      options
    );
    
    const data = await response.json();  
    console.log(data.results);
    
    return data.results.map((result, idx) => {
      const neighborhood = result.location.neighborhood;
      return {
        id: result.fsq_id,
        address: result.location.address,
        name: result.name,
        neighborhood: neighborhood.length > 0 ? neighborhood[0] : "",
        imgUrl: photos.length > 0 ? photos[idx] : null,
      };      
    });
  //  .catch(err => console.error(err));
};