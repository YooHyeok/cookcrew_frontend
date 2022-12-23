
import {
  Form, FormGroup, InputGroup, Input, Button
  , Modal, ModalHeader, ModalBody, ModalFooter, Table, Fade
} from 'reactstrap';
import { useContext, useEffect } from 'react';
import { DietModalContext } from './DietModal';
import { hasBgRendering } from '@fullcalendar/react';
import './ModalCommon.css';

import {useSelector, useDispatch} from 'react-redux'; // useSelector : 특정 변수의 값을 가져온다. 함수를 인자값으로 넣어야함. / useDispatch : reduce() 함수를 호출


export default function DietListModal() {

  // DietModal Context 연동
  const context = useContext(DietModalContext);

  const renderArr = [];
  // const recipeArr = context.recipeArr;
  const recipeArr = useSelector((state)=>{return state.recipeArr})

  const selectRecipeData = context.selectRecipeData;
  const listRender = () => {
    let searchData = context.searchData;
    // console.log(searchData[0])
    // let arr = [];
    for(let i=0; i<searchData.length; i++) {
      renderArr.push(
        <tr key={searchData[i].rno} id={i}>
          <td>
            {searchData[i].regId}
          </td>{/* context.setSelectRecipeData(e.target.value); */}
          <td>
            <a style={{textDecoration: "none", color : "black"}}
                onClick={(e) => {
                  e.preventDefault();
                  console.log("searchData[i] : ",searchData[i]);
                  recipeArr.push(searchData[i]);
                  // recipeArr[recipeArr.length] = searchData[i]; //배열에 요소 추가
                  context.modalToggle2(); //부모 modalShow2 값 변경 -> isOpen = false
            }}>{searchData[i].title}</a>
          </td>
          <td>
            {searchData[i].kcal}
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
    <Modal isOpen={context.modalShow2} fade={true} toggle={context.modalToggle2} style={{ width: "700px", position: "fixed", top: "50%", left: "80%", transform: "translate(-50%,-50%)" }}>
      <ModalHeader toggle={context.modalToggle2}>
      <div>
        <div style={{display:"inline-block"}}>
          <span>"{context.searchParam}" 검색 결과</span>
        </div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
        <div style={{display:"inline-block",float:"right"}}>
          <span>{context.searchData.length} 개</span>
        </div> 
      </div>
      </ModalHeader>
      <ModalBody style={{ height: "700px" }}>
        <Form >
          <FormGroup>
            <Table striped>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>메뉴명</th>
                  <th>칼로리</th>
                  <th>조회수</th>
                  <th>별점</th>
                  <th>좋아요</th>
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
        <Button color="primary" onClick={(e) => {e.preventDefault(); context.modalToggle2(); }}>완료</Button>
      </ModalFooter>
    </Modal>
    </>
  )
}