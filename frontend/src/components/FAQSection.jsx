// src/components/FAQSection.jsx
import React, { useState } from "react";
import "./FAQSection.css";

const faqData = [
  {
    question: "How do I create my weekly meal plan?",
    answer:
      "Simply log in to your account, select the “Plan Meals” section, and choose the meals for each day. You can customize breakfast, lunch, dinner, and snacks based on your dietary preferences and calorie goals. The app will automatically generate a grocery list for you.",
  },
  {
    question: "Can I track my nutrition and calories?",
    answer:
      "Yes! The app tracks the calories, macronutrients, and other nutrition information for each meal you log. You can view daily, weekly, or monthly reports to monitor your progress and adjust your meals accordingly.",
  },
  {
    question: "Can I get personalized recipes?",
    answer:
      "Absolutely! Based on your dietary preferences, allergies, and taste preferences, the app will suggest recipes tailored to your needs. You can also filter recipes by prep time, cuisine, or ingredients.",
  },
  {
    question: "How do I save my favorite recipes?",
    answer:
      "When you find a recipe you love, simply click the “Save to Favorites” button. You can access all your saved recipes anytime from your profile, making meal planning quicker and easier.",
  },
  {
    question: "Does the app generate grocery lists automatically?",
    answer:
      "Yes, it does. Once your meal plan is finalized, the app automatically creates a complete grocery list with quantities. You can even check off items while shopping and make adjustments if needed.",
  },
  {
    question: "Can I track multiple diets or goals?",
    answer:
      "You can set multiple nutrition goals, such as weight loss, muscle gain, or balanced eating. The app will adjust your meal suggestions and tracking metrics to help you achieve each goal effectively.",
  },
  {
    question: "Can I share my meal plan with family or friends?",
    answer:
      "Yes! You can export your weekly plan as a PDF or share it via email. This way, family members or friends can follow the same meal plan or use it as inspiration for their own planning.",
  },
  {
    question:
      "Does the app support dietary restrictions like vegan or gluten-free?",
    answer:
      "Absolutely. While setting up your profile, you can specify dietary restrictions or preferences. The meal suggestions and recipes will automatically exclude incompatible ingredients and offer suitable alternatives.",
  },
  {
    question: "How do I edit or remove meals from my plan?",
    answer:
      "In the “Plan Meals” section, click on the meal you want to edit or remove. You can swap it with a new recipe, change serving sizes, or delete it entirely. The grocery list will update automatically.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        {/* Left Side Heading */}
        <div className="faq-left">
          <h2>Have Questions?</h2>
        </div>

        {/* Right Side Questions */}
        <div className="faq-right">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleAnswer(index)}
            >
              <div className="faq-question">
                {item.question}
                <span className="faq-icon">
                  {activeIndex === index ? "−" : "^"}
                </span>
              </div>
              <div className="faq-answer">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
