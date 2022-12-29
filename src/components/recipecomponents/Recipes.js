import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';
import RecipeCard from './RecipeCard';
import styled from 'styled-components';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { border } from '@mui/system';
import { hover } from '@testing-library/user-event/dist/hover';
import { colors } from '@mui/material';
import { autoBatchEnhancer } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import LikeButton from './LikeButton';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export function IconCheckboxes() {
  return (
    <div style={{float:"left", width:"80px"}}>
      <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
    </div>
  );
}

// const LikeButton = ({
//     className = "",
//     liked = false
// }) => {
//     const [isLiked, setIsLiked] = useState(liked);
//     return(
//             <div>
//               <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
//             </div>
          
//     );
// }

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [like, setLike] = useState(false);

    

    
    useEffect(() => {
        axios.get('/recipelist')
            .then((response) => {
                setRecipes(response.data)
            }) 
            ;
    }, []);

    

    // const RecipeCardsBlock = styled.div `
    //     display: flex;
    //     padding: 1rem;
    //     width: 768px;
    //     margin: 0 auto;
    //     @media screen and (max-width: 768px){
    //         width: 100%;
    //         overflow-x: auto;
    //     }
    // `;

    // const Category = 
        
    
    //     styled.div`
           

    //         &:hover {
    //             color: #495057;
    //         }

           
    //         }
    //     `;

    return (
        <>
         <div className="text-left mt-20">
            <div className="font-semibold text-4xl text-left ml-28 mr-10 mt-20 pt-20">
            전체 레시피
            </div>
        </div>
        <div className='py-10 pl-10' 
            style = {{
                
                width: "768px",
                display: "grid",
                gridTemplateRows: "1fr",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                
            }}
            >
                 {recipes.map(c => (
                    <Card key={c.rno}
                    style={{
                      width: '18rem',
                      fontSize: '1.125rem',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      margin: '1rem',
                    }}
                  >
                    <LikeButton></LikeButton>
                    <Link to = {`/recipes/${c.rno}`}>
                    <img
                      alt="Sample"
                      src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00277_2.png"
                    />
                    </Link>
                    
                    <CardBody>
                      <Link to = {`/reciperef/${c.rno}`}>
                      <CardTitle tag="h5">
                        {c.title}
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                      >
                        칼로리: {c.kcal}
                      </CardSubtitle>
                      <CardText>
                        작성자: {c.regId}
                      </CardText>
                      </Link>
                      {/* <Button
                        className='bg-white'>
                        <Link to = {`/recipes/${c.rno}`}>레시피 보기</Link>
                      </Button> */}
                      <div>

                        {/* <IconCheckboxes style={{float:"left"}}onClick={()=>{submit()}}/> */}
                        {/* <LikeButton className='inline items-end h-4'></LikeButton> */}
                        <span className='inline items-justify'>🟢 3.4</span>
                      </div>
                    </CardBody>
                  </Card>
                  
                ))}
            </div>
            {/* <RecipeCardsBlock>
                {recipes.map(c => (
                    <Category><Card key={c.rno}
                    style={{
                      width: '18rem'
                    }}
                  >
                    <img
                      alt="Sample"
                      src={c.thumbPath}
                    />
                    <CardBody>
                      <CardTitle tag="h5">
                        {c.title}
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                      >
                        {c.rkcal}
                      </CardSubtitle>
                      <CardText>
                        {c.regId}
                      </CardText>
                      <Button>
                        Button
                      </Button>
                    </CardBody>
                  </Card></Category>
                ))}
            </RecipeCardsBlock> */}
            {/* <h1>Recipes</h1>
            <RecipeList recipes={recipes}/>
            
            <RecipeCard
                recipes = {recipes}
                /> */}
        </>
    );
}

export default Recipes;