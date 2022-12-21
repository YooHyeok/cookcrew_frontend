import {Component, createContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { Button, Dropdown } from 'reactstrap';
import { Search, PersonCircle } from 'react-bootstrap-icons';

import HeaderDropDownLogin from "./HeaderDropDownLogin";
import HeaderDropDownLogout from "./HeaderDropDownLogout";

export const HeaderDropDownContext = createContext();
export default function Header() {
    const style = {
        background : "linear-gradient( 45deg, white, #ff4500 )",
        backgroundColor:'#ff4500',
        width:'100%',
        position:'fixed',
        left:0,
        top:0,
        zIndex:10,
    }

    const linkStyle = {
        fontSize:"14px"
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
        dropdownOpenLogin : dropdownOpenLogin,
        dropdownOpenLogOut : dropdownOpenLogOut,
        toggleLogin : toggleLogin.bind(this),
        toggleLogOut : toggleLogOut.bind(this)
    }

    
    return(
        <div style={style}>
            <ul className="nav-items1" >
                <li className="nav-item">
                    <Link style={linkStyle} to={'/'} id="logo">Cook<b>Crew</b><img width={30} src={require('../../resources/img/pingpong.png')} alt=''/></Link>
                </li>
            </ul>
            <ul className="nav-items2">
                <li className="nav-item">
                    <Link style={linkStyle} to={'/dietScheduler'}><b>식단표 관리</b></Link>
                </li>
                <li className="nav-item">
                    <Link style={linkStyle} to={'/allrecipe'}><b>전체 레시피</b></Link>
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
                            {/*토큰처리 조건식*/<HeaderDropDownLogin />}
                    </li>
                    <li className="nav-item-dropdown">
                            {/*토큰처리 조건식*/<HeaderDropDownLogout />}
                    </li>
                </HeaderDropDownContext.Provider>
            </ul>
        </div>    
    )
}

