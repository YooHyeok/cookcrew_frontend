import React from "react";
import MainNewstRecipes from "./recipecomponents/MainNewstRecipes";
import { Link } from 'react-router-dom';
import Recipes from "./recipecomponents/Recipes";
import RecipePage from "./recipecomponents/PopRecipe";
const MainNewst =() => {
    return(
        <>
           <div className="mt-16">
                <span className="inline text-4xl text-left w-9/12 ml-56 mr-10 mt-16">
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