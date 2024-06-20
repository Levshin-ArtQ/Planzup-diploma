import React from "react";
import "./Page.css";
import Search from "./Search";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { Modal } from "antd";
import CardsCarousel from "./CardsCarousel";
import useApi from "../hooks/useApi";

const Page = () => {
  const [openHisotry, setOpenHistory] = useState(false);
  const [filters, setFilters] = useState(() => new Map()); 
  const [contents, setContent] = useState([
    {
      image: "barber_interview.jpg",
      title: "Про мастера",
    },
    {
      image: "master_interview1.jpg",
      title: "Марина",
    },
    {
      image: "colorful_hairstyle2.jpg",
      title: "Ксения М.",
      
    },
  ]);
  const {data, error, loading, fetchData, contextHolder } = useApi();

  const handleFilters = (newFilters) => {
    setFilters(prevFilters => new Map([...prevFilters, Object.entries(newFilters)]));
    fetchData('api/services', {
      params: {
        ...filters
      }
    })
  };
  const handleStory = () => {
    console.log("story");
    setOpenHistory(!openHisotry);
  };
  return (
    <div>
      PlanzUp
      <Search handleFilters={handleFilters} />
      <Modal open={openHisotry} onOk={handleStory} onCancel={handleStory}>
        <h3>История мастеров</h3>
        <iframe src="https://www.youtube.com/embed/Inc_m5aA6ik?si=c05pHQQ3ETt-fZc_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </Modal>
      <CardsCarousel items={{contents}} regime={"story"} />
      <CardsCarousel items={{data}} regime="cards" />
    </div>
  );
};

Page.propTypes = {};

export default Page;
