import { useMemo } from "react";

// Returns a valid query parameter string depending on the ingredients state
const createIngredientQueryParam = (ingredients) => {
  let res = "";
  for (let i in ingredients) {
    res += `ingredients=${ingredients[i].name}&`;
  }
  return res;
};

export const useFetchRecipes = ({
  currentPage,
  pageSize,
  ingredients,
  name,
  minTime,
  maxTime,
  creator,
}) => {
  const fetchResults = useMemo(async () => {
    const result = await fetch(
      `/recipes?page=${currentPage}&limit=` +
        `${pageSize}&${createIngredientQueryParam(ingredients)}name=` +
        `${name}&minTime=${minTime}&maxTime=` +
        `${maxTime}&user=${creator}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await result.json();
    return data;
  }, [currentPage, pageSize, name, ingredients, minTime, maxTime, creator]);

  return fetchResults;
};
