import React from "react";
import Recipes from "./recipecomponents/Recipes";
const MainNewst =() => {
    return(
        <>
           <div className="text-left mt-20">
                <span className="inline font-semibold text-4xl text-left ml-28 mr-10 mt-6">
                    최신 레시피
                </span>
                <button className="inline justify-items-start border rounded-lg bg-secondary text-white">{">더 보기"}</button>
           </div>
           <div className="border rounded-md mx-20 mt-10 justify-items-start">
                <Recipes/>
           </div>
        </>
    )
};

export default MainNewst;