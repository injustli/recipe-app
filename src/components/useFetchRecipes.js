import { useEffect, useState } from 'react';

// Returns a valid query parameter string depending on the ingredients state
const createIngredientQueryParam = (ingredients) => {
  let res = '';
  for (let ingredient of ingredients) {
    res += `ingredients=${ingredient}&`;
  }
  return res;
};

// Custom effect to fetch recipes to be displayed based on query params
export const useFetchRecipes = (
  currentPage,
  pageSize,
  ingredients,
  name,
  minTime,
  maxTime,
  creator
) => {
  const [recipes, setRecipes] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const result = await fetch(
          `/recipes?page=${currentPage}&limit=` +
            `${pageSize}&${createIngredientQueryParam(ingredients)}name=` +
            `${name}&minTime=${minTime}&maxTime=` +
            `${maxTime}&user=${creator}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
          }
        );
        const data = await result.json();
        setRecipes(data.data);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.log('Error in fetching recipes: ' + error);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [currentPage, pageSize, name, ingredients, minTime, maxTime, creator]);

  return { recipes, totalCount };
};
