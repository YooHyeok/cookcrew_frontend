import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Form, Input
} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import LikeButton from './LikeButton';
import { BsFillStarFill } from 'react-icons/bs'
import './RecipePage.css';
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.





function SearchResult() {
  const userId = useSelector((state) => { return state.UserId });
  const [isLikes, setIsLikes] = useState([]);
  const { keyword } = useParams();
  const [pageInfo, setPageInfo] = useState({
    allPage: 0, curPage: 0, startPage: 0, endPage: 0
  });

  const [searchKeyword, setSearchKeyword] = useState(keyword);

  const [recipes, setRecipes] = useState([]);
  const [scoreList,setScoreList] = useState([]);
  const [pageBtn, setPageBtn] = useState([]);

  const pageRequest = (e) => {
    serverRequest(e.target.value);
    console.log("e.target.value : " + e.target.value);
  }

  useEffect(() => {
    serverRequest(1);
    
  }, [])

  const serverRequest = (page) => {
    axios.get('/recipesearch/' + page, { params: { userId: userId }, params: {keyword: searchKeyword} })
      .then(response => {
        console.log(response.data);
        setPageInfo(response.data.pageInfo);
        setRecipes(response.data.recipes);
        setIsLikes(response.data.isLikeds);
        setScoreList(response.data.scoreList);
        console.log("pageInfo.curPage :" + pageInfo.curPage)
        console.log("pageInfo.startPage :" + pageInfo.startPage)
        console.log("ratings: " + scoreList.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const keywordChange = (e) => {
    setSearchKeyword(e.target.value);
  }

  return (
    <div>
      <div className="title">
        <div className=" text-5xl text-left ml-36 mr-10 mt-20 pt-20">
          검색 결과 <span style={{fontSize:"36px"}}>'{keyword}'</span>
        </div>
        <div className='ml-96'>
            <input style={{width:"300px",marginLeft:"502px", border:"solid 1px", borderRadius:"5px"}} type="keyword" name="keyword" id="keyword"  value={keyword} placeholder="검색어를 입력하세요"  onChange={keywordChange}/>
            <Link to={`/searchresult/${keyword}`}><Button className='ml-2'>검색</Button></Link>
        </div>
      </div>
      <section className=''>
        <div className=''
          style={{

            width: "1356px",
            margin: "0 auto",
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
                    src={c.thumbPath}
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
                  <span className=''><BsFillStarFill className='inline fill-yellow-400' />&nbsp;&nbsp;{scoreList[idx]}</span>
                  <span className='inline'><LikeButton LikeButton rno={c.rno} isLiked={isLikes[idx]} className='inline' /></span>

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
    </div>
  );
}

export default SearchResult;

