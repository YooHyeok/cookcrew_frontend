import {Link} from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef } from 'react';




export default function RecipeWrite() {

    const editorRef = useRef();
  
    // 등록 버튼 핸들러
    const handleRegisterButton = () => {
    // 입력창에 입력한 내용을 HTML 태그 형태로 취득
    console.log(editorRef.current?.getInstance().getHTML());
    // 입력창에 입력한 내용을 MarkDown 형태로 취득
    console.log(editorRef.current?.getInstance().getMarkdown());
    };

    const divStyle = {
        width:'1000px'
    , height: '700px'
    , textAlign: 'left'
    , margin: '100px auto'
    , border: '0.5px solid gray'
    , padding: '30px'
    , borderRadius: '20px'
    };


    return(
        <div style={divStyle}>
                <h2>마이 레시피 등록</h2><br/>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <span className="input-group-text" style={{display:'inline-block', width:'60px'}}>메뉴</span><input type="text" style={{width:'870px', float:'right'}} className="form-control" id="" name="menu" placeholder="메뉴" required=""/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Editor ref={editorRef} initialValue="hello react editor world!" previewStyle="vertical" height="450px" initialEditType="WYSIWYG" useCommandShortcut={true} />
                                </td>
                            </tr>
                            <tr>
                                <td>

                                <span className="input-group-text" style={{display:'inline-block', width:'75px'}}>썸네일</span>&nbsp;
                                <input type='file' className="form-control" name="file" id="board_file" onChange={null} accept="image/*" style={{display:'inline-block', width:'75px', width: '300px', backgroundColor: 'white'}}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{display:'inline-block', float:'right'}}>
                        <button  type="button" className="btn btn-outline-secondary" onClick={() => {handleRegisterButton(); /* document.location.href='/myrecipe'; */}}>저장</button>&nbsp;
                        <button  type="button" className="btn btn-outline-secondary" onClick={()=> {document.location.href="javascript:history.back();"}}>취소</button>
                    </div>
                </form>
            </div>
    
    );
}
