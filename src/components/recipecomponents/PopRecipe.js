import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.
import LikeButton from './LikeButton';
import { BsFillStarFill } from 'react-icons/bs'
import './RecipePage.css';




function RecipePage() {


  const [pageInfo, setPageInfo] = useState({
    allPage: 0, curPage: 0, startPage: 0, endPage: 0
  });

  const [recipes, setRecipes] = useState([]);
  const [isLikes, setIsLikes] = useState([]);
  const userId = useSelector((state) => { return state.UserId });
  const [rnos, setRnos] = useState([]);
  const pageRequest = (e) => {
    serverRequest(e.target.value);
  }

  useEffect(() => {
    serverRequest(1);
  }, [])

  const serverRequest = (page) => {
    axios.get('/poprecipepage/' + page, {params:{userId:userId}})
      .then(response => {
        console.log(response.data.pageInfo);
        setPageInfo(response.data.pageInfo);
        setRecipes(response.data.recipes);
        setIsLikes(response.data.isLikeds);
      })
      .catch(error => {
        console.log(error);
      })
  }

  // useEffect(() => {
  //   axios.get('/likestatus',{params: userId})
  //     .then((response) => {
  //       // console.log(response.data);
  //       setRnos(response.data);
  //       console.log(rnos.toString);
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //     })
  // }, []);

  return (
    <>
      <div className="title">
        <div className="font-semibold text-5xl text-left ml-36 mr-10 mt-20 pt-20">
          인기 레시피
        </div>
      </div>
      <section className='body'>
        <div className=''
          style={{

            width: "768px",
            display: "grid",
            gridTemplateRows: "1fr",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",

          }}
        >
          {recipes.map((c,idx) => (
            <Card key={c.rno}
              style={{
                width: '18rem',
                fontSize: '1.125rem',
                cursor: 'pointer',
                padding: '0.5rem',
                margin: '1rem',
              }}
            >
              <div className=''>
              <Link to={`/reciperef/${c.rno}`}>
                <img
                  className='self-center'
                  alt="Sample"
                  src={c.thumbPath}
                />
              </Link>
              </div>

              <CardBody className='card-body'>
                <Link to={`/reciperef/${c.rno}`}>
                  <CardTitle tag="h5">
                    {c.title}
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    칼로리: {c.kcal}
                  </CardSubtitle>
                  <CardText className="mb-2 text-muted"
                    tag="h6">
                    작성자: {c.regId}
                  </CardText>
                </Link>
                {/* <Button
                        className='bg-white'>
                        <Link to = {`/reciperef/${c.rno}`}>레시피 보기</Link>
                      </Button> */}
                <div>
                  {/* <IconCheckboxes style={{float:"left"}}onClick={()=>{submit()}}/> */}
                  {/* <LikeButton className='inline items-end h-4'></LikeButton> */}
                  <span className=''><BsFillStarFill className='inline fill-yellow-400' />&nbsp;&nbsp;{c.rating}</span>
                  <span className='inline'><LikeButton rno={c.rno} isLiked={isLikes[idx]} className='inline' /></span>

                </div>
              </CardBody>
            </Card>

          ))}
        </div>
      </section>
      <div>
        {(() => {
          const array = [];
          for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            array.push(
              <span key={i}><Button className='numberbutton' value={i} onClick={pageRequest}>{i}</Button>&nbsp;&nbsp;</span>
            )
          }
          console.log(array.length)
          return array;
        })()}
      </div>
    </>
  );
}

export default RecipePage;

