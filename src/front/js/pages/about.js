import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/about.css";

const About = () => {
  return (
    <div id="whole-wheat whole-wheat-about" className="container text-center">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
      </style>
      <div id="rye">
        <h1 id="h1" className="justify-content-center">
          About
        </h1>
        <p id="bulk">
          Welcome to NourishNav, your go-to destination for simplifying the
          journey towards healthier eating habits. In a world where nutrition
          advice can be overwhelming, we're here to streamline the process,
          offering personalized guidance tailored to your unique needs and
          preferences.
        </p>
        <p>
          Our mission is simple: to empower you to make informed decisions about
          your diet, without the stress or confusion. Whether you're striving
          for weight management, seeking to optimize your athletic performance,
          managing dietary restrictions, or simply aiming for a healthier
          lifestyle, NourishNav has you covered.
          <h3 id="h3">Key Features: </h3>
          <h5 id="h5">Personalized Nutrition Plans:</h5>
          Our intuitive platform generates customized nutrition plans based on
          your goals and dietary requirements, making it easier than ever to
          stay on track.
          <h5 id="h5">Effortless Meal Planning:</h5>
          Say goodbye to mealtime dilemmas with our extensive database of
          nutritious recipes. Create weekly meal plans with ease, and let us
          handle the details.
          <h5 id="h5">Nutrient Tracking:</h5>
          Keep tabs on your nutritional intake effortlessly, with detailed
          insights into your daily macronutrient and micronutrient consumption.{" "}
          <h5 id="h5">Community Support:</h5> Connect with fellow health
          enthusiasts and nutrition experts through our vibrant community
          platform. Share recipes, tips, and success stories, and find the
          support you need to stay motivated.
          <h5 id="h5">Educational Resources: </h5>
          Expand your nutritional knowledge with our library of articles,
          guides, and infographics. From debunking dietary myths to exploring
          the latest trends in nutrition, we've got you covered.
          <p>
            At NourishNav, we believe that healthy eating should be simple,
            accessible, and enjoyable. With our user-friendly interface and
            practical guidance, achieving your wellness goals has never been
            easier. Join us on the journey to lifelong health and vitality. Sign
            up today and take the first step towards a healthier you.
          </p>
        </p>
      </div>
    </div>
  );
};
export default About;
