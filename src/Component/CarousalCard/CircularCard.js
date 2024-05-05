import React, { useEffect, useState } from "react";
import "./CarousalCard.css"
import bluetick from "../../assets/icons8-tick.svg"

function CircularCard({ item, selectedCharater, setSelectedCharacter, setSelectedCharacterLen }) {

 const [selectedImage, setSelectedImage] = useState(false); 

    useEffect(() => {
        if(selectedCharater.length > 0){
            const findCharacter = selectedCharater.find((key) => key === item);
            if(findCharacter){
                setSelectedImage(true);
            }
        }
        else{
            setSelectedImage(false);
        }
    }, [selectedCharater])


  const handleClick = (item) => {
    setSelectedCharacter([...selectedCharater, item]);
  };

  return (
    <div key={item.id} className="selectedImageContainer">
    {selectedImage && <img src={bluetick} alt="" className="bluektick" />}
    <img
      src={item.thumbnail.path + "." + item.thumbnail.extension}
      alt=""
      style={{
        height: "120px",
        width: "120px",
        borderRadius: "50%",
        margin: "8px",
      }}
      className={selectedImage ? "selectedImage" : "nonSelectedImage"}
      onClick={() => handleClick(item)}
    />
  </div>
  );
}

export default CircularCard;
