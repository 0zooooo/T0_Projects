const searchMeal = async (e) => {
  e.preventDefault();

  // Select Elements
  const input = document.querySelector('.input');
  const title = document.querySelector('.title');
  const info = document.querySelector('.info');
  const img = document.querySelector('.img');
  const ingredientsOutput = document.querySelector('.ingredients');

  const showMealInfo = (meal) => {
    const { strMeal, strMealThumb, strInstructions } = meal;

    title.textContent = strMeal;
    img.style.backgroundImage = `url(${strMealThumb})`;
    info.textContent = strInstructions;

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} - ${measure || ""}`.trim());
      } else {
        break;
      }
    }

    const html = `
      <ul class="ingredients-list">
        ${ingredients.map((ing) => `<li class="ing">${ing}</li>`).join("")}
      </ul>
    `;

    ingredientsOutput.innerHTML = html;
  };

  const showAlert = () => {
    alert('Meal not found :(');
  };

  const fetchMealData = async (val) => {
    try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
    );
      if (!res.ok) {
        throw new Error("※Network error");
      }

    const data = await res.json();
    return data.meals;
    } catch (err) {
      console.error("⚠ Fetch Error:", err.message);
      return null; 
    }
  };

  // Get the user value
  const val = input.value.trim();

  if (val) {
    const meals = await fetchMealData(val);

    if (!meals) {
      showAlert("※No recipe found");
      return;
    }

    meals.forEach(showMealInfo);
  } else {
    alert('Please try searching for meal :)');
  }
};

const form = document.querySelector('form');
form.addEventListener('submit', searchMeal);

const magnifier = document.querySelector('.magnifier');
magnifier.addEventListener('click', searchMeal);
