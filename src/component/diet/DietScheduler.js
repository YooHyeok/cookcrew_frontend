import { useState, createContext, useEffect } from 'react';
/* FullCalendar */
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // npm i --force @fullcalendar/interaction
import listPlugin from "@fullcalendar/list" // npm i --force @fullcalendar/list
// import "@fullcalendar/common/main.css"
/*컴포넌트 */
import DietModal from './DietModal';
import DietDescriptModal from './DietDescriptModal';
import DietChallengeModal from './DietChallengeModal';

/* CSS */
import './fullcalendar.css';
import './ModalCommon.css';
/*Axios */
import axios from 'axios';
/* 리덕스 */
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.
import { Button } from 'reactstrap';


import * as DateUtil from './DateUtil'
// import * as dateUtil from './dateUtil.js' //혹은 소문자로 파일명 지정후 .js파일확장자를 붙힌다.


export const DietSchedulerContext = createContext();
export const DietDesciprtContext = createContext();
export const DietChallengeContext = createContext();
export default function DietScheduler() {
  
  const divStyle = {
    width: '1200px' //캘린더 width 조절을 위해 부모태그에 설정한다.
    , height: '950px'
    , textAlign: 'left'
    , margin: '100px auto'
    , marginBottom: '20px'
    , border: '0.1px solid lightgray'
    , padding: '30px'
    , borderRadius: '20px'
    , top: '100'
  };
  const userId = useSelector( (state) => {return state.UserId} );

  /* 상세 설명 모달 */
  const [descriptShow, setDescriptShow] = useState(false);
  const descriptToggle = () => {
    setDescriptShow(!descriptShow)
  }

  /* 챌린지 참여여부 모달 */
  const [challengeShow, setChallengeShow] = useState(false);
  const challengeToggle = () => {
    setChallengeShow(!challengeShow)
  }

  /* 식단 계획 모달 */
  const [modalShow1, setModalShow1] = useState(false);
  const modalToggle1 = () => {
    setModalShow1(!modalShow1)
    if(modalShow1 == true) {
      eventRender();
    }
  }
  const [events, setEvents] = useState([]);
  const [challengeDate, setChallengeDate] = useState({startDate : '', endDate:''});
  const [dietProps, setDietProps] = useState({dietDate : '', mealDivStr : '아침', fmtDateKr: ''});

  useEffect(()=>{
    eventRender();
  },[])
  

  /**
   * Scheduler Event Render 비동기 통신
   * axios 통신 이벤트 값 초기화
   * 이벤트값이 캘린더에 렌더된다.
   * useEffect에서 호출된다.
   */
  const eventRender = () => {
    axios.get("/dietSearchMonthAll", {params:{userId:userId}})
    .then((res)=>{
      setEvents(res.data.dietList);
      setChallengeDate({startDate : res.data.startDate, endDate : res.data.endDate});
    })
    .catch((res)=>{
      alert(res)
      
    })
  }

  /**
   * [날짜 블록 선택] 함수 콜백
   * @param : arg -> 이벤트 파라미터 객체 
   * Modal에 전달할 Props객체 값 초기화 
   * 모달 제어 - Open 
   */
  const handleDateClick = (arg) => {
    /* arg.strStr : yyyy-MM-dd - DateUtil.js 파일 참조 */
    let fmtDateKr = DateUtil.hipenToKrfmtDate(arg.startStr);

    // setDietProps({...dietProps, dietDate : arg.startStr, fmtDateKr : fmtDateKr })
    setDietProps({dietDate : arg.startStr, mealDivStr : "아침", fmtDateKr : fmtDateKr})
    modalToggle1();
  }
  
  /**
   * [이벤트 선택] 함수 콜백
   * @param : arg -> 이벤트 파라미터 객체 
   * Modal에 전달할 Props객체 값 초기화 
   * 모달 제어 - Open 
  */
 const handleEventClick = (arg) => {
   /* eventDate : yyyy-MM-dd - DateUtil.js 파일 참조*/
   let eventDate = DateUtil.gmtToHipenfmtDate(arg.event.start);
   /* fmtDateKr : yyyy년 MM월 dd일 - DateUtil.js 파일 참조*/
   let fmtDateKr = DateUtil.gmtToKrfmtDate(arg.event.start);
   setDietProps({dietDate : eventDate, mealDivStr : arg.event.title, fmtDateKr : fmtDateKr})
    modalToggle1();
    
  }


  const dsModal = {//user와 set함수를 함께 넘긴다.
    descriptShow: descriptShow
    , descriptToggle: descriptToggle.bind(this)
  }
  const chlngModal = {//user와 set함수를 함께 넘긴다.
    challengeShow: challengeShow
    , challengeToggle: challengeToggle.bind(this)
  }

  const modal1 = {//user와 set함수를 함께 넘긴다.
    modalShow1: modalShow1
    , modalToggle1: modalToggle1.bind(this)
  }

  return (
    <div style={divStyle}>
      <button style={{float:"right"}} onClick={(e)=>{e.preventDefault(); descriptToggle();}}>
        <b>상세설명</b><br/>
        <img style={{width:"40px",height:"40px",float:"right"}}src={require("./finger_cursor.png")}/>
      </button>
      <div>
        <h1 style={{margin:"0px"}}><b>다이어트 식단표</b></h1>
        <label style={{color:"gray", fontSize:"13px"}}>챌린지 참여 여부에 따라 챌린지 랭킹에 등제됩니다.</label>
      </div>
      <br/>
      
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        height={800}
        locales="ko"
        selectable={true}
        dayHeaders={true}
        titleFormat={{ month: 'long', year: 'numeric' }}
        noEventsContent='이달의 등록된 식단이 없습니다.'
        events={events}
        headerToolbar={{
          start: 'dayGridMonth listMonth today'
          // end: 'challenge'
          , center: 'prev title next'
          , end: 'challenge'
        }}
        buttonText={{
          dayGridMonth: '달력',
          listMonth: '목록',
          today:'오늘',
        }}
        customButtons = {{
          challenge: {
            text: '챌린지 랭킹 참여 여부'
            ,click : function() {
              challengeToggle();
            },
          }
        }}
        eventOrder={"mealDiv"}
        dayMaxEventRows={true}
        select={handleDateClick} //dateClick으로 대체 가능.
        eventContent={renderEventContent} //이벤트 활성화시킴? (ui가 미세하게 바뀜)
        eventClick={handleEventClick}// title 출력
      />
      {/* DietModal은 DietListModal의 부모 컴포넌트 이므로 store값은 DietListModal에도 함께 공유된다 */}
      {descriptShow && 
        <DietDesciprtContext.Provider value={dsModal}>
        <DietDescriptModal />
      </DietDesciprtContext.Provider>
      }
      { challengeShow && <DietChallengeContext.Provider value={chlngModal}>
        <DietChallengeModal challengeValue={challengeDate}/>
      </DietChallengeContext.Provider>
      }
      { modalShow1 &&
          <DietSchedulerContext.Provider value={modal1}>
            <DietModal dietValue={dietProps}/>
          </DietSchedulerContext.Provider>
      }
    </div>
  )
}
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}