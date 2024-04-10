import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const About = () => {
  return (
    <div className="container text-center">
      <h1 className="justify-content-center">About</h1>
      Welcome to NourishNav, your go-to destination for simplifying the journey
      towards healthier eating habits. In a world where nutrition advice can be
      overwhelming, we're here to streamline the process, offering personalized
      guidance tailored to your unique needs and preferences. Our mission is
      simple: to empower you to make informed decisions about your diet, without
      the stress or confusion. Whether you're striving for weight management,
      seeking to optimize your athletic performance, managing dietary
      restrictions, or simply aiming for a healthier lifestyle, NourishNav has
      you covered. Key Features: Personalized Nutrition Plans: Our intuitive
      platform generates customized nutrition plans based on your goals and
      dietary requirements, making it easier than ever to stay on track.
      Effortless Meal Planning: Say goodbye to mealtime dilemmas with our
      extensive database of nutritious recipes. Create weekly meal plans with
      ease, and let us handle the details. Smart Shopping Lists: Simplify your
      grocery shopping experience with our smart shopping list feature. No more
      guesswork – just grab your list and go. Nutrient Tracking: Keep tabs on
      your nutritional intake effortlessly, with detailed insights into your
      daily macronutrient and micronutrient consumption. Community Support:
      Connect with fellow health enthusiasts and nutrition experts through our
      vibrant community platform. Share recipes, tips, and success stories, and
      find the support you need to stay motivated. Educational Resources: Expand
      your nutritional knowledge with our library of articles, guides, and
      infographics. From debunking dietary myths to exploring the latest trends
      in nutrition, we've got you covered. At NourishNav, we believe that
      healthy eating should be simple, accessible, and enjoyable. With our
      user-friendly interface and practical guidance, achieving your wellness
      goals has never been easier. Join us on the journey to lifelong health and
      vitality. Sign up today and take the first step towards a healthier you.
    </div>
  );
};
export default About;
