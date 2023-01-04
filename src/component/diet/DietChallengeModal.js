import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Table } from 'reactstrap';
import {useContext,useEffect,useState} from 'react';
import { DietChallengeContext } from './DietScheduler';
import * as DateUtil from "./DateUtil.js"
import axios from 'axios';
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.

export default function DietChallengeModal({challengeValue}) {
  const context = useContext(DietChallengeContext);
  const [challengeDate, setChallengeDate] = useState({startDate : '', endDate:''});
    /* fmtDateKr : yyyy년 MM월 dd일 - DateUtil.js 파일 참조*/
  const fmtStartDTKr = DateUtil.hipenToKrfmtDate(challengeValue.startDate);
  const fmtEndDTKr = DateUtil.hipenToKrfmtDate(challengeValue.endDate);
  const modalStyle = { 
      width: "700px"
      , position: "fixed"
      , top: "50%"
      , left: "50%"
      , transform: "translate(15%,-70%)"
  }
  const [diffDay, setDiffDay] = useState('');
  useEffect(()=>{
    const diffDayTime = setInterval(() => {
      setDiffDay(DateUtil.diffDay(challengeValue.endDate));
    },1000)
    return () => clearInterval(diffDayTime);
  },[diffDay])

  const userId = useSelector( (state) => {return state.UserId} );

  const [checked, setChecked ] = useState(false);

  useEffect(()=>{
    axios.get('/searchValidate',{params:{userId:userId}})
    .then((res)=>{
      console.log(res.data)
      if(res.data==null){
        setChecked(false)
        return;
      }
      setChecked(res.data.validate);
    })
    .catch((res)=>{
      
    })
  },[])

  /**
   * 참여여부 체크 즉시통신
   * 데이터 없을경우 (시작,종료,userId,true) 데이터 [Insert]
   * 데이터 있을경우 (시작,종료,userId)조건으로 [Update]
   * @param {*} checkedProp 
   */
  const checkedBox = (checkedProp) => {
    axios.put('/saveValidate',{challenge:checkedProp, userId:userId})
    .then((res)=>{
    })
    .catch((res)=>{
      alert(res)
    })
  }

  return(
      <Modal isOpen={context.challengeShow} toggle={context.challengeToggle} style={modalStyle}>
        <ModalHeader toggle={context.challengeToggle}>
          <b>이번주 종료까지 남은시간  </b>
        <span style={{color:"red"}}>{diffDay}</span>
        </ModalHeader>
        <ModalBody>
          {/* <label htmlFor="challenge"></label>
          <input type="checkbox" name="challenge"/> */}
          <Table striped style={{width:"466px",tableLayout:"fixed",textAlign:"center"}}>
                <thead>
                  <tr>
                    {/* <th>챌린지 참여</th> */}
                    <th>시작일자</th>
                    <th>종료일자</th>
                    <th>참여여부</th>
                  </tr>
                </thead>  
                <tbody>
                    <tr >
                      <td>
                        {fmtStartDTKr}
                      </td>
                      <td>
                        {fmtEndDTKr}
                      </td>
                      <td>
                        <input type="checkbox" checked={checked} onChange={(e)=>{setChecked(e.target.checked); checkedBox(e.target.checked)}}/>
                      </td>
                  </tr>
                              
                </tbody>
            </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={context.challengeToggle}>닫기</Button>
        </ModalFooter>
      </Modal>
  )
}