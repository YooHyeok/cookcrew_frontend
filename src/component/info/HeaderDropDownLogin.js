import {useContext} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {HeaderDropDownContext} from "./Header";
import { Search, PersonCircle } from 'react-bootstrap-icons';

export default function HeaderDropDownLogin(){

    const context = useContext(HeaderDropDownContext);

    return (
      <Dropdown isOpen={context.dropdownOpenLogin} fade="true" toggle={context.toggleLogin}>
        <DropdownToggle caret style={{backgroundColor:"rgb(0,0,0,0)", border:"none"}}>
            <PersonCircle size={30}/>
        </DropdownToggle>
        <DropdownMenu >
          <DropdownItem style={{lineHeight: "25px"}} header>Header</DropdownItem>
          <DropdownItem style={{lineHeight: "25px"}} disabled>Action</DropdownItem>
          <DropdownItem style={{lineHeight: "25px"}}><Link to={'/#'}><b>로그인</b></Link></DropdownItem>
          <DropdownItem style={{lineHeight: "25px"}} divider />
          <DropdownItem style={{lineHeight: "25px"}}><Link to={'/#'}><b>회원가입</b></Link></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
}