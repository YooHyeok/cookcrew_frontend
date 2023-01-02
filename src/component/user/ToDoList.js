import { useState } from "react"
import { Button, Form } from "reactstrap";
import { Link } from 'react-router-dom';


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

    // let [i, SetI] = useState(1)
    // const num_array = () => {
    //     for i in range(SetToDos.length)
    // }

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

            <Form onSubmit={submit}>
                <input vlaue={toDo} onChange={writetodo} type="text" placeholder="Write your to do..." />
                <Button outline color="primary"> Add To do </Button>
            </Form>
            <div className="list_array">
                <ul >
                    {toDos.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}