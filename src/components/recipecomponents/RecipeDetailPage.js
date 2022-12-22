import { useParams } from "react-router";
import {State, useState} from 'react';
import RecipeDetail from "./RecipeDetail";
import { LikeConsumer } from "./RecipeDetail";

export const LikeBox = () => {
    return(
        <LikeConsumer>
            {value => (
                <>
                    <div>{console.log(value.state.isLiked)}</div>
                </>
            )}
        </LikeConsumer>
    )
}

const RecipeDetailPage = () => {
    const {rno} = useParams();
    
    return (
        <div>
            <>게시글 <RecipeDetail rno={rno}/></>
        </div>
    )
}

export default RecipeDetailPage;

