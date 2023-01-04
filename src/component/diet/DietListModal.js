
import {
  Form, FormGroup, InputGroup, Input, Button
  , Modal, ModalHeader, ModalBody, ModalFooter, Table, Fade
} from 'reactstrap';
import { useContext, useEffect, useState } from 'react';
import { hasBgRendering } from '@fullcalendar/react';
import './ModalCommon.css';

// import {useSelector, useDispatch} from 'react-redux'; // useSelector : 특정 변수의 값을 가져온다. 함수를 인자값으로 넣어야함. / useDispatch : reduce() 함수를 호출
import axios from 'axios';
import { DietModalContext } from './DietModal';
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.


export default function DietListModal({modalSearchProps, data}) {

  // DietModal Context 연동
  const context = useContext(DietModalContext);

  const renderArr = [];
  // const recipeArr = context.recipeArr;
  // const recipeArr = useSelector((state)=>{return state.recipeArr})
  const [searchData, setSearchData] = useState([])

  useEffect(()=>{
    axios.get("/recipeSearch",{params:{param:modalSearchProps}
   })
   .then((res)=>{
     setSearchData(res.data) // 전역변수 배열에 값 초기화
   })
   .catch((res)=>{
     alert(res)
   })
  },[])

  const userId = useSelector( (state) => {return state.UserId} );

  const listRender = () => {
    let mealDiv = 0;
    switch (data.mealDivStr) {
      case "아침": mealDiv = 1
      break;
      
      case "점심": mealDiv = 2
      break;
      
      default: mealDiv = 3
    }
    for(let i=0; i<searchData.length; i++) {
      renderArr.push(
        <tr key={searchData[i].rno} id={i}>
          {/* <td>
            {searchData[i].regId}
          </td> */}
          <td>
            <a style={{cursor:"pointer",textDecoration: "none", color : "black"}}
                onClick={(e) => {
                  e.preventDefault();
                  if(data.targetKcal < data.totalKcal+searchData[i].kcal) {
                      alert("\n 해당 레시피를 추가할 수 없습니다. \n "
                    +"지정한 목표 칼로리 수치를 초과합니다.");
                    return;
                  }
                  // 험수화 할 수 없음. 반복문 내에서 선택된 데이터를 반영해야 하기 때문에
                  axios.post("/dietAdd", {userId: userId, dietDate : data.dietDate, mealDiv : mealDiv, rno:searchData[i].rno})
                  .then((response)=>{
                    alert("식단 추가 성공!");
                    /* data.setDietListArray([...data.dietListArray
                    , {userId : data.dietListArray[0].userId
                       , dietDate : data.dietListArray[0].dietDate
                       , mealDiv : data.dietListArray[0].mealDiv
                       , achieve : data.dietListArray[0].achieve
                       , targetKcal : data.dietListArray[0].targetKcal
                       , dno : data.dietListArray[0].dno
                       , recipe : searchData[i]
                      }
                    ]) */
                    data.dietSearch(data.mealDivStr);
                    context.modalToggle2(); //부모 modalShow2 값 변경 -> isOpen = false 
                  })
                  .catch((error)=>{
                    alert("식단 추가 실패!");
                  })
            }}>{searchData[i].title}</a>
          </td>
          <td>
            {searchData[i].kcal}kcal
          </td>
          <td>
            {searchData[i].cnt}
          </td>
          <td>
            {searchData[i].cnt}
          </td>
          <td>
            {searchData[i].cnt}
          </td>
        </tr>
      )
    }
    return renderArr;
  }
  return (
    <>
    <Modal size='xl' isOpen={context.modalShow2} fade={true} toggle={context.modalToggle2} style={{ width: "620px", position: "fixed", top: "50%", left: "65%", transform: "translate(-50%,-50%)" }}>
      <ModalHeader toggle={context.modalToggle2}>
        {/* <div> */}
        <div style={{ width: "560px"}}>
          <div style={{display:"inline-block",float:"left"}}>
            <span>[{modalSearchProps == "" ? "전체" : modalSearchProps}] 검색 결과</span>
          </div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <div style={{display:"inline-block",float:"right"}}>
            <span>{searchData.length} 개</span>
          </div> 
        </div>
      </ModalHeader>
      <ModalBody style={{overflow:"auto", height: "700px" }}>
        <Form>
          <FormGroup>
            <Table striped style={{width:"100%",tableLayout:"fixed",textAlign:"center"}}>
              <thead>
                <tr>
                  {/* <th style={{width:"100px"}}>ID</th> */}
                  <th style={{width:"170px"}}>메뉴명</th>
                  <th style={{width:"100px"}}>칼로리</th>
                  <th style={{width:"70px"}}>조회수</th>
                  <th style={{width:"70px"}}>별점</th>
                  <th style={{width:"70px"}}>좋아요</th>
                </tr>
              </thead>
              <tbody>
                {listRender()}
              </tbody>
            </Table>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={(e) => {e.preventDefault(); context.modalToggle2(); }}>닫기</Button>
      </ModalFooter>
    </Modal>
    </>
  )
}