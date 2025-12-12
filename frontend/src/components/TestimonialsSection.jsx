// src/components/TestimonialsSection.jsx
import { motion } from "framer-motion";

// NOTE: Make sure this line is in your public/index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">

const TestimonialsSection = ({ title, text, author, info, img }) => {
  return (
    <section
      style={{
        backgroundColor: "#fff",
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2, // smoother and slower
          ease: "easeOut",
        }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.4 },
        }}
        style={{
          maxWidth: "800px",
          margin: "0 auto 80px auto",
          background: "linear-gradient(145deg, #ffffff, #fff8f3)",
          borderRadius: "16px",
          padding: "50px 30px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Stylish Heading */}
        <h2
          style={{
            color: "#f57c00", // orange accent
            fontSize: "2.2rem",
            fontWeight: "700",
            marginBottom: "25px",
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.8px",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.15)",
          }}
        >
          {title}
        </h2>

        {/* Testimonial text */}
        <p
          style={{
            fontStyle: "italic",
            color: "#444",
            fontSize: "1.2rem",
            lineHeight: "1.8",
            marginBottom: "40px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          “{text}”
        </p>

        {/* Author Infor */}
        <div>
          <img
            src={img}
            alt={author}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "15px",
              border: "3px solid #f57c00",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          />
          <h5
            style={{
              margin: "0",
              fontWeight: "bold",
              color: "#222",
              letterSpacing: "1px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {author.toUpperCase()}
          </h5>
          <p
            style={{
              margin: "5px 0 0",
              color: "#777",
              fontSize: "0.95rem",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {info}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
