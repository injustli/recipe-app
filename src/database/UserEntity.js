const {Datastore} = require("@google-cloud/datastore");
const datastore = new Datastore();

module.exports = async function addUsers(data) {
  const userKey = datastore.key("User");
  const user = {
    key: userKey,
    data: {
      email: data.email,
      name: data.name,
      recipes: []
    }
  };
  await datastore.save(user);
  datastore.get(userKey, (err, entity) => {
    console.log(entity);
  })
}
