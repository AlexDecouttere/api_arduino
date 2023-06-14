require('dotenv').config()
const {MongoClient} = require('mongodb');
const { env } = require('process');
const mongoUri = env.MONGO_URI;

const client = new MongoClient(mongoUri);

async function getDbData(parsedCode){
const codeToSearch = parsedCode;
try {
    // Connect to the MongoDB cluster
    await client.connect();

    const found = await getCodeFromDb(client, codeToSearch)
    console.log(found);

    return found;

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function getCodeFromDb(client, codeToSearch){
    const database = client.db("lockbuy");
    collection = database.collection("code");
    const query = { lockerID:'I01A'};
    const options = {
        projection: { lockerID: 1 ,code: 1 },
    };
    const codeFound = await collection.findOne(query, options);
    console.log(codeFound);
    await delDocument(database, collection, 'I01A', codeToSearch)
    return codeFound.code;
};

async function delDocument(base, collection, lockerId, code ){
   collection = client.db("lockbuy").collection("code")
    const result = await collection.deleteOne({ code: code } );
        if (result.deletedCount === 1) {
          console.log("Successfully deleted one document.");
        } else {
          console.log("No documents matched the query. Deleted 0 documents.");
        }
}

module.exports = { getDbData };