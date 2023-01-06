import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Card, CardImg, CardText, CardBody,
        CardTitle, CardSubtitle, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import LikeButton from '../../components/recipecomponents/LikeButton';
import { BsFillStarFill } from 'react-icons/bs'
import '../../components/recipecomponents/RecipePage.css';
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.





function MyLikeCardList() {
  const userId = useSelector((state) => { return state.UserId });
  const [isLikes, setIsLikes] = useState([]);


  const [pageInfo, setPageInfo] = useState({
    allPage: 0, curPage: 0, startPage: 0, endPage: 0
  });

  const [recipes, setRecipes] = useState([]);
  // const [scoreList,setScoreList] = useState([]);
  const [pageBtn, setPageBtn] = useState([]);

  const pageRequest = (e) => {
    serverRequest(e.target.value);
    console.log("e.target.value : " + e.target.value);
  }

  useEffect(() => {
    serverRequest(1);
  }, [])

  const serverRequest = (page) => {
    axios.get('/mylikelist/' + page, { params: { userId: userId } })
      .then(response => {
        console.log(response.data);
        setPageInfo(response.data.pageInfo);
        setRecipes(response.data.recipes);
        // setIsLikes(response.data.isLikeds);
        // setScoreList(response.data.scoreList);
        console.log("pageInfo.curPage :" + pageInfo.curPage)
        console.log("pageInfo.startPage :" + pageInfo.startPage)
        console.log(response.data.recipes);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <div className="title">
        <div className="font-semibold text-5xl text-left ml-36 mr-10 mt-20 pt-20">
          나의 찜목록
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
          {recipes.map((c, idx) => (
            <Card key={c.rno}
              style={{
                width: '18rem',
                fontSize: '1.125rem',
                cursor: 'pointer',
                padding: '0.5rem',
                margin: '1rem',
              }}
            >
              <div>
                <Link to={`/reciperef/${c.rno}`}>
                  <CardImg className='imagesize'
                    alt="Sample"
                    src={c.thumb_path}
                  />
                </Link>
              </div>

              <CardBody className=''>
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
                  <span className=''><BsFillStarFill className='inline fill-yellow-400' />&nbsp;&nbsp;{c.score}</span>
                  <span className='inline'><LikeButton  LikeButton rno={c.rno} truefalse={c.rno} isLiked={c.likeValue === 1} className='inline' /></span>

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
            if (i == pageInfo.curPage) {
              array.push(
                <span key={i}><Button color='primary' className='numberbutton' value={i} onClick={pageRequest}>{i}</Button>&nbsp;&nbsp;</span>
              )
            } else {
              array.push(
                <span key={i}><Button outline color='secondary' className='numberbutton' value={i} onClick={pageRequest}>{i}</Button>&nbsp;&nbsp;</span>
              )
            }
          }
          array.unshift(
            <span ><Button outline color='secondary' className='numberbutton' value={pageInfo.curPage-1} onClick={pageRequest}>{"<"}</Button>&nbsp;&nbsp;</span>

          )
          
          array.push(
            <span ><Button outline color='secondary' className='numberbutton' value={pageInfo.curPage+1} onClick={pageRequest}>{">"}</Button>&nbsp;&nbsp;</span>

          )
          return array;
        })()}
      </div>
    </div>
  );
}

export default MyLikeCardList;

