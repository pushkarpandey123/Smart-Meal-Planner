// src/pages/UserDashboard.jsx
import "./UserDashboard.css";
import backgroundImage from "../assets/userbg.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UserDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const quotes = [
    "Good food is the foundation of genuine happiness.",
    "Eat better, feel better.",
    "Your body deserves the best — fuel it wisely.",
    "Healthy eating is a form of self-respect.",
    "Small changes in meals lead to big changes in life.",
    "Nourish to flourish.",
  ];

  const [quote, setQuote] = useState("");

  // ====== MEAL PLAN STATE ======
  const [mealPlan, setMealPlan] = useState(() => {
    const saved = localStorage.getItem("mealPlan");
    if (!saved) return { breakfast: [], lunch: [], dinner: [] };

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

  // Auto-save to localStorage whenever mealPlan changes
  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);
  }, [mealPlan]);

  // Delete meal
  const removeMeal = (mealType, id) => {
    setMealPlan((prev) => ({
      ...prev,
      [mealType]: prev[mealType].filter(
        (meal) => meal.idMeal !== id && meal.id !== id
      ),
    }));
  };

  return (
    <div
      className="dashboard-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="dashboard container my-4">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <h1>Welcome {username}</h1>
          <p className="quote-text">{quote}</p>
        </div>

        {/* Modern Buttons */}
        <div className="action-buttons">
          <button
            className="modern-btn yellow"
            onClick={() => navigate("/meal-planner")}
          >
            🍴 Plan Today’s Meal
          </button>
        </div>

        {/* ================================
               TODAY'S MEAL PLAN (REPLICA)
        ================================= */}
        <div className="meal-plan" id="meal-plan">
          <h2>Your Meal Plan</h2>

          <div className="plan-section">
            {["breakfast", "lunch", "dinner"].map((mealType) => (
              <div className="meal-column" key={mealType}>
                <h3>
                  {mealType === "breakfast"
                    ? "🔍 Breakfast"
                    : mealType === "lunch"
                    ? "🥗 Lunch"
                    : "🍽 Dinner"}
                </h3>

                {mealPlan[mealType].length === 0 ? (
                  <p>No meals added.</p>
                ) : (
                  mealPlan[mealType].map((meal) => (
                    <div className="plan-card" key={meal.idMeal || meal.id}>
                      <img
                        src={meal.strMealThumb || meal.image}
                        alt={meal.strMeal || meal.name}
                        onError={(e) => (e.target.src = "/assets/default.jpg")}
                      />
                      <span>{meal.strMeal || meal.name}</span>

                      <button
                        onClick={() =>
                          removeMeal(mealType, meal.idMeal || meal.id)
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

        {/* ===== BUTTON MOVED OUTSIDE MEAL PLAN AREA ===== */}
        <div className="download-section-outside">
          <button onClick={() => alert("PDF download coming soon!")}>
            📥 Download Meal Plan as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
