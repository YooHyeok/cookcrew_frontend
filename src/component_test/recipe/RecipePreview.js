import {Link} from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';


/* 레시피 미리보기
    레시피 등록후 저장 전에 미리보기를 할 수 있음.
*/
export default function RecipePreview() {
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
                <h2>레시피 내용</h2><br/>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <span className="input-group-text" style={{display:'inline-block', width:'60px'}}>메뉴</span><text style={{width:'870px', height:'38px',float:'right'}} className="form-control" id="" name="menu" placeholder="메뉴"  readOnly></text>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {/* <text className="form-control" style={{height : '200px'}}></td>1:1 질문 테스트 내용입니다 답변주세요.</text> */}
                                    <text className="form-control" style={{height:'480px'} }></text>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{display:'inline-block', float:'right', paddingTop:'20px'}}>
                        <button  type="button" className="btn btn-outline-secondary" onClick={() => {document.location.href='/recipemodify';}}>수정</button>&nbsp;
                        <button  type="button" className="btn btn-outline-secondary" onClick={()=> {document.location.href="javascript:history.back();"}}>삭제</button>
                    </div>
                </form>
            </div>
    
    );
}
