import React from "react";
import MainNewstRecipes from "./recipecomponents/MainNewstRecipe";
import { Link } from 'react-router-dom';
import Recipes from "./recipecomponents/Recipes";
import RecipePage from "./recipecomponents/PopRecipe";
const MainNewst =() => {
    return(
        <>
           <div className="text-left">
                <span className="inline font-semibold text-4xl text-left ml-36 mr-10 mt-6">
                    최신 레시피
                </span>
                <Link to={'/recipelist'}><button className="inline justify-items-start  rounded-lg text-black">{"더 보기>"}</button></Link>
           </div>
           <div className="mx-20 mt-10 justify-items-start">
                <MainNewstRecipes className=''/>
           </div>
        </>
    )
};

export default MainNewst;