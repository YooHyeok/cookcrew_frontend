import * as React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function MyRecipe() {
    const divStyle = {
        width: '1200px' //캘린더 width 조절을 위해 부모태그에 설정한다.
        , height: '100%'
        , textAlign: 'left'
        , margin: '100px auto'
        , marginBottom: '40px'
        , border: '0.5px solid gray'
        , padding: '30px'
        , borderRadius: '20px'
        , top: '100'
    };

    const userId = useSelector((state) => { return state.UserId });
    console.log(userId);
    React.useEffect(() => {
        axios.get(`/myrecipe/${userId}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div style={divStyle}>

        </div>
    );
}

