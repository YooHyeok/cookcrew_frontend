import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Label } from 'reactstrap';
import { useEffect, useRef, useState, createContext } from 'react';
import axios from 'axios';
import Toasteditor from './ToastEditor';
import "./Recipe.css";
import { Button } from 'bootstrap';

//현재 레시피 등록과 코드가 완전히 같음. 추 후에 데이터베이스에 저장되어있던 정보를 기본값으로 뿌려주도록 변경할 예정.

export const Toast = createContext();

export default function RecipeMod() {

    const [rcps, setRcps] = useState({ title: '', regId: '',sTitle: '', mat: '', source: '' })
    const [toastHtml, setToastHtml] = useState('');
    const [toastMarkdown, setMarkdown] = useState('');
    const [files, setFiles] = useState({});
    

    const context = {
        setToastHtml: setToastHtml.bind(this),
        setMarkdown: setMarkdown.bind(this)
    }

    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        // console.log("키 : ", name)
        // console.log("값 : ", value)
        setRcps({ ...rcps, [name]: value })
    }

    const fileChange = (e) => {
        setFiles({ file: e.target.file[0] })
    }

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', rcps.title);
        formData.append('reg_id', rcps.regId);
        formData.append('toastHtml', toastHtml);
        formData.append('toastMarkdown', toastMarkdown);
        formData.append('file', files.file);
        formData.append('sTitle', rcps.sTitle);
        formData.append('mat', rcps.mat);
        formData.append('source', rcps.source);


        axios.post('http://localhost:8090/rcpreg', formData)
            .then((response) => {
                console.log(response.data);
                alert(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <Toast.Provider value={context} >
            <div>
                <br />
                <div>
                    <h2>레시피 수정</h2>
                    <div>
                        <br />
                        <form>
                            <table id='create_table'>
                                {/* 제목, 부제목, 필수재료, 소스 입력 테이블 */}
                                <tr>
                                    <div id='margin' class="input-group input-group -lg">
                                        <span class="input-group-text" id="title" for='title' style={{ width: '112px' }}>제목</span>
                                        <input type="text" name='title' class="form-control" value={rcps.title} onChange={change} id='title'
                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                                    </div>
                                </tr>
                                <br/>
                                <tr>
                                    <div class="input-group input-group -lg" >
                                        {/* 부제목 입력란 */}
                                        <span class="input-group-text" id='sTitle' for='sTitle' style={{ width: '112px' }}>간략한 설명</span>
                                        <textarea class="form-control" name='sTitle' id="sTitle" value={rcps.sTitle} onChange={change} />
                                    </div>
                                </tr>
                                <br/>
                                <tr>
                                    <div class="input-group input-group -lg">
                                        {/* 핵심재료 입력란 */}
                                        <span class="input-group-text" id='mat' for='mat' style={{ width: '112px' }}>핵심 재료</span>
                                        <input type="text" name='mat' class="form-control" id='mat' value={rcps.mat} onChange={change}
                                         aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"  />
                                    </div>
                                </tr>
                                <br/>
                                <tr>
                                    <div class="input-group input-group -lg">
                                        {/* 양념 입력란 */}
                                        <span class="input-group-text" id='source' for='source' style={{ width: '112px' }}>양념</span>
                                        <input type="text" name='source' class="form-control" id='source' value={rcps.source} onChange={change}
                                         aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                                    </div>
                                </tr>
                                <br/>
                                <tr>
                                    <div>
                                    <span class="input-group-text" style={{width:'112px'}}>내용</span>
                                        <center>
                                            <Toasteditor />
                                        </center>
                                    </div>
                                </tr>
                                <tr>
                                    <div class="input-group mb-3" style={{ width: '350px' }}>
                                        <label class="input-group-text" for="'board_file">썸네일</label>
                                        <input type="file" class="form-control" name='file' id='board_file' accept='image/*'
                                            onChange={fileChange} />
                                    </div>
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
                <section>
                    <input type='reset' className="btn btn-outline-danger" value='돌아가기' />&nbsp;&nbsp;
                    <button type="button" className="btn btn-outline-dark" onClick={submit}>저장</button>
                </section>
                <br /><br />
            </div>
        </Toast.Provider>
    )
}