import { RecipeType } from '@utils/types';
import { useEffect, useState } from 'react';

// Returns a valid query parameter string depending on the ingredients state
const createIngredientQueryParam = (ingredients: string[]) => {
  let res = '';
  for (let ingredient of ingredients) {
    res += `ingredients=${ingredient}&`;
  }
  return res;
};

const environment = import.meta.env.VITE_NODE_ENV;
const SERVER_URL =
  environment == 'production'
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:8080';

// Custom effect to fetch recipes to be displayed based on query params
export const useFetchRecipes = (
  currentPage: number,
  pageSize: number,
  ingredients: string[],
  name: string,
  minTime: number,
  maxTime: number,
  creator: string
) => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${SERVER_URL}/api/recipes?page=${currentPage}&limit=` +
            `${pageSize}&${createIngredientQueryParam(ingredients)}name=` +
            `${name}&minTime=${minTime}&maxTime=` +
            `${maxTime}&user=${creator}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            signal: controller.signal
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
