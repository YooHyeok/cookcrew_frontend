import { Link } from 'react-router-dom';

export default function Footer() {
    const style = {
        height:"165px",
        marginTop:"auto",
        backgroundColor:"#dde0ea",
        textAlign : "left"
    }
    return(
        <div style={style} >
            {/* <ul style = {{height:"140px"}} className="footer-items " >
                <li className="footer-item inline my-4 mx-4">
                    <Link to={'/'} id="logo"><img className='inline w-32' src={require('../../resources/img/logo/cookcrew.png')} alt=''/></Link>
                </li>
                <li className="footer-item">
                    <Link to={'/myrecipe'}>나의 레시피</Link>
                </li>
                <li className="footer-item">
                    <Link to={'/recipelist'}>전체 레시피</Link>
                </li>
                <li className="footer-item">
                    <Link to={'/dietmenu'}>다이어트 식단표</Link>
                </li>
            </ul> */}
            {/* <Link style={{margin :" 0 auto",float:"right"}} to={'/'} id="logo"><img className='inline w-32' src={require('../../resources/img/logo/cookcrew.png')} alt=''/></Link> */}

            <span style={{padding:"20px 20px 20px 350px",float:"left", textAlign : "left"}}>
            유재혁 : 깃 webdevyoo@gmail.com<br/>
            박지혜 : 깃 my_archiver@naver.com<br/>
            조현빈 : 깃 webdp1503@gmail.com<br/>
            이규희 : 깃 devindeed92@gmail.com<br/>
            Copyright© By 2023. CookCrew All Rights Reserved.
            </span>
            <span style={{padding:"20px 350px 20px 20px", float:"right", textAlign : "left"}}>
                <Link><h5>ABOUT US</h5></Link>
                <Link><h5>NOTICE</h5></Link>
                <Link><h5>ORDER</h5></Link>
            </span>
        </div>
    )
}