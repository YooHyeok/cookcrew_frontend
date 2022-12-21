import { useState, createContext, useEffect } from 'react';
/* FullCalendar */
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // npm i --force @fullcalendar/interaction
import listPlugin from "@fullcalendar/list" // npm i --force @fullcalendar/list
import "@fullcalendar/common/main.css"
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
    , marginBottom: '40px'
    , border: '0.5px solid gray'
    , padding: '30px'
    , borderRadius: '20px'
    , top: '100'
  };
 
  const [modalShow1, setModalShow1] = useState(false);
  // console.log("모달1에 대한 쇼",modalShow1)
  const modalToggle1 = () => {
    setModalShow1(!modalShow1)
  }
  const [startStr , setStartStr] = useState('');
  // const [dietListObject, setDietListObject] = useState({title:'', date:''});
  const [dietListArray, setDietListArray] = useState([]);
  const [events, setEvents] = useState([]);

  /* JavaScript Date [TO] yyyy년 MM월 dd일 [FormatString] */
  const dietDateByServer = new Date(startStr);
  const year = dietDateByServer.getFullYear();
  const month = (dietDateByServer.getMonth()+1);
  const day = dietDateByServer.getDate();
  const fmtDateKr = year+"년 "+month+"월 "+day+"일";

  useEffect(()=>{
    console.log("리렌더링됨")
    document.getElementsByClassName("fc-listMonth-button")[0].innerText="리스트";
    axios.get("/dietSearchMonthAll")
    .then((res)=>{
      console.log(res.data)
      setEvents(res.data);
    })
    .catch((res)=>{
      alert(res)
      
    })
  },[])
  
  // let dietDateByClient = '';

  const dietSearch = (title , date, eventCallback) => {
    console.log("통신")
    console.log(title,date)
    let param = {}
    let titleParam = '';
    let url = "/dietSearch";
    switch (title) {
      case '아침': titleParam = '1';
      param = {params:{dietDate : date, mealDiv: titleParam}};
      break;
      case '점심': titleParam = '2';
      param = {params:{dietDate : date, mealDiv: titleParam}};
      break;
      case '저녁': titleParam = '3'; 
      param = {params:{dietDate : date, mealDiv: titleParam}};
      break;
      case null: titleParam = '1'; // title이 비어있을경우 기본값 : "아침"
      param = {params:{dietDate : date, mealDiv: titleParam}};
    }
    axios.get(url, param)
    .then((res)=>{
      console.log("지금 조회 : ",res.data)
      setDietListArray(res.data)
      console.log(eventCallback);
      if(eventCallback == date) {
        modalToggle1();
      }
    })
    .catch((res)=>{
      alert(res)
    })
  }
  const handleDateClick = (arg) => {
    setStartStr(arg.startStr);
    dietSearch(null, arg.startStr, "date");
    // modalToggle1();
  }

  const handleEventClick = (arg) => {
    let eventDate = arg.event.start.getFullYear()+"-"+(arg.event.start.getMonth()+1)+"-"+arg.event.start.getDate()
    setStartStr(eventDate);
    dietSearch(arg.event.title, eventDate, "event");
    
  }

  const modal1 = {//user와 set함수를 함께 넘긴다.
    modalShow1: modalShow1
    , startStr : startStr
    , fmtDateKr : fmtDateKr
    , dietListArray : dietListArray
    , dietSearch : dietSearch.bind(this)
    , modalToggle1: modalToggle1.bind(this)
    // , setModalShow1: setModalShow1.bind(this) // 2. this.setState와 같은 형태로 this와 바인드 하여야만 this를 다른 컴포넌트에 넘길 수 있다.
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
        dayMaxEventRows={true}
        select={handleDateClick} //dateClick으로 대체 가능.
        eventContent={renderEventContent} //이벤트 활성화시킴? (ui가 미세하게 바뀜)
        eventClick={handleEventClick}// title 출력
      />
      {/* DietModal은 DietListModal의 부모 컴포넌트 이므로 store값은 DietListModal에도 함께 공유된다 */}

      { modalShow1 &&
        <Provider store={store}>
          <DietSchedulerContext.Provider value={modal1}>
            <DietModal />
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