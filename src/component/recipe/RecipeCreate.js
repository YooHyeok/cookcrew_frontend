import '@toast-ui/editor/dist/toastui-editor.css';
import { useState, createContext } from 'react';
import axios from 'axios';
import Toasteditor from './ToastEditor';
import "./Recipe.css";
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.

export const Toast = createContext();



export default function RecipeCreate() {
    const [rcps, setRcps] = useState({ title: '', regId: '',sTitle: '', mat: '', source: '', kcal:''  })
    const [toastHtml, setToastHtml] = useState('');
    const [toastMarkdown, setMarkdown] = useState('');
    const [files, setFiles] = useState({});
    const userId = useSelector( (state) => {return state.UserId} );
console.log(userId);

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
        setFiles({ file: e.target.files[0] })
    }

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', rcps.title);
        formData.append('userId', userId);
        formData.append('toastHtml', toastHtml);
        formData.append('toastMarkdown', toastMarkdown);
        formData.append('file', files.file);
        formData.append('sTitle', rcps.sTitle);
        formData.append('mat', rcps.mat);
        formData.append('source', rcps.source);
        formData.append('kcal', rcps.kcal);
        // console.log(formData.data)

        axios.post('/rcpreg', formData)
            .then((response) => {
                console.log(response.data);
                alert(response.data);
                document.location.href="/recipepage"
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
                    <h2>레시피 작성</h2>
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
                                    <div class="input-group input-group -lg">
                                        {/* 핵심재료 입력란 */}
                                        <span class="input-group-text" id='mat' for='mat' style={{ width: '112px' }}>핵심 재료</span>
                                        <input type="text" name='mat' class="form-control" id='mat' value={rcps.mat} onChange={change}
                                         aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"  />
                                    </div>
                                </tr>
                                <br/>
                                <div>
                                    <tr>                             
                                    <div class="input-group input-group -lg" float="left" style={{width:'750px' ,float:'left'}}>
                                        {/* 양념 입력란 */}
                                        <span class="input-group-text" id='source' for='source' style={{ width: '112px' }}>양념</span>
                                        <input type="text" name='source' class="form-control" id='source' value={rcps.source} onChange={change}
                                         aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                                    </div>
                                    <div class="input-group input-group -lg" style={{width:'250px' ,float:'right'}}>
                                        {/* kcal입력란 */}
                                        <span class="input-group-text" id='kcal' for='kcal' style={{ width: '112px' }}>kcal</span>
                                        <input type="text" name='kcal' class="form-control" id='kcal' value={rcps.kcal} onChange={change}
                                         aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                                    </div>
                                    </tr>  
                                </div>
                                <br/>
                                <tr>
                                    <div class="input-group input-group -lg" >
                                        {/* 부제목 입력란 */}
                                        <span class="input-group-text" id='sTitle' for='sTitle' style={{ width: '112px' }}>간략한 설명</span>
                                        <textarea class="form-control" name='sTitle' id="sTitle" style={{height:"38px"}} value={rcps.sTitle} onChange={change} />
                                    </div>
                                </tr>
                                <br/>
                                <tr>
                                    <div>
                                    {/* <span class="input-group-text" style={{width:'112px'}}>내용</span> */}
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
                    <input type='reset' className="btn btn-outline-danger" value='다시쓰기' />&nbsp;&nbsp;                  
                    <button type="button" className="btn btn-outline-dark" onClick={submit}>등록</button>
                </section>
                <br /><br />
            </div>
        </Toast.Provider>
    )

}