import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="whole-wheat">
      <div className="first">
        <div className="recipe">
          <h3>Recipe of The Day</h3>
          <p>Stinky Fish and Dirty Socks Souffle</p>
          <div className="buttons">
            <button>Recipes</button>
            <button>Favorites</button>
          </div>
        </div>
        <div className="image"></div>
      </div>
      <div className="second">
        <div className="option">
          <img />
          <h6>Vegetarian Options</h6>
          <button>Show More</button>
        </div>
        <div className="option">
          <img />
          <h6>Vegan Options</h6>
          <button>Show More</button>
        </div>
        <div className="option">
          <img />
          <h6>Dairy Free Options</h6>
          <button>Show More</button>
        </div>
      </div>
      <div className="third">
        <img />
        <p></p>
      </div>
    </div>
  );
};
