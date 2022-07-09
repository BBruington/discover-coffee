import { table, findRecordByFilter, getMinifiedRecords } from "../../lib/airtable";

const favoriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    try{
      const { id } = req.body;

      if (id) {
        const records = await findRecordByFilter(id);
          
        if (records.length !== 0) {

          const record = records[0];

          const calculateVoting = parseInt(record.voting) + parseInt(1);

          // update a record
                          //this is a promise
          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculateVoting,
              }
            }
          ]);

          if (updateRecord) {
            const minifiedRecords = getMinifiedRecords(updateRecord);
            res.json(minifiedRecords);
          };
        } else {
          res.json({ message: "this coffee store's id doesn't exist ", id })
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" })
      }

    }catch (error) {
      res.status(500);
      res.json({ message: "there was an error using favoriteCoffeeStoreById api ", error})
    }
  }
}

export default favoriteCoffeeStoreById;