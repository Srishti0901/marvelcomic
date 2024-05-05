import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";
import "./Home.css";
import CarousalCard from "../CarousalCard/CarousalCard";
import Pagination from "../Pagination/Pagination";

function Home({searchInput, setSearchInput}) {
  const [comicData, setComicData] = useState([]);
  const [comicDataToShow, setComicDataToShow] = useState([]);
  const [characterData, setCharacterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedCharater, setSelectedCharacter] = useState([]);
  const [selectedCharaterlen, setSelectedCharacterLen] = useState(0);
  const apikey = process.env.REACT_APP_API_KEY;
  const hash = process.env.REACT_APP_HASH;


  const fetchComicsData = () => {
    axios
      .get(
        `https://gateway.marvel.com/v1/public/comics?ts=1714760578432&apikey=${apikey}&hash=${hash}&offset=${
          currentPage * 20
        }`
      )
      .then((res) => {
        setTotal(res.data.data.total);
        setComicData(res.data.data.results);
        setComicDataToShow(res.data.data.results)
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchCharctersData = () => {
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters?ts=1714760578432&apikey=${apikey}&hash=${hash}`
      )
      .then((res) => {
        setCharacterData(res.data.data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const filterComicsByCharectedId = (id) => {
    axios
      .get(
        `http://gateway.marvel.com/v1/public/characters/${id}/comics?ts=1714760578432&apikey=${apikey}&hash=${hash}`
      )
      .then((res) => {
        setSelectedCharacterLen((prev) => prev+1);
        if(selectedCharater.length > 1){
            let arr = comicDataToShow;
            res.data.data.results.forEach(element => {
                arr.push(element);
            });
        setComicDataToShow(arr)
        }
        else{
            setComicDataToShow(res.data.data.results);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    if(searchInput !== ""){
        const filteredData = comicData.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()));
        setComicDataToShow(filteredData);
    }
    else{
        setComicDataToShow(comicData);
    }
  },[searchInput, comicData])

  useEffect(() => {
    fetchComicsData();
    fetchCharctersData();
  }, []);

  useEffect(() => {
    if(selectedCharater.length === 0){
        fetchComicsData();
        fetchCharctersData();
    }
  }, [selectedCharater]);

  useEffect(() => {
    fetchComicsData();
  }, [currentPage]);

  useEffect(() => {
    if(selectedCharater.length > 0 && selectedCharaterlen === selectedCharater.length - 1){
        var len = selectedCharater.length;
        var lastCharacterAdded = selectedCharater[len-1];
        filterComicsByCharectedId(lastCharacterAdded.id)
    }
  },[selectedCharater, comicDataToShow]);

  const clearFilter = () => {
    setSelectedCharacter([]);
    setSelectedCharacterLen(0);
  }

  return (
    <div className="mainContainer">
      <Row className="firstRow">
        <CarousalCard cardDetail={characterData} selectedCharater={selectedCharater} setSelectedCharacter={setSelectedCharacter}
        setSelectedCharacterLen={setSelectedCharacterLen}/>
      </Row>
      <Row className="secondRow">
        <>
        {selectedCharater && selectedCharater.length > 0 ? (<div className="explore-div">   
            <div className="explore-heading">
              Explore -{" "}
              {selectedCharater && selectedCharater.length > 0 &&
                selectedCharater.map((item, index) => (
                  <span key={index}>
                    {item.name}
                    {index < selectedCharater.length - 1 && ", "}
                  </span>
                ))}
            </div>
            <button className="filterButton" 
            onClick={() => clearFilter()}>Clear all filters</button>
          </div>) : searchInput !== "" ? <div className="explore-div">Search Results</div> : ""}
          
          {comicDataToShow.length > 0 ? comicDataToShow.map((item) => (
            <>
              {item.images && item.images.length > 0 && (
                <div key={item.id} className="card-design">
                  <>
                    <img
                      src={item.images[0].path + "." + item.images[0].extension}
                      alt={item.title}
                      style={{ height: "220px", width: "220px" }}
                    />
                    <div className="card-title">{item.title}</div>
                  </>
                </div>
              )}
            </>
          )) : searchInput !== "" ? <div className="nodatafound">No Data found on this page</div> : <div className="nodatafound">No Data Found</div>}
        </>
      </Row>
      <Row>
        <Pagination
          total={total}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Row>
    </div>
  );
}

export default Home;
