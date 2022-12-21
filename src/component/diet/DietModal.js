
import {
  Form, FormGroup, InputGroup, Input, Button
  , Modal, ModalHeader, ModalBody, ModalFooter, Table
} from 'reactstrap';
import {createContext, useState, useContext, useEffect, useRef } from 'react';
import { DietSchedulerContext } from './DietScheduler';
import DietListModal from './DietListModal';
import { CurrencyBitcoin, Search } from 'react-bootstrap-icons';
import './ModalCommon.css';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'; // useSelector : 특정 변수의 값을 가져온다. 함수를 인자값으로 넣어야함. / useDispatch : reduce() 함수를 호출

/**
 * 식단 리스트 출력, 수정, 삭제 Modal컴포넌트
 * @returns 
 */
export const DietModalContext = createContext();

export default function DietModal() {
  const select = useRef({});

  const tableStyle = {textAlign: 'center'}
  const context = useContext(DietSchedulerContext);
  const [saveBtndisabled, setSaveBtndisabled] = useState(false);
  const [btnMode, setBtnMode] = useState('');
  const [btnControlObject, setBtnControlObject] = useState({modify : false, save: true});
  /* 모달2 전역변수 */
  const [modalShow2, setModalShow2] = useState(false);
  /* 검색창 검색어 */
  const [searchParam, setSearchParam] = useState('');
  /* 검색된 결과 - rNo, kcal 객체 */
  const [searchData, setSearchData] = useState({});

  const [selectedValue, setSelectedValue] = useState(0);

  /* 모달 2 파라미터 배열 변수(rno값) */
  const [selectRecipeData, setSelectRecipeData] = useState([]);

  
  const modalToggle2 = () => {
    setModalShow2(!modalShow2);
  }

  /* 모달 헤더 날짜 */
  const fmtDateKr = context.fmtDateKr;
  const startStr = context.startStr;
  /* redux 초기화 배열 */
  const recipeArr = useSelector((state)=>{return state.recipeArr})
  console.log("dietModal recipeArr : ", recipeArr)
  
  const modal = () => {

    modalToggle2();
  }

  /**
   * 검색한 값으로 통신 쿼리조회 - 가져온 데이터 전역변수 초기화
   * 1차 모달 toggle 컨트롤 - 전역의 show 속성을 true로 변경
  */
  const search = () => {
    axios.get("/recipeSearch",{params:{searchParam:searchParam}
    })
    .then((res)=>{
      setSearchData(res.data) // 전역변수 배열에 값 초기화
    })
    .catch((res)=>{
      alert(res)
      
    })
    
  }

  /**
   * 검색창에 검색한 데이터 전역변수 초기화
  */
  const initSearchParam = (e) => {
    e.preventDefault();
    setSearchParam(e.target.value);
  }


  // renderDietArr tr태그 전역변수에 초기화.
  let renderDietArr = [];
  let renderSelectArr = [];
  let renderKcalArr = [];
  /* 식단 리스트 배열 */
  const dietListArray = context.dietListArray; 
  
  // const select = useRef(select)


  /* 식단 리스트 렌더 */
  const dietList = (dietListArray) =>{
    for(let i=0; i<dietListArray.length; i++) {
      /* selectBox 제어 */
      if(i == 0) {
        console.log(dietListArray[i].mealDiv)
        
      }
      renderDietArr.push(
        <tr key={dietListArray[i].dno} id={dietListArray[i].dno}>
          <td>
            <a style={{textDecoration: "none", color : "black"}} href="#" target='_blank'>{dietListArray[i].recipe.title}</a>
          </td>
          <td>
            {dietListArray[i].recipe.kcal}Kcal
          </td>
          <td>
            <a href="http://localhost/dietmenu" className="hyphenIcon" style={{ display: "show",textDecoration: "none", color : "black" }} onClick={delHypen}>(-)</a>
          </td>
        </tr>
      )
    }
    return renderDietArr;
  }

  /* 식단 목표 칼로리, 칼로리 총합 변수 선언 및 초기화*/
  let kcalTotal = 0;
  let targetKcal = 0;

  /* 식단 목표 칼로리, 토탈 칼로리 */
  const dietKcal = (dietListArray) => {
    for(let i=0; i<dietListArray.length; i++) {
      kcalTotal += dietListArray[i].recipe.kcal;
      targetKcal = dietListArray[0].targetKcal;
      /* 식단 리스트 0일경우 목표칼로리 입력창 활성화 */
    }
    renderKcalArr.push(
      <tr key={0}>
        <td>
          <span style={{display:"block"}}>
            <label htmlFor="clngeTf">참여</label>
            <input type="checkbox" name="clngeTf" id="clngeTf"/>
          </span>
        </td>
        <td>
          <Input type="text" id="kcalInput" style={{width:"55px",height:"20px", display:"inline-block"}}
                value={targetKcal} disabled={(() => {return true;})()}/>Kcal
        </td>
        <td>
          {kcalTotal}Kcal
        </td>
        <td>
          <span style={{display:"block"}}>
            <label htmlFor="TargetTf">달성</label>
            <input type="checkbox" name="TargetTf" id="TargetTf"/>
          </span>
        </td>
    </tr>
    ) 
    
    return renderKcalArr;
  }

  /**
   * context로 이중모달에 넘길 객체 (속성,메소드)
  */
  const modal2 = {
     modalShow2 : modalShow2
  //  , setModalShow2: setModalShow2.bind(this)
   , modalToggle2: modalToggle2.bind(this)
   , searchParam : searchParam
   , searchData : searchData
   , recipeArr : recipeArr
   , selectRecipeData : selectRecipeData
   , setSelectRecipeData : setSelectRecipeData.bind(this)
  }
  
  /**
   * Hypen 클릭시 해당 영역 <tr> 삭제(화면) , 배열에서 해당 요소 삭제(데이터)
   * @param {*} e 이벤트 객체 
   */
  const delHypen = (e) => {
    e.preventDefault();
    var that = e.target.parentNode.parentNode; // 이벤트가 발생한 태그의 조부모태그
    var key = that.id; // 이벤트가 발생한 태그의 조부모태그
    // console.log(key);
    if(window.confirm("정말 삭제하시겠습니까?")) {
      axios.post()
      .then((response)=>{
        var arrTr = renderDietArr.filter((item) => {
          return item.key != key; // 원본 배열과 일치하지 않는 데이터 배열로 반환
        });
        renderDietArr=arrTr; // let renderDietArr 배열에 삭제된 값으로 초기화(덮어씌움)
        that.remove(); // 이벤트가 발생한 태그의 조부모 제거
      })
      .catch((error)=>{
        return alert("삭제에 실패하였습니다.");
      })
      
    }
  }

  const cancelBtnClick = () => {
    
    var inputGroup = document.getElementById("inputGroup") // 입력창
      if(renderDietArr.length >= 0 && renderDietArr.length < 10){
        inputGroup.setAttribute('style','margin:10px; display:none;');
      }
      var item = document.getElementsByClassName("hyphenIcon");//document.getElementsByClassName("hyphenIcon") ::::>  HTMLCollection 엘리먼트 배열
      for (let i = 0; i < item.length; i++) {//루프로 하나씩 적용한다. HTMLCollection는 forEach 사용 불가.
        item[i].setAttribute('style', "display:none; float:right; text-decoration:none; color:black;")
      }
    
  }
  const modifyButtonClick = () => {
    setBtnMode('modify');
    buttonCrudMatrix();
  }
  const saveButtonClick = () => {
    setBtnMode('save');

    buttonCrudMatrix();
  }

  const buttonCrudMatrix = () => {
    let curruentBtnMode = btnMode;
    console.log(curruentBtnMode)

    // /* 추가 */
    // if(curruentBtnMode == '' || curruentBtnMode == 'save') {
    //   setBtnControlObject({add:true, del:true, cancel:false, modify:true, save: true})
    //  }
    // /* 삭제 */
    // if(curruentBtnMode == '' || curruentBtnMode == 'delete' || curruentBtnMode == 'cancel') {
    //   setBtnControlObject({add:true, del:true, cancel:false, modify:true, save: true})
    //    var inputGroup = document.getElementById("inputGroup"); // 입력창
    //    inputGroup.setAttribute('style','margin:0px; display:inline-block; float:left;');
    // }
    // /* 취소 */
    // if(curruentBtnMode == 'add' || curruentBtnMode == 'delete' || curruentBtnMode == 'cancel') {
    //   setBtnControlObject({add : false, modify : false, del : false, cancel : true, save: true})
    // }
    // /* 수정 */
    // if(curruentBtnMode == '' || curruentBtnMode == 'save') { //초기페이지 [수정]
    //   setBtnControlObject({add : true, modify : true, del : true, cancel : true, save: false})
    // }
    // /* 저장 */
    // if(curruentBtnMode == 'modify') { //[수정]
    //   setBtnControlObject({add : false , modify : false, del : false, cancel : true, save: true})
    // }

  }
  return (
    <>
      <Modal isOpen={context.modalShow1} fade={true} toggle={context.modalToggle1} style={{ width: "700px", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        <ModalHeader toggle={context.modalToggle1}>
            <InputGroup size="sm" style={{width:"400px"}}>
              <div style={{height:"30px", float:"left"}}>
                <span style={{width:"170px",display:"inline-block"}}>
                  {fmtDateKr} 
                </span>
              </div>
              <div style={{display:"inline-block", float:"right", height:"30px", paddingLeft: "0px"}}>
                <select name="" id="" ref={select}onChange={(e)=>{
                  e.preventDefault();
                  let mealDiv = '';
                  console.log(e.target.value);
                  console.log(context.startStr);
                  switch (e.target.value) {
                    case '1' : mealDiv = "아침"
                    console.log("1")
                    break;
                    case '2' : mealDiv = "점심"
                    console.log("2")
                    break;
                    case '3' : mealDiv = "저녁"
                    console.log("3")
                  }
                  console.log(mealDiv);
                  context.dietSearch(mealDiv, context.startStr)
                }} style={{display:"inline", width:"85px", height:"30px", fontSize:"15px", padding:"4px 20px 0px 12px"}}>
                  <option value="1" selected={1==context.dietListArray[0].mealDiv}>아침</option>
                  <option value="2" selected={2==context.dietListArray[0].mealDiv}>점심</option>
                  <option value="3" selected={3==context.dietListArray[0].mealDiv}>저녁</option>
                </select>
              </div>
              <div style={{height:"30px", float:"left"}}>
                <span style={{display:"inline-block"}}>식단</span>
              </div>
            </InputGroup>
        </ModalHeader>
        <ModalBody style={{ height: "600px" }}>
          
          <Form style={{height: "540px"}}>
            <FormGroup>
              <div style={{height:"38px"}}>

              <div id="inputGroup" style={{ margin: "0px", display:"show", float:"left"}}>
                <InputGroup size="s">
                  <Input type="text" onKeyDown={(e)=>{e.preventDefault(); if(e.key == "Enter") {search(); modalToggle2();}}} onChange={initSearchParam} placeholder='레시피를 입력하세요' style={{width:"427px", display: "inline-block"}} />
                  <Button onClick={(e)=>{e.preventDefault(); search(); modalToggle2();}} color="secondary" style={{width:"40px"}}><Search style={{width:"20px", height:"20px",padding : "0 4 4 0"}}/></Button>
                </InputGroup>
              </div>
              
              </div>
              <Table striped>
                <thead>
                  <tr>
                    <th>메뉴명</th>
                    <th>칼로리</th>
                    <th></th>
                  </tr>
                </thead>  
                <tbody id="listTbody">
                  { dietList(dietListArray) }
                </tbody>
              </Table>
            </FormGroup>
          </Form>
          <div style={{float:"right", height:"38px"}}>
            {/* <Button id="addButton" color="secondary" onClick={addBtnClick} disabled={btnControlObject.add}>추가</Button>
            <Button id="deleteButton" color="secondary" onClick={deleteBtnClick} disabled={btnControlObject.del}>삭제</Button>
            <Button id="cancelButton" color="secondary" onClick={cancelBtnClick} disabled={btnControlObject.cancel}>취소</Button> */}
          </div> <br/>
        </ModalBody>
        <ModalFooter>
          <Table striped>
                <thead>
                  <tr>
                    <th>챌린지 참여</th>
                    <th>목표 칼로리</th>
                    <th>칼로리 합계</th>
                    <th>달성 여부</th>
                  </tr>
                </thead>  
                <tbody>
                    {dietKcal(dietListArray)}
                    {/* { 
                      <tr>
                        <td>
                          <Input type="text" id="kcalInput" style={{width:"70px", display:"inline-block"}}
                                 value={dietListArray[0].targetKcal}       disabled={(() => {return true;})()}/>Kcal
                        </td>
                        <td>
                        {kcalTotal}Kcal
                        </td>
                      </tr>} */}
                </tbody>
            </Table><br/><br/>
            <Button id="modifyButton" color="secondary" onClick={modifyButtonClick} disabled={btnControlObject.modify}>수정</Button>
            <Button id="saveButton" color="secondary" onClick={saveButtonClick} disabled={btnControlObject.save}>저장</Button>
        </ModalFooter>
      </Modal>
      {
          <DietModalContext.Provider value={modal2}>
            <DietListModal/>
          </DietModalContext.Provider>
        }
    </>

  )
}