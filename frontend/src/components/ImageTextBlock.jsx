// src/components/ImageTextBlock.jsx
import React from "react";
import "./ImageTextBlock.css";

const ImageTextBlock = ({ title, text, image, reverse }) => {
  return (
    <div className={`image-text-block ${reverse ? "reverse" : ""}`}>
      <div className="text-content">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="image-content">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default ImageTextBlock;
