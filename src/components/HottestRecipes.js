import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import LikeButton from './recipecomponents/LikeButton';

const HottestRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [like, setLike] = useState(false);

    

    
    useEffect(() => {
        axios.get('/recipelist')
            .then((response) => {
                setRecipes(response.data)
            }) 
            ;
    }, []);

    return (
        <>
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
                      <Button
                        className='bg-white'>
                        <Link to = {`/recipes/${c.rno}`}>레시피 보기</Link>
                      </Button>
                      <div>

                        {/* <IconCheckboxes style={{float:"left"}}onClick={()=>{submit()}}/> */}
                        {/* <LikeButton className='inline items-end h-4'></LikeButton> */}
                        <span className='inline items-justify'>🟢 3.4</span>
                      </div>
                    </CardBody>
                  </Card>
                  
                ))}
            </div>
           
        </>
    );
}

export default HottestRecipes;