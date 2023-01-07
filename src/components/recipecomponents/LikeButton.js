import { DoDisturb, PropaneSharp } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.
import axios from 'axios';



const LikeButton = (
  props) => {
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const userId = useSelector((state) => { return state.UserId });
  // console.log(userId);
  const rno = props.rno;
  console.log(props);

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('rno', rno);
    formData.append('userId', userId);
    console.log(formData.data)

    axios.post('/like', formData)
      .then((response) => {
        console.log(response.data);
        if(response.data == "찜 목록에 추가")
          alert("찜목록에 반영되었습니다.");
          if(props.LikeButton == "likeList")
            props.method.serverRequest(1);
      })
      .catch((error) => {
        console.log(error);
      })
    setIsLiked(!isLiked);

  }

  return (
    <button display='inline'
      className={`w-8 h-9`}
      onClick={submit}
    >
      <svg
        className="w-8 h-8 ml-4 inline items-end">
        <path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke={isLiked ? "#ef4444" : "currentColor"}
          fill={isLiked ? "#ef4444" : "none"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default LikeButton;