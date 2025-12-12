// src/pages/PublicHomepage.jsx
import "./Home.css";
import CarouselSection from "../components/CarouselSection";
import ImageTextBlock from "../components/ImageTextBlock";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";

// Import images for ImageTextBlock
import homepage1 from "../assets/homepage1.jpg";
import homepage2 from "../assets/homepage2.jpg";
import homepage3 from "../assets/homepage3.jpg";
import homepage4 from "../assets/homepage4.jpg";

// Import testimonial images
import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";

function PublicHomepage() {
  return (
    <div className="home-page">
      {/* Carousel Section */}
      <CarouselSection />

      {/* 1st ImageTextBlock */}
      <ImageTextBlock
        title="Plan Meals Effortlessly"
        text="Our smart planner helps you organize meals for the week with ease. Customize based on your preferences and dietary goals."
        image={homepage1}
        reverse={false}
      />
      {/* 1st Testimonial */}
      <TestimonialsSection
        title="Kids Are Eating Better"
        text="I have grown so much as a cook and my kids now have such an adventurous palate thanks to this app. I can't express how great it has been."
        author="Matt W."
        info="Member since 2013"
        img={user1}
      />

      {/* 2nd ImageTextBlock */}
      <ImageTextBlock
        title="Get Personalized Recipes"
        text="Discover recipes that match your taste and lifestyle. Adjust ingredients and servings effortlessly."
        image={homepage2}
        reverse={true}
      />
      {/* 3rd Testimonial */}
      <TestimonialsSection
        title="Healthy Eating Made Simple"
        text="This platform helped me stay consistent with balanced meals — and even my friends started asking for recipes!"
        author="Daniel R."
        info="Member since 2018"
        img={user3}
      />

      {/* 4th ImageTextBlock */}
      <ImageTextBlock
        title="Track Nutrition Goals"
        text="Stay on top of your nutrition with built-in calorie and nutrient tracking tailored to your daily needs."
        image={homepage4}
        reverse={true}
      />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer Section */}
      <footer
        style={{
          backgroundColor: "#002244",
          color: "white",
          padding: "40px 0 20px",
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <div
          className="footer-container"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <div
            className="footer-col"
            style={{ flex: "1 1 250px", margin: "20px" }}
          >
            <h5 style={{ color: "#FFD700", marginBottom: "10px" }}>About</h5>
            <p style={{ color: "#ddd", lineHeight: "1.6" }}>
              Smart Meal Tracker helps you plan, track, and enjoy healthy meals
              daily.
            </p>
          </div>

          <div
            className="footer-col"
            style={{ flex: "1 1 250px", margin: "20px" }}
          >
            <h5 style={{ color: "#FFD700", marginBottom: "10px" }}>Contact</h5>
            <p style={{ color: "#ddd", margin: "4px 0" }}>
              Email: piyushpandey@gmail.com
            </p>
            <p style={{ color: "#ddd", margin: "4px 0" }}>
              Phone: +91 9835917125
            </p>
          </div>

          <div
            className="footer-col"
            style={{ flex: "1 1 250px", margin: "20px" }}
          >
            <h5 style={{ color: "#FFD700", marginBottom: "10px" }}>
              Follow Us
            </h5>
            <p style={{ color: "#ddd", margin: "4px 0" }}>
              Facebook | Twitter | Instagram
            </p>
          </div>
        </div>

        <p
          style={{
            marginTop: "30px",
            fontSize: "0.9rem",
            color: "#aaa",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: "15px",
          }}
        >
          © 2025 Smart Meal Tracker | Designed by PUSHKAR PANDEY for Healthy
          Living
        </p>
      </footer>
    </div>
  );
}

export default PublicHomepage;
