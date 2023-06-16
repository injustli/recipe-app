const {MongoClient, ServerApiVersion} = require("mongodb");
const uri = `mongodb+srv://justinhanyueli:${process.env.MONGODB_PASSWORD}@cluster.5lxangg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function addUser(user) {
  let result = undefined;
  try {
    await client.connect();
    const database = client.db("Recipes");
    const collection = database.collection("Users");
    
    const doc = {
      email: user.email,
      name: user.name,
      recipes: [],
    }
    result = await collection.insertOne(doc);
    console.log(`A user document was inserted with the _id: ${result.insertedId}`)
  } finally {
    await client.close();
  }
  return result;
}

async function findUser(user) {
  let result = undefined;
  try {
    await client.connect();
    const database = client.db("Recipes");
    const collection = database.collection("Users");

    const query = {email: user.email};

    result = await collection.findOne(query);
    console.log(result);
  } finally {
    await client.close();
  }
  return result;
}

module.exports = {
  addUser,
  findUser,
}
