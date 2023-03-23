require('dotenv').config()
const {MongoClient} = require('mongodb');
const { env } = require('process');
const mongoUri = env.MONGO_URI;


 
async function getDbData(parsedCode){
const client = new MongoClient(mongoUri);
const codeToSearch = parsedCode;
try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await  getCodeFromDb(client, codeToSearch);

} catch (e) {
    console.error(e);
} finally {
    await client.close();
}
}

/*async function listDatabases(client){
databasesList = await client.db().col

console.log("Databases:");
databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};*/

async function getCodeFromDb(client, codeToSearch){
/*database = client.db("");
collection = database.collection("");
const query = { code: codeToSearch};
const options = {
    projection: { code: 1 },
};
const codeFound = await collection.findOne(query, options);
*/
return '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4';
};

module.exports = { getDbData };