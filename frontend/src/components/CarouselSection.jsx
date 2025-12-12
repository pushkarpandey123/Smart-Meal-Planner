import { Carousel } from "react-bootstrap";
import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";

function CarouselSection() {
  const slides = [
    {
      img: img1,
      title: "Plan Your Meals Smartly",
      desc: "Reduce waste and eat healthy with Smart Meal Tracker.",
    },
    {
      img: img2,
      title: "Track Nutrition Easily",
      desc: "Get insights into calories and nutrition instantly.",
    },
    {
      img: img3,
      title: "Stay Fit and Energized",
      desc: "Smart planning leads to a healthier lifestyle.",
    },
  ];

  return (
    <section className="hero-carousel">
      <Carousel interval={3000} pause={false}>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img
              className="carousel-img"
              src={slide.img}
              alt={`Slide ${index + 1}`}
            />
            <Carousel.Caption className="hero-caption">
              <h3>{slide.title}</h3>
              <p>{slide.desc}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}

export default CarouselSection;
