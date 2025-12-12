import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./MealPlanner.css";

function MealPlanner() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ---------------------------
  // SAFE & FIXED LOCAL STORAGE
  // ---------------------------
  const [mealPlan, setMealPlan] = useState(() => {
    const saved = localStorage.getItem("mealPlan");

    if (!saved) {
      return { breakfast: [], lunch: [], dinner: [] };
    }

    try {
      const parsed = JSON.parse(saved);
      return {
        breakfast: Array.isArray(parsed.breakfast) ? parsed.breakfast : [],
        lunch: Array.isArray(parsed.lunch) ? parsed.lunch : [],
        dinner: Array.isArray(parsed.dinner) ? parsed.dinner : [],
      };
    } catch (err) {
      return { breakfast: [], lunch: [], dinner: [] };
    }
  });

  // AUTO-SAVE mealPlan safely
  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  // ---------------------------
  // SEARCH RECIPES
  // ---------------------------
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setRecipes(res.data.meals || []);
    } catch (err) {
      console.error(err);
      alert("API Error: Something went wrong");
    }
  };

  // ---------------------------
  // FETCH FULL DETAILS
  // ---------------------------
  const fetchRecipeDetails = async (id) => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = res.data.meals[0];

      let steps = data.strInstructions
        ? data.strInstructions
            .split(/\.\s+/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
        : [];

      setSelectedRecipe({ ...data, formattedSteps: steps });
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------------------
  // ADD TO MEAL PLAN
  // ---------------------------
  const addToMealPlan = (mealType) => {
    if (!selectedRecipe) return;

    setMealPlan((prev) => ({
      ...prev,
      [mealType]: [...prev[mealType], selectedRecipe],
    }));

    setShowModal(false);
  };

  // ---------------------------
  // DOWNLOAD PDF
  // ---------------------------
  const downloadPDF = () => {
    const input = document.getElementById("meal-plan");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("meal-plan.pdf");
    });
  };

  return (
    <div className="meal-container">
      <div className="meal-hero">
        <h1>Smart Meal Planner</h1>
        <p>
          Search meals, add them to your plan, and export as PDF seamlessly.
        </p>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search meals eg. Chicken, Rice..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* RECIPE GRID */}
      <div className="recipe-grid">
        {recipes.map((recipe) => {
          const carbs = Math.floor(Math.random() * 50) + 10;
          const protein = Math.floor(Math.random() * 40) + 5;
          const fats = Math.floor(Math.random() * 20) + 2;

          return (
            <div key={recipe.idMeal} className="recipe-card visible">
              <div className="recipe-img">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              </div>

              <h3>{recipe.strMeal}</h3>

              {/* UPDATED WITH ICONS */}
              <div className="nutrients">
                <span>
                  <img
                    src="https://img.icons8.com/ios-filled/50/000000/bread.png"
                    alt=""
                  />
                  Carbs: {carbs}g
                </span>

                <span>
                  <img
                    src="https://img.icons8.com/ios-filled/50/000000/steak.png"
                    alt=""
                  />
                  Protein: {protein}g
                </span>

                <span>
                  <img
                    src="https://img.icons8.com/ios-filled/50/000000/butter.png"
                    alt=""
                  />
                  Fats: {fats}g
                </span>
              </div>

              <button
                className="view-btn"
                onClick={() => fetchRecipeDetails(recipe.idMeal)}
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {showModal && selectedRecipe && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✖
            </button>

            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              className="modal-img"
            />

            <h2>{selectedRecipe.strMeal}</h2>

            <h4>Ingredients:</h4>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .map((n) => {
                  const ingredient = selectedRecipe[`strIngredient${n}`];
                  const measure = selectedRecipe[`strMeasure${n}`];
                  if (ingredient && ingredient.trim() !== "") {
                    return `${ingredient} - ${measure}`;
                  }
                  return null;
                })
                .filter(Boolean)
                .map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
            </ul>

            <h4>Instructions:</h4>
            {selectedRecipe.formattedSteps.length > 0 ? (
              <ol>
                {selectedRecipe.formattedSteps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            ) : (
              <p>No instructions available.</p>
            )}

            <div className="add-meal-buttons">
              <button onClick={() => addToMealPlan("breakfast")}>
                Add to Breakfast
              </button>
              <button onClick={() => addToMealPlan("lunch")}>
                Add to Lunch
              </button>
              <button onClick={() => addToMealPlan("dinner")}>
                Add to Dinner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEAL PLAN */}
      <div className="meal-plan" id="meal-plan">
        <h2>Your Meal Plan</h2>

        <div className="plan-section">
          {["breakfast", "lunch", "dinner"].map((mealType) => (
            <div className="meal-column" key={mealType}>
              <h3>
                {mealType === "breakfast"
                  ? "Breakfast"
                  : mealType === "lunch"
                  ? "Lunch"
                  : "Dinner"}
              </h3>

              {mealPlan[mealType].length === 0 ? (
                <p>No meals added.</p>
              ) : (
                mealPlan[mealType].map((r) => (
                  <div className="plan-card" key={r.idMeal}>
                    <img src={r.strMealThumb} alt={r.strMeal} />
                    <span>{r.strMeal}</span>

                    <button
                      onClick={() =>
                        setMealPlan((prev) => ({
                          ...prev,
                          [mealType]: prev[mealType].filter(
                            (item) => item.idMeal !== r.idMeal
                          ),
                        }))
                      }
                    >
                      ❌
                    </button>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="download-section">
        <button onClick={downloadPDF}>Download Meal Plan as PDF</button>
      </div>
    </div>
  );
}

export default MealPlanner;
