/*const {Datastore} = require("@google-cloud/datastore");
const datastore = new Datastore();

async function getRecipeEntities(pageCursor) {
  let query = datastore.createQuery("Recipe");

  if (pageCursor) {
    query = query.start(pageCursor);
  }

  const results = await datastore.runQuery(query);
  const entities = results[0];
  const info = results[1];

  if (info.moreResults !== Datastore.NO_MORE_RESULTS) {
    const results = await getRecipes(info.endCursor);
    return [...entities, results[0]];
  }
  return entities;
}

async function getRecipes(data) {
  if (!data.recipes) {
    const entities = await getRecipeEntities();
    const obj = entities.map(recipe => {
      return {
        id: recipe[datastore.KEY].id,
        name: recipe.name,
        ingredients: recipe.ingredients,
        method: recipe.method,
        createdBy: recipe.createdBy,
        time: recipe.time
      };
    });
    data.recipes = JSON.stringify(obj);
  }
  let recipes = JSON.parse(data.recipes);
  return filterRecipes(data, recipes);
}

function filterRecipes(data, recipes) {
  let filtered = recipes;
  if (Number(data.min)) {
    filtered = filtered.filter((e) => {
      return e.time >= Number(data.min);
    });
  }
  if (Number(data.max)) {
    filtered = filtered.filter((e) => {
      return e.time <= Number(data.max);
    });
  }
  if (data.name) {
    filtered = filtered.filter(e => {
      return e.name.toLowerCase().includes(data.name.toLowerCase());
    });
  }
  if (data.username) {
    filtered = filtered.filter(e => {
      return e.createdBy.toLowerCase().includes(data.username.toLowerCase());
    });
  }
  if (data.ingredients) {
    if (Array.isArray(data.ingredients)) {
      filtered = filtered.filter(e => {
        for (let i in data.ingredients) {
          if (!e.ingredients.some(s => s.toLowerCase().includes(data.ingredients[i].toLowerCase()))) {
            return false;
          }
        }
        return true;
      });
    } else {
      filtered = filtered.filter(e => {
        return e.ingredients.some(s => s.toLowerCase().includes(data.ingredients.toLowerCase()));
      });
    }
  }
  return [filtered.slice((Number(data.page) - 1) * data.limit, Number(data.page) * data.limit), filtered.length, recipes];
}

module.exports = {
  getRecipes,
}
*/
