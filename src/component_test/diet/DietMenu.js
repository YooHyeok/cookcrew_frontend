import { useState, createContext } from 'react';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // npm i --force @fullcalendar/interaction
import listPlugin from "@fullcalendar/list" // npm i --force @fullcalendar/list
import "@fullcalendar/common/main.css"

import DietModal from './DietModal';
import './fullcalendar.css';

export const UserContext = createContext(); // 1. Context를 생성한다. - 리액트의 기능, context객체의 user를 공유한다.
export default function DietMenu() {
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
  /**
   * 페이지가 로드되는 순간 axios와 통신후 객체 변수로 초기화
   * FullCalnendar 컴포넌트의 events속성에 값을 뿌려준다. (또한 Modal의 List에서도 뿌려준다.)
   * Modal에서 검색된 내용을 버튼을 클릭하는 순간 setState를 통해 전역변수 초기화.
   * 해당 변수를 통해 axios 통신. - 저장
   * 
   * Modal에서 더보기 누를경우 새로운 Modal 띄우기(2중모달)
   * 입력한 단어를 기준으로 like연산 select하여 두번째 Modal에 List를 띄운다.
   * 두번째 모달에서 선택한 값을 1번째 Modal에 뿌려준다.
   * 1번째 모달에서 저장 누를경우 Save....
   * Save에서 여러 경우의수 Validation처리 해야함.
   * 
   * 원하는 날짜의 아침 메뉴를 클릭할 경우, 점심, 저녁, 공백 클릭할 경우에 따라
   * Modal에서의 Select 옵션 제어.
   * 
   */

  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show)
  }
  const modal1 = {//user와 set함수를 함께 넘긴다.
    show: show
    , setShow: setShow.bind(this) // 2. this.setState와 같은 형태로 this와 바인드 하여야만 this를 다른 컴포넌트에 넘길 수 있다.
    , toggle: toggle.bind(this)
  }

  const handleDateClick = (arg) => { // 날짜 클릭시 모달 투척
    console.log("handleDateClick", show)
    setShow(!show)
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
        events={[
          { title: '아침', date: '2022-12-14' },
          { title: '점심', date: '2022-12-14' },
          { title: '저녁', date: '2022-12-14' }
        ]}
        headerToolbar={{
          start: 'dayGridMonth listMonth'
          , center: 'prev title next'
          , end: 'today'
        }}
        dayMaxEventRows={true}
        select={handleDateClick} //dateClick으로 대체 가능.
        eventContent={renderEventContent} //이벤트 활성화시킴? (ui가 미세하게 바뀜)
        eventClick={(info) => { //이벤트 클릭
          alert(info.event.title)
          toggle();
          for (let event in info) {
          }

        }}// title 출력
      />
      {console.log("{disabled && 처리하기 직전 disabled값 : }", show)}
      {
        <UserContext.Provider value={modal1}>
          <DietModal />
        </UserContext.Provider>
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