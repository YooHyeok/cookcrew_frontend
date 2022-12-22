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

    

    const submit = () => {
        const formData = new FormData();
        formData.append('likerId', 'testId3');
        formData.append('likedRno', 6);

        axios.post('http://localhost:8080/addlike', formData)
            .then((response) => {
                alert (response.data);
                
            })
        const formData1 = new FormData();
        formData.append('likerId', 'testId5');  
        formData.append('likedRno', 2);

        axios.post('http://localhost:8080/addlike', formData1)
            .then((response) => {
                alert (response.data);
                
            })

    }
    useEffect(() => {
        axios.get('http://localhost:8080/recipelist')
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
        <div
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
                      margin: '0 auto',
                    }}
                  >
                    <Link to = {`/recipes/${c.rno}`}>
                    <img
                      alt="Sample"
                      src={c.thumbPath}
                    />
                    </Link>
                    
                    <CardBody
                        style = {{
                            border: "solid 1px"
                        }}>
                      <Link to = {`/recipes/${c.rno}`}>
                      <CardTitle tag="h5">
                        {c.title}
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                      >
                        칼로리: {c.rkcal}
                      </CardSubtitle>
                      <CardText>
                        작성자: {c.regId}
                      </CardText>
                      </Link>
                      <Button>
                        <Link to = {`/recipes/${c.rno}`}>레시피 보기</Link>
                      </Button>
                      <div style={{height:"80px"}}>

                        {/* <IconCheckboxes style={{float:"left"}}onClick={()=>{submit()}}/> */}
                        <Button onClick={()=>{submit()}}>버튼</Button>
                        <span style={{float:"right"}}>별점: 5점</span>
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