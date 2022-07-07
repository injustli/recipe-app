const {Datastore} = require("@google-cloud/datastore");
const datastore = new Datastore();

async function addUsers(data) {
  const userKey = datastore.key("User");
  const user = {
    key: userKey,
    method: "upsert",
    data: {
      email: data.email,
      name: data.name,
      recipes: data.recipes
    }
  };
  await datastore.save(user);
  datastore.get(userKey, (err, entity) => {
    //console.error("user entity: " + err);
    return {
      email: entity.email,
      name: entity.name,
      recipes: entity.recipes,
      id: entity[datastore.KEY].id
    }
    //console.log("user entity: ");
    //console.log(res);
    //return res;
  });
}

async function updateUser(name, email, data) {
  
}

async function findUser(name, email) {
  const query = datastore.createQuery("User")
    .filter("name", name)
    .filter("email", email);
  datastore.runQuery(query)
    .then(entities => {
      if (entities.length > 0) {
        return [true, entities[0]];
      }
    });
  return [false, null];
}


module.exports = {
  addUsers,
  updateUser,
  findUser,
}
