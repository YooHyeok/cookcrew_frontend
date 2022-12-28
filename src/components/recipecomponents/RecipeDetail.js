import React, {useState, useEffect, createContext} from "react";
import axios from "axios";

const LikeContext = createContext({
    state: { isLiked: 'false'},
    actions: {
        setIsLiked: () => {}
    }
})

const LikeProvider = ({ children}) => {
    const [isLiked, setIsLiked] = useState('false');
    const value = {
        state: {isLiked},
        actions: { setIsLiked}
    };
    return(
        <LikeContext.Provider value={value}>{children}</LikeContext.Provider>
    )
}




const RecipeDetail = props => {
    const [recipes, setRecipes] = useState([]);

    
    return(
        <>{props.rno}</>
    );
}
const { Consumer: LikeConsumer} = LikeContext;
export { LikeProvider, LikeConsumer}
export default RecipeDetail;