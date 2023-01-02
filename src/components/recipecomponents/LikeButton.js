import React, {useState} from "react";


const LikeButton = ({
  liked = false,
  className="",}) => {
    const [isLiked, setIsLiked] = useState(liked);
    
    return (
        <button display='inline'
        className={`w-8 h-9`}
        onClick={() => setIsLiked(!isLiked)}
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