import React from "react";
import { RECIPES } from "../data/data";
import { Helmet } from "react-helmet";
import SectionHero2 from "./SectionHero2";
import RecipeCard from "./recipecomponents/RecipeCard";

function PageHome() {
    return(
        <div className="nc-PageHome relative overflow-hidden">
            <Helmet>
                <title>cookcrew</title>
            </Helmet>

            <SectionHero2 />
            
        </div>
    )
}

export default PageHome;