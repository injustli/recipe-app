import { RecipeType } from '@/utils/types';
import { useEffect, useState } from 'react';
import useNotifications from './useNotifcations';
import { SERVER_URL } from '@/utils/constants';

// Returns a valid query parameter string depending on the ingredients state
const createIngredientQueryParam = (ingredients: string[]) => {
  let res = '';
  for (let ingredient of ingredients) {
    res += `ingredients=${ingredient}&`;
  }
  return res;
};

// Custom effect to fetch recipes to be displayed based on query params
const useFetchRecipes = (
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
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotifications();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
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
        if (!(error instanceof DOMException)) {
          console.log('Error in fetching recipes:', error);
          handleError('Error occurred while fetching recipes');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [currentPage, pageSize, name, ingredients, minTime, maxTime, creator]);

  return { recipes, totalCount, loading };
};

export default useFetchRecipes;
