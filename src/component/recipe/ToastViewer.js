import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ToastViewer() {
  const [content, setcontent] = useState('');
  const [show, setShow] = useState(false);

  const {rNo} = useParams();

  useEffect(()=> {
    axios.get(`/getToast/${rNo}`)
    .then((response)=> {
      // console.log(response.data);
      const rcp = response.data;
      // console.log(rcp);
      setcontent(rcp.content)
      setShow(true);
    })
    .catch((error) => {
      console.log(error);
    })
  },[])
  // console.log(content); 여기까진 잘 찍힘
    // 마크다운
    const markdown = '';
  
    // HTML: span태그 글자색을 파란색으로 설정
 
  
    return (
      <div>
        {/* <Viewer initialValue={markdown}/> */}

        {show && <Viewer initialValue={content} />}
      </div>
    );
  }