import axios from "axios";
import { useState } from "react";
import { Button } from "reactstrap";

export default function MyPage() {
    const [info, setInfo] = useState({});

    return (
        <>
            <h1>My Page</h1>
            <div className="screen-wrap">
                <div className="screen-header">
                    <span> 내 정보 </span>
                    <span> 다이어트 캘린더 </span>
                    <span> 나의 레시피 </span>
                    <span> 나의 구독 </span>
                </div>
            </div>
            <hr />
        </>
    )
}