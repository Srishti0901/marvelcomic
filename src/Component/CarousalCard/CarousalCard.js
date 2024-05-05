import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import CircularCard from "./CircularCard";

const CarousalCard = ({ cardDetail, selectedCharater, setSelectedCharacter, setSelectedCharacterLen }) => {

  if (!cardDetail || !Array.isArray(cardDetail) || cardDetail.length === 0) {
    return null; 
  }

  const imagePath =
    "https://insomniac.games/wp-content/uploads/2018/09/Spider-Man_PS4_E3_2017_Hero.jpg";

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "20%",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20%",
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "15%",
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {cardDetail.map((item) => (
          <CircularCard 
          item={item}
          selectedCharater={selectedCharater}
          setSelectedCharacter={setSelectedCharacter}
          setSelectedCharacterLen={setSelectedCharacterLen}
          />
        ))}
      </Slider>
    </div>
  );
};

export default CarousalCard;
