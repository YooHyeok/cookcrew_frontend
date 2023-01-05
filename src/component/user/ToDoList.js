import { useState } from "react"
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button, Col, Navigate } from 'reactstrap';


export default function ToDoList() {
    const divStyle = {
        width: '1200px'
        , height: '780px'
        , textAlign: 'center'
        , margin: '100px auto'
        , marginBottom: '20px'
        , padding: '30px'
        , top: '100'
    };

    const [toDo, SetToDo] = useState("");
    const [toDos, SetToDos] = useState([]);

    const writetodo = (item) => {
        SetToDo(item.target.value);
    };
    console.log(toDos);
    const submit = (e) => {
        e.preventDefault();
        if (toDo === "") {
            return;
        }
        SetToDos((currentArray) => [...currentArray, toDo]);
        SetToDo("");
    };



    // const handleOnKeyDown = (e) => {
    //     if (e.key === "Enter") {
    //         e.preventDefault(); //Enter 입력이 되면 클릭 이벤트 실행
    //     }
    // };

    return (
        <div style={divStyle} >
            <div><h1><b>  My To Dos ({toDos.length}) </b></h1></div><br />
            <div className="screen-wrap">
                <div className="screen-header">
                    <Link to={"/mypage"}><span> 내 정보 </span></Link>
                    <Link to={"/"}><span> 나의 레시피 </span></Link>
                    <Link to={"/"}><span> 나의 찜목록 </span></Link>
                    <Link to={"/"}><span> 나의 랭킹 </span></Link>
                    <Link to={"/todolist"}><span> 나의 To Do List </span></Link>
                </div>
            </div>
            <hr />

            <div style={{
                width: '1000px'
                , height: '1000px'
                , margin: '0px auto'
                , padding: '30px 30px 30px 30px'

            }}>
                <Form>
                    <div className="todo-wrap">
                        <FormGroup row >
                            <Col sm={10}>
                                <Input vlaue={toDo} onChange={writetodo} type="text" placeholder="Write your to do..." />
                            </Col>
                            <Col sm={2} className="add_btn">
                                <Button outline color="primary" > <b>Add To do</b> </Button>
                            </Col>
                        </FormGroup>
                    </div>
                </Form>
                <div >
                    <ul className="list_array">
                        {toDos.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    );
}