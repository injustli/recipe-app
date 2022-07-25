const {Datastore} = require("@google-cloud/datastore");
const datastore = new Datastore();

async function addUsers(data) {
  const userKey = datastore.key("User");
  const user = {
    key: userKey,
    data: {
      email: data.email,
      name: data.name,
      recipes: []
    }
  };
  try {
    await datastore.save(user);
  } catch (err) {
    console.error("addUsers Error: ", err);
  }
  return getEntityByKey(userKey);
}

async function getEntityByKey(key) {
  return datastore.get(key)
    .then(data => {
      return {
        email: data[0].email,
        name: data[0].name,
        id: data[0][datastore.KEY].id
      };
    })
    .catch(err => console.error("entityByKey Error: ", err)); 
}

async function updateUser(id) {
  const transaction = datastore.transaction();
  const userKey = datastore.key(['User', datastore.int(id)]);
  try {
    await transaction.run();
    const [user] = await transaction.get(userKey);
    transaction.save({
      key: userKey,
      data: user
    });
    await transaction.commit();
    return getEntityByKey(userKey);
  } catch (err) {
    console.error("updatedUser Error: ", err);
    await transaction.rollback();
  }
  return null;
}

async function findUser(data) {
  const query = datastore.createQuery("User")
    .filter("email", "=", data.email);
  return datastore.runQuery(query)
    .then(data => {
      const entities = data[0];
      if (entities.length > 0) {
        return entities[0][datastore.KEY].id;
      }
    })
    .catch(err => console.error("findUser Error:", err));  
}

module.exports = {
  addUsers,
  updateUser,
  findUser,
}
