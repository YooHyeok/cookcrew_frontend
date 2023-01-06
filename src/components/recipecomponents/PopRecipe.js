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
import ButtonSecondary from '../../shared/Button/ButtonSecondary';




function RecipePage() {


  const [pageInfo, setPageInfo] = useState({
    allPage: 0, curPage: 0, startPage: 0, endPage: 0
  });

  const [recipes, setRecipes] = useState([]);
  const [isLikes, setIsLikes] = useState([]);
  const [scoreList,setScoreList] = useState([]);
  const userId = useSelector((state) => { return state.UserId });
  const [keyword, setKeyword] = useState('');

  const pageRequest = (e) => {
    serverRequest(e.target.value);
  }

  useEffect(() => {
    serverRequest(1);
  }, [])
  
  const keywordChange = (e) => {
    setKeyword(e.target.value);
  }
  const serverRequest = (page) => {
    axios.get('/poprecipepage/' + page, {params:{userId:userId}})
      .then(response => {
        console.log(response.data.pageInfo);
        setPageInfo(response.data.pageInfo);
        setRecipes(response.data.recipes);
        setIsLikes(response.data.isLikeds);
        setScoreList(response.data.scoreList);
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
      <div className="text-5xl text-left ml-36 mr-10 mt-10 pt-20">
          인기 레시피
        </div>
        <div style={{marginLeft:"1105px", marginBottom:"10px"}}>
            <Link to = '/recipecreate'>
              <ButtonSecondary>레시피 등록하기</ButtonSecondary>
            </Link>
        </div>
        <div className='ml-96'>
            <input style={{width:"300px",marginLeft:"502px", border:"solid 1px", borderRadius:"5px"}} type="keyword" name="keyword" id="keyword"  value={keyword} placeholder="검색어를 입력하세요"  onChange={keywordChange}/>
            <Link to={`/searchresult/${keyword}`}><Button className='ml-2'>검색</Button></Link>
        </div>
      </div>
      <section>
        <div className=''
          style={{
            width: "1356px",
            margin: "0 auto",
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
                  <span className=''><BsFillStarFill className='inline fill-yellow-400' />&nbsp;&nbsp;{scoreList[idx]}</span>
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
          if(pageInfo.curPage != 1)
          array.unshift(
            <span ><Button outline color='secondary' className='numberbutton' value={pageInfo.curPage-1} onClick={pageRequest}>{"<"}</Button>&nbsp;&nbsp;</span>

          )
          if(pageInfo.curPage != Math.max(pageInfo.allPage))
          array.push(
            <span ><Button outline color='secondary' className='numberbutton' value={pageInfo.curPage+1} onClick={pageRequest}>{">"}</Button>&nbsp;&nbsp;</span>

          )
          return array;
        })()}
      </div>
    </>
  );
}

export default RecipePage;

