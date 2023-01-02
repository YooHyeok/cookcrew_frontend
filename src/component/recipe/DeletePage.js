import { Button } from "reactstrap";

export default function DeletePage() {
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

      return(
        <div style={divStyle}>
            <center>
                <img src={require('../../resources/img/cookcrew3-png.png')} style={{width:'800px'}}/>
            <tr> <h2>삭제된 레시피 입니다.</h2></tr><br/><br/> 
            <tr><Button>이전으로</Button></tr>
            </center>
        </div>
      )
}