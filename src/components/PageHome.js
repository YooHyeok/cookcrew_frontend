import React from "react";
import { RECIPES } from "../data/data";
import { Helmet } from "react-helmet";
import SectionHero2 from "./SectionHero2";
import RecipeCard from "./recipecomponents/RecipeCard";
import MainNewst from "./MainNewst";
import MainHottest from "./MainHottest";
import MainBestChef from "./MainBestChef";

function PageHome() {
    return(
        <div className="nc-PageHome relative overflow-hidden">
            <Helmet>
                <title>cookcrew</title>
            </Helmet>

            <SectionHero2/>
            <hr className="my-20"/>
            <MainNewst/>
            <MainHottest/>
            <MainBestChef/>
            <hr/>
        </div>
    )
}

export default PageHome;