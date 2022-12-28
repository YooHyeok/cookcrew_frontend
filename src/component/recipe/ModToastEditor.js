import { useEffect ,useRef, useContext } from "react";
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Toastmod } from './RecipeMod'
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function ModToastEditor() {
    const context = useContext(Toastmod);
    
    const {rNo} = useParams();

  const editorRef = useRef();

  useEffect(()=> {
    axios.get(`/getToast/${rNo}`)
    .then((response)=> {
      
      const res = response.data;
      console.log(res);
      const htmlString = res.content;
      console.log(htmlString);
    //   setShow(true);
    editorRef.current?.getInstance().setHTML(htmlString);
    })
    .catch((error) => {
      console.log(error);
    })
    
  },[])
 
  
  const onChange = () => {
    context.setToastHtml(editorRef.current?.getInstance().getHTML());
    context.setMarkdown(editorRef.current?.getInstance().getMarkdown());
  };

  return(
    <div id="editor_margin" style={{heigt:"600px", textAlign:"left"}} >
    
    <Editor
      ref={editorRef} // DOM 선택용 useRef
      placeholder="내용을 입력해주세요."
      previewStyle="vertical" // 미리보기 스타일 지정
      height="600px" // 에디터 창 높이
      initialEditType="wysiwyg" //
      toolbarItems={[
        // 툴바 옵션 설정
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock']
      ]}
      style={{textAlign:"left"}}
      onChange={onChange}
      useCommandShortcut={false} // 키보드 입력 컨트롤 방지
    ></Editor>
  </div>
  );
}