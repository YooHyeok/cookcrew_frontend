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
import { useParams } from 'react-router-dom';


export const RecipeRefContext = createContext();

export default function RecipeRef() {
    const divStyle = {
        width: '1200px' //캘린더 width 조절을 위해 부모태그에 설정한다.
        , height: '100%'
        , textAlign: 'left'
        , margin: '100px auto'
        , marginBottom: '40px'
        , border: '0.5px solid gray'
        , padding: '30px'
        , borderRadius: '20px'
        , top: '100'
      };
    const [ratingModal, setRatingModal] = useState(false);
    const [likeModal, setLikeModal] = useState(false);
    const [reportModal, setReportModal] = useState(false);

    const {rNo} = useParams();

    const [ratingValue, setRatingValue] = useState(0)
    const [reportCd, setReportCd] = useState('')
    const id = 'user1';

    useEffect(() => {
        // console.log(ratingValue);
    }, [ratingValue])


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
    const contextParam = {
        ratingValue: ratingValue,
        setRatingValue: setRatingValue.bind(this),

        reportCd: reportCd,
        setReportCd: setReportCd.bind(this)
    }

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('ratingValue',ratingValue);
        formData.append('id',id);
        formData.append('rNo',rNo);
        console.log(reportCd);

        axios.post('/ratingreg', formData)
            .then((response) => {
                console.log(response.data);
                alert(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div style={divStyle}>
            <div><h1><b>레시피 조회</b></h1></div><br />
            {/* <div>
                <br /><br /><br /><br /><br />
                <h2>레시피 조회</h2>
            </div>
            <br /><br /><br /><br /><br /><br /> */}
            <form>
                <center>
                    <Tumbnail />
                    <div class="container" style={{ width: '600px' }} >
                        <ToastViewer />
                    </div>
                    <br /><br />
                    <div style={{ width: '850px' }}>
                        <div style={{ float: 'left' }}>
                            <button type="button" class="btn btn-outline-dark">목록으로</button>
                        </div>
                        <tr style={{ float: "right" }}>
                            <button type="button" class="btn btn-outline-warning" onClick={openrating}>
                                별점주기&nbsp;<BsFillStarFill /></button>&nbsp;
                            <Modal isOpen={ratingModal} fade={true} toggle={openrating}>
                                <ModalHeader toggle={openrating}>맛있으셨다면 평가해주세요!</ModalHeader>
                                <ModalBody>
                                    {/* state Provider ############################ */}
                                    <RecipeRefContext.Provider value={contextParam}>
                                        <RatingPush />
                                    </RecipeRefContext.Provider>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={submit}>확인</Button>
                                </ModalFooter>
                            </Modal>
                            <button type="button" class="btn btn-outline-danger" onClick={openlike}>
                                찜하기&nbsp;<BsHeartFill /></button>&nbsp;
                            <Modal isOpen={likeModal} fade={true} toggle={openlike}>
                                <ModalHeader toggle={openlike}></ModalHeader>
                                <ModalBody>
                                    찜목록으로 이동했습니다. <span style={{ color: "red" }} ><BsHeartFill /></span>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={openlike}>확인</Button>
                                </ModalFooter>
                            </Modal>
                            <button type="button" class="btn btn-outline-secondary" onClick={openreport}>
                                신고하기&nbsp;<AiTwotoneAlert /></button>
                            <Modal isOpen={reportModal} fade={true} toggle={openreport}>
                                <ModalHeader toggle={openreport}>신고하기
                                    <span style={{ color: "red" }} ><AiTwotoneAlert /></span>
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
                    <br /><br /><br /><br />
                </center>
            </form>
            <br /><br />
        </div>
    )
}
