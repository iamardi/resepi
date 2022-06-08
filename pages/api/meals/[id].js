import { quickMeals } from '../../../randomMeals';

export default async function mealHandler({ query: { id } }, res) {
  try {
    // const filtered = quickMeals.recipes.filter((m) => m.id == id);

    // res.status(200).json(filtered[0]);

    const meal = await fetchMealById(id);

    res.status(200).json(meal);
  } catch (err) {
    res.status(404).json({ message: 'Meal not found' });
  }
}

async function fetchMealById (id) {
  try {
    const spoonacularUrl = process.env.SPOONACULAR_URL;
    const spoonacularApiKey = process.env.SPOONACULAR_API_KEY;

    const data = await fetch(
      `${spoonacularUrl}/${id}/information?apiKey=${spoonacularApiKey}`
    );

    const meal = await data.json();

    if (meal) return meal;

    return false;
  } catch (err) {
    return false;
  }
}