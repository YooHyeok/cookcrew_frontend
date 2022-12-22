import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import SectionHero2 from '../SectionHero2';
import RecipeCard from './RecipeCard';
import Recipes from './Recipes';
import MyCard from './MyCard';
const RecipeList = ()=> {
    return (
        <>
        
            <SectionHero2/>
            <div>
                <Container>
                <Recipes/>
                <MyCard/>
                </Container>
            </div>
            {/* {recipes.map(recipe => {
                return (<div key={recipe.rno}>
                    {recipe.rno}
                    {recipe.regId}
                    {recipe.title}
                    {recipe.content}
                    
                </div>)
            })} */}
        
        </>
    );
};

export default RecipeList;