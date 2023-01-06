import React from "react";
import { RECIPES } from "../data/data";
import { Helmet } from "react-helmet";
import SectionHero2 from "./SectionHero2";
import RecipeCard from "./recipecomponents/RecipeCard";
import MainNewst from "./MainNewst";
import MainHottest from "./MainHottest";
import MainBestChef from "./MainBestChef";
import HottestRecipes from "./recipecomponents/MainHottestRecipes";
import MainNewstRecipes from "./recipecomponents/MainNewstRecipes";
function PageHome() {
    return(
        <div className="nc-PageHome relative overflow-hidden">
            <SectionHero2/>
            {/* <hr className="my-20"/> */}
            <MainNewstRecipes/>
            <HottestRecipes/>
            {/* <MainBestChef/> */}
            <hr/>
        </div>
    )
}

export default PageHome;