import { Link } from 'react-router-dom';

export default function Footer() {
    const style = {
<<<<<<< HEAD
        height: "140px",
        marginTop: "auto",
        backgroundColor: "#dde0ea"
=======
        backgroundColor:"#dde0ea",
        width:'100%',
        height:"180px",
        marginTop:"auto",
>>>>>>> 38d65d09c3003e86397aae8af086da1a063aa3d2
    }
    return (
        <div style={style}>
            <ul style={{ height: "140px" }} className="footer-items" >
                <li className="footer-item">
<<<<<<< HEAD
                    <Link to={'/'} id="logo">Cook<b>Crew</b><img width={30} src={require('../../resources/img/A_test.png')} alt='' /></Link>
=======
                    {/* <Link to={'/'} id="logo">Cook<b>Crew</b><img width={30} src={require('../../resources/img/pingpong.png')} alt=''/></Link> */}
                    <Link to={'/'} id="logo">Cook<b>Crew</b><img width={30} src={require('../../resources/img/A_test.png')} alt=''/></Link>
>>>>>>> 38d65d09c3003e86397aae8af086da1a063aa3d2
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