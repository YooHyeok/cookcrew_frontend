
import {
  Form, FormGroup, InputGroup, Input, Button
  , Modal, ModalHeader, ModalBody, ModalFooter, Table, Fade
} from 'reactstrap';
import { useState, useContext } from 'react';
import { UserContext } from './DietMenu';
import DietListModal from './DietListModal';

export default function DietModal() {
  // DietMenu Context 연동
  const context = useContext(UserContext);

  // 모달2 전역변수
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show)
  }
  // context로 넘길 객체 생성.
  const modal2 = {
    show: show
    , setShow: setShow.bind(this)
    , toggle: toggle.bind(this)
  }

  const hipenElAppend = () => { //수정 버튼 클릭시 -버튼 추가
    //document.getElementsByClassName("hyphenIcon") :::: HTMLCollection 엘리먼트 배열
    //루프로 하나씩 적용한다. HTMLCollection는 forEach 사용 불가.
    for (let i = 0; i < document.getElementsByClassName("hyphenIcon").length; i++) {
      document.getElementsByClassName("hyphenIcon")[i].setAttribute('style', "display:content; float:right")
    }
  }
  const delHypen = (e) => {
    console.log(e);
  }
  return (
    <>
    <Modal isOpen={context.show} toggle={context.toggle} style={{ width: "700px", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
      <ModalHeader toggle={context.toggle}>&nbsp; 2022년 12월 14일 식단</ModalHeader>
      <ModalBody style={{ height: "700px" }}>
        <Form >
          <FormGroup>
            <div style={{ margin: "10px" }}>
              <InputGroup size="sm">
                <select name="" id="" style={{ height: "29px" }}>
                  <option value="" defaultValue>아침</option>
                  <option value="">점심</option>
                  <option value="">저녁</option>
                </select>
                <Input type="text" placeholder='AutoComplete' style={{ display: "inline-block", width: "300px" }} />
              </InputGroup>
            </div>
            <Table striped>
              <thead>
                <tr>
                  <th>메뉴명</th>
                  <th>칼로리</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a href="#">레시피 1 예시입니다</a>
                  </td>
                  <td>
                    ____Kcal
                  </td>
                  <td>
                    <a href="http://localhost/dietmenu" className="hyphenIcon" style={{ display: "none" }} onClick={(e) => { delHypen(e); }}>(-)</a>
                  </td>
                </tr>

              </tbody>
            </Table>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
    <Button onClick={toggle}>모달 2 임시 버튼</Button>
        <Button color="primary" onClick={() => { hipenElAppend(); }}>수정</Button>{' '}
        <Button color="primary" onClick={() => { alert('저장이 완료되었습니다.'); context.toggle(); }}>저장</Button>
      </ModalFooter>
    </Modal>
    {
      show &&
      <UserContext.Provider value={modal2}>
        <DietListModal/>
      </UserContext.Provider>

    }
    </>

  )
}