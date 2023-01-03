import ToastViewer from "./ToastViewer"
import { BsHeartFill } from 'react-icons/bs';
import { AiTwotoneAlert } from 'react-icons/ai'
import { BsFillStarFill } from 'react-icons/bs'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { createContext, useEffect, useState } from 'react';
import RatingPush from './RatingPush';
import ReportPush from "./ReportPush";
import Tumbnail from "./Thumbnail";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import DeletePage from './DeletePage';
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.

export const RecipeRefContext = createContext();

export default function RecipeRef() {
    const divStyle = {
        width: '1200px' //캘린더 width 조절을 위해 부모태그에 설정한다.
        , minHeight: "860px"
        , height: '100%'
        , textAlign: 'left'
        , margin: '100px auto'
        , marginBottom: '40px'
        // , border: '0.5px solid lightgray'
        , padding: '30px'
        , borderRadius: '20px'
        , top: '100'
    };
    const [ratingModal, setRatingModal] = useState(false);
    const [likeModal, setLikeModal] = useState(false);
    const [reportModal, setReportModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [enabled, setEnabled] = useState('');

    const { rNo } = useParams();

    const [ratingValue, setRatingValue] = useState(0)
    const [reportCd, setReportCd] = useState('')
    const userId = useSelector((state) => { return state.UserId });
    const [regId, setRegId] = useState('');

    console.log(enabled);

    useEffect(() => {
        axios.get(`/rcpref/${rNo}`)
            .then((response) => {
                const rcp = response.data;
                setEnabled(rcp.enabled)
                setRegId(rcp.regId)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    
    // 별점주기 눌렀을 때, 별점의값을 세팅
    useEffect(() => {
        // console.log(ratingValue);
    }, [ratingValue])


    // 신고하기를 눌렀을 때, 신고코드의 값을 세팅
    useEffect(() => {
        // console.log(reportCd);
    }, [reportCd])

    const openrating = (e) => {
        setRatingModal(!ratingModal)
    }
    const openlike = (e) => {
        setLikeModal(!likeModal)
    }
    const openreport = (e) => {
        setReportModal(!reportModal)
    }
    const opnedelete = (e) => {
        setDeleteModal(!deleteModal)
    }

    const contextParam = {
        ratingValue: ratingValue,
        setRatingValue: setRatingValue.bind(this),

        reportCd: reportCd,
        setReportCd: setReportCd.bind(this)
    }

    const submitRating = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('ratingValue', ratingValue);
        formData.append('userId', userId);
        formData.append('rNo', rNo);

        axios.post('/ratingreg', formData)
            .then((response) => {
                console.log(response.data);
                alert(response.data);
                document.location.href=`/reciperef/${rNo}`
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const submitDelete = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('rNo', rNo);

        axios.post('/recipedelete', formData)
            .then((response) => {
                alert('삭제했습니다.');
                document.location.href=`/reciperef/${rNo}`
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (enabled == true) {
        return (
            <div style={divStyle}>
                <div>
                    <div>
                        <h1 className='inline'><b>레시피 조회</b></h1>
                        { userId === regId ? 
                            <div style={{ float: 'right' }}>
                                <Link to={`/recipemod/${rNo}`}>
                                    <button type="button" class="btn btn-outline-primary" >
                                        수정하기&nbsp;</button>&nbsp;
                                </Link>
                                <button type="button" class="btn btn-outline-danger" onClick={opnedelete} >
                                    삭제하기&nbsp;</button>
                                <Modal isOpen={deleteModal} fade={true} toggle={opnedelete}>
                                    <ModalHeader toggle={opnedelete}></ModalHeader>
                                    <ModalBody>
                                        정말로 삭제하시겠습니까?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={submitDelete}>확인</Button>
                                        <Button>취소</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                            : null
                        }
                    </div>



                </div><br />
                {/* <div>
                <br /><br /><br /><br /><br />
                <h2>레시피 조회</h2>
            </div>
            <br /><br /><br /><br /><br /><br /> */}
                <form>
                    <center>
                        <Tumbnail />
                        <div class="container" style={{ width: '600px', fontSize: '16px' }} >
                            <ToastViewer />
                        </div>
                        <br /><br /><br /><br /><br /><br />
                        <div >
                            <div style={{ float: 'left' }}>
                                <Link to={'/recipelist'}>
                                <button type="button" class="btn btn-outline-dark">목록으로</button>
                                </Link>
                            </div>
                            <tr style={{ float: "right" }}>
                                <button type="button" class="btn btn-outline-warning" onClick={openrating}>
                                    별점주기&nbsp;<BsFillStarFill className='inline' /></button>&nbsp;
                                <Modal isOpen={ratingModal} fade={true} toggle={openrating}>
                                    <ModalHeader toggle={openrating}>맛있으셨다면 평가해주세요!</ModalHeader>
                                    <ModalBody>
                                        {/* state Provider ############################ */}
                                        <RecipeRefContext.Provider value={contextParam}>
                                            <RatingPush />
                                        </RecipeRefContext.Provider>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={submitRating}>확인</Button>
                                    </ModalFooter>
                                </Modal>
                                <button type="button" class="btn btn-outline-danger" onClick={openlike}>
                                    찜하기&nbsp;<BsHeartFill className='inline' /></button>&nbsp;
                                <Modal isOpen={likeModal} fade={true} toggle={openlike}>
                                    <ModalHeader toggle={openlike}></ModalHeader>
                                    <ModalBody>
                                        찜목록으로 이동했습니다. <span style={{ color: "red" }} ><BsHeartFill className='inline' /></span>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={openlike}>확인</Button>
                                    </ModalFooter>
                                </Modal>
                                <button type="button" class="btn btn-outline-secondary" onClick={openreport}>
                                    신고하기&nbsp;<AiTwotoneAlert className='inline' /></button>
                                <Modal isOpen={reportModal} fade={true} toggle={openreport}>
                                    <ModalHeader toggle={openreport}>신고하기
                                        <span style={{ color: "red" }} ><AiTwotoneAlert className='inline' /></span>
                                    </ModalHeader>
                                    <ModalBody>
                                        <RecipeRefContext.Provider value={contextParam}>
                                            <ReportPush />
                                        </RecipeRefContext.Provider>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={openreport}>확인</Button>
                                    </ModalFooter>
                                </Modal>
                            </tr>

                        </div>
                        
                    </center>
                </form>
                <br /><br />
            </div>
        )
    }
    else {
        return (
            <DeletePage />
        )
    }
}
