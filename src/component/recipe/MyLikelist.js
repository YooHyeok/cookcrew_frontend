import axios from "axios"
import { useEffect,useState } from "react"
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import LikeButton from "../../components/recipecomponents/LikeButton";
import { Link,useParams } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';

export default function MyLikelist(){

    const [recipe, setRecipe] = useState([]);

    const userId = useSelector((state) => { return state.UserId });
    console.log(userId);
    const [pageInfo, setPageInfo] = useState({
        allPage: 0, curPage: 0, startPage: 0, endPage: 0
    });
    const [page, setPage] = useState(0);

    const pageRequest = (e) => {
        setPage(e.target.value);
    }

    useEffect(() => {
        serverRequest(1);
    }, [])

    const serverRequest = () => {
        axios.get(`/mylikelist/${userId}${page}`)
            .then((response) => {
                console.log(response.data);               
                setRecipe(response.data);
                setPageInfo(response.data.pageInfo);
            })
            .catch((error) => {
                console.log(error);
            })
    };


    return(
        <div >
            <section className='body'>
                <div className=''
                    style={{

                        display: "grid",
                        gridTemplateRows: "1fr",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",

                    }}
                >
                    {recipe.map(c => (
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
                            <Link to={`/reciperef/${c.rno}`}>
                                <img
                                    alt="Sample"
                                    src={c.thumbPath}
                                />
                            </Link>

                            <CardBody>
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
                                <div>
                                    <span className=''><BsFillStarFill className='inline fill-yellow-400' />&nbsp;&nbsp;{c.rating}</span>
                                </div>
                            </CardBody>
                        </Card>

                    ))}
                </div>
            </section>
            <div>
                {(()=> {
                        const array = [];
                        for (let i = pageInfo.startPage; i<=pageInfo.endPage; i++){
                            array.push(
                                <span key={i}><Button className='numberbutton' value={i} onClick={pageRequest}>{i}</Button>&nbsp;&nbsp;</span>
                            )
                        }
                        console.log(array.length)
                        return array;
                    })()}
            </div>
        </div>
    )
    
}