require('dotenv').config()
const {MongoClient} = require('mongodb');
const { env } = require('process');
const mongoUri = env.MONGO_URI;


 
async function getDbData(parsedCode){
const client = new MongoClient(mongoUri);
const codeToSearch = parsedCode;
try {
    // Connect to the MongoDB cluster
    //await client.connect();

    // Make the appropriate DB calls
    return getCodeFromDb(client, codeToSearch);

} catch (e) {
    console.error(e);
} finally {
    await client.close();
}
}

function getCodeFromDb(client, codeToSearch){
/*database = client.db("");
collection = database.collection("");
const query = { code: codeToSearch};
const options = {
    projection: { code: 1 },
};
const codeFound = await collection.findOne(query, options);
*/
return 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=';
};

module.exports = { getDbData };