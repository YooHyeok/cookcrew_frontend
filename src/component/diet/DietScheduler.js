import { useState, createContext, useEffect } from 'react';
/* FullCalendar */
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // npm i --force @fullcalendar/interaction
import listPlugin from "@fullcalendar/list" // npm i --force @fullcalendar/list
// import "@fullcalendar/common/main.css"
/*컴포넌트 */
import DietModal from './DietModal';
/* CSS */
import './fullcalendar.css';
import './ModalCommon.css';
/*Axios */
import axios from 'axios';
/* 리덕스 */
import {Provider} from 'react-redux' // npm install --save react-redux
import store from "./recipeArrayReduxStore";
import { UncontrolledAlert } from 'reactstrap';


export const DietSchedulerContext = createContext();
export default function DietScheduler() {
  
  const divStyle = {
    width: '1200px' //캘린더 width 조절을 위해 부모태그에 설정한다.
    , height: '950px'
    , textAlign: 'left'
    , margin: '100px auto'
    , marginBottom: '20px'
    , border: '0.5px solid gray'
    , padding: '30px'
    , borderRadius: '20px'
    , top: '100'
  };
 
  const [modalShow1, setModalShow1] = useState(false);
  const modalToggle1 = () => {
    setModalShow1(!modalShow1)
    if(modalShow1 == true) {
      eventRender();
    }
  }
  const [events, setEvents] = useState([]);
  const [dietProps, setDietProps] = useState({dietDate : '', mealDivStr : '아침', fmtDateKr: ''});

  useEffect(()=>{
    document.getElementsByClassName("fc-listMonth-button")[0].innerText="리스트";
    eventRender();
  },[])
  

  /**
   * Scheduler Event Render 비동기 통신
   * axios 통신 이벤트 값 초기화
   * 이벤트값이 캘린더에 렌더된다.
   * useEffect에서 호출된다.
   */
  const eventRender = () => {
    axios.get("/dietSearchMonthAll")
    .then((res)=>{
      console.log(res.data)
      for(let i=0; i<res.data.length; i++) {

      }
      setEvents(res.data);
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
    /* arg.strStr : yyyy-MM-dd */
    let dietDateByServer = new Date(arg.startStr);

    let year = dietDateByServer.getFullYear();
    let month = (dietDateByServer.getMonth()+1);
    let day = dietDateByServer.getDate();
    /* fmtDateKr : yyyy년 MM월 dd일 */
    let fmtDateKr = year+"년 "+month+"월 "+day+"일";

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
  console.log(arg)
   /* eventDate : yyyy-MM-dd */
   let eventDate = arg.event.start.getFullYear()+"-"+(arg.event.start.getMonth()+1)+"-"+arg.event.start.getDate()
   /* fmtDateKr : yyyy년 MM월 dd일 */
   let fmtDateKr = arg.event.start.getFullYear()+"년 "+(arg.event.start.getMonth()+1)+"월 "+arg.event.start.getDate() +"일"
   setDietProps({dietDate : eventDate, mealDivStr : arg.event.title, fmtDateKr : fmtDateKr})
    modalToggle1();
    
  }


  const modal1 = {//user와 set함수를 함께 넘긴다.
    modalShow1: modalShow1
    , modalToggle1: modalToggle1.bind(this)
  }

  return (
    <div style={divStyle}>
      <div><h1><b>다이어트 식단표</b></h1></div><br />
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
          start: 'dayGridMonth listMonth'
          , center: 'prev title next'
          , end: 'today'
        }}
        buttonText={{
          today:'오늘',
        }}
        eventOrder={"mealDiv"}
        dayMaxEventRows={true}
        select={handleDateClick} //dateClick으로 대체 가능.
        eventContent={renderEventContent} //이벤트 활성화시킴? (ui가 미세하게 바뀜)
        eventClick={handleEventClick}// title 출력
      />
      {/* DietModal은 DietListModal의 부모 컴포넌트 이므로 store값은 DietListModal에도 함께 공유된다 */}

      { modalShow1 &&
        <Provider store={store}>
          <DietSchedulerContext.Provider value={modal1}>
            <DietModal dietValue={dietProps}/>
          </DietSchedulerContext.Provider>
        </Provider>
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