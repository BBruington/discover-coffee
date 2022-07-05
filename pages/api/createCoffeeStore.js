const Airtable = require('airtable');
const base = new Airtable(
  {apiKey: process.env.AIRTABLE_API_KEY})
  .base(process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

console.log({ table });

const createCoffeeStore = (req, res) => {
  if (req.method === 'POST'){
    res.json({message: "This is the createCoffeeStore api POST"})
  } else {
    res.json({ message: 'This is the createCoffeeStore api GET'})
  }
};

export default createCoffeeStore;