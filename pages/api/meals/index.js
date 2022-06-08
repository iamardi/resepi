export default async function handler(req, res) {
  try {
    const data = await fetchQuickMeals();

    res.status(200).json(data);

    // TEMPORARY USING LOCAL DATA
    // const results = [];
    // const recipes = quickMeals.recipes;

    // for (let i = 0; i < recipes.length; i++) {
    //   if (!recipes[i].image) {
    //     console.log('masuk loop', recipes[i].title)
    //     const photo = await fetchUnsplashPhoto(recipes[i].title);
    //     console.log(photo);

    //     recipes[i].image = photo;
    //   }
    //   results.push(recipes[i]);
    // }

    // res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error, bro' });
  }
}

async function fetchQuickMeals() {
  try {
    const spoonacularUrl = process.env.SPOONACULAR_URL;
    const spoonacularApiKey = process.env.SPOONACULAR_API_KEY;

    const data = await fetch(
      `${spoonacularUrl}/random?number=12&apiKey=${spoonacularApiKey}`
    );
    const meals = await data.json();

    const recipes = meals.recipes;
    const results = [];

    for (let i = 0; i < recipes.length; i++) {
      if (!recipes[i].image) {
        const photo = await fetchUnsplashPhoto(i.title);

        recipes[i].image = photo;
      }
      results.push(recipes[i]);
    }

    return results;
  } catch (err) {
    return false;
  }
}

async function fetchUnsplashPhoto(keyword) {
  try {
    const unsplashURL = process.env.UNSPLASH_URL;
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

    const data = await fetch(
      `${unsplashURL}?client_id=${unsplashAccessKey}&query=${keyword}&page=1&per_page=1`
    );
    const image = await data.json();

    if (image.results[0].urls.regular) {
      return image.results[0].urls.regular;
    }
    return null;
  } catch (err) {
    return null;
  }
}
