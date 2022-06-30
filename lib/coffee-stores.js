const getUrlForCoffeeStores = (latlong, query, limit) => {
  return (
    `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`
  );
}

export const fetchCoffeeStores = async () => {
  
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
    console.log(data.results)
  
    return data.results;
  

  //  .catch(err => console.error(err));

}