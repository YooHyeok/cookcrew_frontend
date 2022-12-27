import {Link} from 'react-router-dom';

export default function Footer() {
    const style = {
        height:"160px",
        marginTop:"auto",
        backgroundColor:"#dde0ea"
    }
    return(
    <div style={style}>
            <ul style = {{height:"140px"}} className="footer-items " >
                <li className="footer-item">
                    {/* 로고 영역 */}
                    {/* <Link to={'/'} id="logo">Cook<b>Crew</b><img width={30} src={require('../../resources/img/A_test.png')} alt=''/></Link> */}
                </li>
                <li className="footer-item">
                    <Link to={'/myrecipe'}>나의 레시피</Link>
                </li>
                <li className="footer-item">
                    <Link to={'/allrecipe'}>전체 레시피</Link>
                </li>
                <li className="footer-item">
                    <Link to={'/dietmenu'}>다이어트 식단표</Link>
                </li>
            </ul>
        </div>    
    )
}