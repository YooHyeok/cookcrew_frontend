import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Label } from 'reactstrap';
import { useEffect, useRef, useState, createContext } from 'react';
import axios from 'axios';
import "./Recipe.css";
import { Button } from 'bootstrap';
import { useParams } from 'react-router-dom';
import ModToastEditor from './ModToastEditor';

export const Toastmod = createContext();

export default function RecipeMod() {
    const {rNo} = useParams();
    const [rcps, setRcps] = useState({ rno: rNo, title: '', regId: '',stitle: '', mat: '', source: '', regDate:'', modDate:'',kcal:'', rating:0, thumbPath:'', cnt:0})
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
        console.log(e.target.files[0])
        setFiles({ file: e.target.files[0] })
    }

    useEffect(()=> {
        axios.get(`/rcpref/${rNo}`)
        .then((response)=> {
            console.log(response.data);
            setRcps(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[])

    const submit = (e) => {
        e.preventDefault();
        console.log(files.file);
        const formData = new FormData();
        formData.append('file', files.file);
        formData.append('rno', rNo);
        formData.append('regId', rcps.regId);
        formData.append('title', rcps.title);
        formData.append('content', toastHtml);
        //formData.append('toastMarkdown', toastMarkdown);
        formData.append('stitle', rcps.stitle);
        formData.append('mat', rcps.mat);
        formData.append('regDate', rcps.regDate);
        formData.append('modDate', rcps.modDate);
        formData.append('source', rcps.source);
        formData.append('kcal', rcps.kcal);
        formData.append('thumbPath', rcps.thumbPath);
        //formData.append('rating', rcps.rating);
        formData.append('cnt', rcps.cnt);
        console.log(formData);

        axios.post('/rcpmodreg', formData)
            .then((response) => {
                console.log(response.data);
                alert(response.data);
                document.location.href=`/reciperef/${rNo}`
                
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <Toastmod.Provider value={context} >
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
                                        <span class="input-group-text" id='stitle' for='stitle' style={{ width: '112px' }}>간략한 설명</span>
                                        <textarea class="form-control" name='stitle' id="stitle" value={rcps.stitle} onChange={change} />
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
                                    <div>
                                    <span class="input-group-text" style={{width:'112px'}}>내용</span>
                                        <center>
                                            <ModToastEditor />
                                        </center>
                                    </div>
                                </tr>
                                <tr>
                                    <div class="input-group mb-3" style={{ width: '350px' }}>
                                        <label class="input-group-text" for="file">썸네일</label>
                                        <input type="file" class="form-control" name='file' id='file' accept='image/*'
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
        </Toastmod.Provider>
    )
}