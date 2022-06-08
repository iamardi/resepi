export default async function searchHandler({ query: { search } }, res) {
  try {
    const meals = await searchMeal(search);

    res.status(200).json(meals);
  } catch (err) {
    res.status(404).json({ message: 'Meal not found, bro' });
  }
}

async function searchMeal(keyword) {
  try {
    const spoonacularUrl = process.env.SPOONACULAR_URL;
    const spoonacularApiKey = process.env.SPOONACULAR_API_KEY;

    const data = await fetch(
      `${spoonacularUrl}/complexSearch?query=${keyword}&apiKey=${spoonacularApiKey}&number=24`
    );

    const meals = await data.json();

    if (meals) return meals.results;

    return false;
  } catch (err) {
    return false;
  }
}
