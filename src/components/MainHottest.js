import React from "react";
import { Link } from "react-router-dom";
import PopRecipes from "./recipecomponents/Recipes";
import HottestRecipes from "./recipecomponents/MainHottestRecipes";

const MainHottest =() => {
    return(
        <>
           <div className="text-left mt-20">
                <span className="inline text-4xl text-left ml-56 mr-10 mt-16    ">
                    인기 레시피
                </span>
                <Link to={'popRecipe'}><button className="inline justify-items-start  rounded-lg text-black">{"더 보기>"}</button></Link>
           </div>
           <div className="mx-20 mt-10 justify-items-start">
                <HottestRecipes/>
           </div>
        </>
    )
};

export default MainHottest;