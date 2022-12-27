import {useContext} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {HeaderDropDownContext} from "./Header";
import { Search, PersonCircle } from 'react-bootstrap-icons';

export default function HeaderDropDownLogout(){

    const context = useContext(HeaderDropDownContext);

    return (
      <Dropdown isOpen={context.dropdownOpenLogOut} fade="true" toggle={context.toggleLogOut}>
        <DropdownToggle caret style={{backgroundColor:"rgb(0,0,0,0)", border:"none"}}>
            <PersonCircle size={30}/>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem style={{lineHeight: "25px"}} header>Header</DropdownItem>
          <DropdownItem style={{lineHeight: "25px"}} disabled>Action</DropdownItem>
          <Link to={'/mypage'}><DropdownItem style={{lineHeight: "25px"}} ><b>마이페이지</b></DropdownItem></Link>
          <DropdownItem style={{lineHeight: "25px"}} divider />
          <Link to={'/#'}><DropdownItem style={{lineHeight: "25px"}} ><b>로그아웃</b></DropdownItem></Link>
        </DropdownMenu>
      </Dropdown>
    );
}