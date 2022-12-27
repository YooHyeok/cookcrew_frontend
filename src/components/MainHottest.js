import React from "react";
import Recipes from "./recipecomponents/Recipes";
const MainHottest =() => {
    return(
        <>
           <div className="text-left mt-20 mb-10">
                <span className="inline font-semibold text-4xl text-left ml-28 mr-10 mt-6">
                    인기 레시피
                </span>
                <button className="inline justify-items-start">{">더 보기"}</button>
           </div>
           <div className="border rounded-md mx-20 mt-10 justify-items-start">
                <Recipes/>
           </div>
        </>
    )
};

export default MainHottest;