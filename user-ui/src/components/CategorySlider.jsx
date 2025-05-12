import Slider from 'react-slick';
import './CategorySlider.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CategorySlider = () => {
  const categories = useSelector((state) => state.categories.categories);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const handleCategoryClick = (category) => {
    navigate(`/listings?category=${category}`);
  };

  return (
    <div className="slider-container">
      <h1>Categories</h1>
      <div className="slider-wrapper">
        <Slider {...settings}>
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category.name)}
            >
              <img src={category.image} alt={category.name} />
              <p>{category.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategorySlider;
