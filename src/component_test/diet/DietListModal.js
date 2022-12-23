
import {
  Form, FormGroup, InputGroup, Input, Button
  , Modal, ModalHeader, ModalBody, ModalFooter, Table, Fade
} from 'reactstrap';
import { useContext } from 'react';
import { UserContext } from './DietMenu';
import { hasBgRendering } from '@fullcalendar/react';



export default function DietModal() {
  // DietModal Context 연동
  const context = useContext(UserContext);
  const listRender = () => {
    console.log("접근접근")
    var arr = [];
    for(let i=0; i<10; i++) {
      arr.push(
        <tr key={i}>
          <td>
            xexe
          </td>
          <td>
            <a href="#" onClick={() => { context.toggle(); }}>레시피 1 예시입니다</a>
          </td>
          <td>
            365Kcal
          </td>
          <td>
            365
          </td>
          <td>
            4.7
          </td>
          <td>
            11
          </td>
        </tr>
      )
    }
    console.log(arr)
    return arr;
  }
  return (
    <>
    <Modal isOpen={context.show} toggle={context.toggle} style={{ width: "700px", position: "fixed", top: "50%", left: "80%", transform: "translate(-50%,-50%)" }}>
      <ModalHeader toggle={context.toggle}>&nbsp; ________ 검색 결과</ModalHeader>
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
        <Button color="primary" onClick={() => { context.toggle(); }}>완료</Button>
      </ModalFooter>
    </Modal>
    </>
  )
}