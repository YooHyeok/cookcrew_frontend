import { Component, createContext, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
// import { Button, Dropdown } from 'reactstrap';
// import { Search, PersonCircle } from 'react-bootstrap-icons';

import HeaderDropDownLogin from "./HeaderDropDownLogin";
import HeaderDropDownLogout from "./HeaderDropDownLogout";

import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.


export const HeaderDropDownContext = createContext();
export default function Header() {
    const style = {
        // background: "linear-gradient( 45deg, white, #ff4500 )",
        backgroundColor: '#B0D6FF',
        borderBottom: "0.5px solid lightgray",
        width: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000
    }

    const linkStyle = {
        fontSize: "14px"
    }

    const [dropdownOpenLogin, setDropdownOpenLogin] = useState(false);
    const [dropdownOpenLogOut, setDropdownOpenLogOut] = useState(false);

    const toggleLogin = () => {
        setDropdownOpenLogin(!dropdownOpenLogin);
    }
    const toggleLogOut = () => {
        setDropdownOpenLogOut(!dropdownOpenLogOut);
    }

    const contextValue = {
        dropdownOpenLogin: dropdownOpenLogin,
        dropdownOpenLogOut: dropdownOpenLogOut,
        toggleLogin: toggleLogin.bind(this),
        toggleLogOut: toggleLogOut.bind(this)
    }

    const token = useSelector( state=> state.Authorization );
    const userId = useSelector( (state) => {return state.UserId} );
    
    const dietLogin = () => {
        console.log("메롱", token , userId)
        if(token == '' || userId == '') {
            alert('로그인이 필요한 페이지입니다. \n 로그인 페이지로 이동합니다.');
            document.location.href = '/login';
            return;
        }
        if(token != '' && userId != '') {
            document.location.href ='/dietScheduler';
            return;
        }
    }

    return (
            <div style={style}>
                <ul className="nav-items-1 " >
                    <li className="nav-item">
                        {/* <Link style={linkStyle} to={'/'} id="logo"><b>C</b>ook<b>Crew</b><img src={require('../../resources/img/pingpong.png')} alt='' /></Link> */}
                        <Link style={linkStyle} to={'/'} id="logo"><img className="inline" style={{width:"160px", marginTop:"-20px"}} src={require('../../resources/img/logo/cookcrew.png')} alt='' /></Link>
                    </li>
                </ul>
                <ul className="nav-items2">
                    <li className="nav-item">
                        <Link style={linkStyle} onClick={(e) => { e.preventDefault(); dietLogin();}}><b>식단표 관리</b></Link>
                    </li>
                    <li className="nav-item">
                        <Link style={linkStyle} to={'/recipelist'}><b>전체 레시피</b></Link>
                    </li>
                    <li className="nav-item">
                        <Link style={linkStyle} to={'/popRecipe'}><b>인기 레시피</b></Link>
                    </li>
                    <li className="nav-item">
                        <Link style={linkStyle} to={'/bestChef'}><b>베스트 쉐프</b></Link>
                    </li>
                    <li className="nav-item">
                        <Link style={linkStyle} to={'/challengeRank'}><b>챌린지 랭킹</b></Link>
                    </li>
                </ul>
                <ul className="nav-items3">
                    <HeaderDropDownContext.Provider value={contextValue}>
                        <li className="nav-item-dropdown">
                            {token == '' && <HeaderDropDownLogin />}
                            {userId != '' && <HeaderDropDownLogout />}
                        </li>
                    </HeaderDropDownContext.Provider>
                </ul>
            </div>
    )
}

