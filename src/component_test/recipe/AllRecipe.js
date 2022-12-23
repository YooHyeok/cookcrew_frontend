import {Component} from 'react';
import {Form, Label, Input, Button, Col, FormGroup
        , Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap';
import axios from 'axios';

class AllRecipe extends Component {
    constructor(props) {
        super(props);

        this.divStyle = {
            width: '1200px' //캘린더 width 조절을 위해 부모태그에 설정한다.
            , height: '950px'
            , textAlign: 'left'
            , margin: '100px auto'
            , marginBottom: '40px'
            , border: '0.5px solid gray'
            , padding: '30px'
            , borderRadius: '20px'
            , top: '100'
        };
        this.thsm = {
              width:'66px'
        };
        this.thm = {
              width:'120px'
        };
        this.state = {
              modal:false
            , acc: []
        }
    }

    repeatTrTd = () => {
        var arr = [];
        for(var i=0; i<10; i++) {
            arr.push(
                <tr>
                    <td ><img src='#' alt=' ' /></td>
                    <td><a href='/recipedetail'>example Data</a></td>
                    <td>example Data</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
            )
        }
        return arr;
    }

    componentDidMount() {
        /* axios.get('')
        .then((response) => {
            this.setState({acc: response.data})
        })
        .catch((error)=>{
            console.log(error)
            
        }); */

    }

    render(){
        return(
                <>
                <div style={this.divStyle}>
                    {/* 현재 페이지 */}
                    <div>

                    <div style={{display:'inline-block'}}><span style={{}}><h1><b>전체 레시피</b></h1></span></div><br/>
                    <div style={{display:'inline-block', float:'right'}}><button type="button" className="btn btn-outline-secondary" onClick={() => {document.location.href='/recipeWrite';}}>등록</button></div><br/><br/>
                    </div>
                    {/* 테이블 */}
                    <Table striped>
                        <thead>
                            <tr>
                                <th style={this.thsm} ></th>
                                <th>메뉴</th>
                                <th style={this.thm} >등록일</th>
                                <th style={this.thsm} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
                                    </svg>
                                </th>
                                <th style={this.thsm} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                </th>
                                <th style={this.thsm} >조회</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.repeatTrTd()}
                        </tbody>
                        {/* map은 각각의 요소마다 return한다. */}
                        {this.state.acc.map((acc) => {
                            console.log(acc);
                            return (
                                <tr key={acc.id}>
                                <td>{acc.id}</td>
                                <td>{acc.name}</td>
                                <td>{acc.balance}</td>
                                <td>{acc.grade}</td>
                            </tr>
                            )
                        })}
                    </Table>
                </div>
                {/* 페이징처리 */}
                    <section id="pageList">
                        {
                            (() => {
                                const array = [];
                                // startpage부터 endpage까지 1씩 증가하면서 반복.
                                for(let i = /* pageInfo.startPage */1; i<= /* pageInfo.endPage */10; i++){ 
                                    // array에 반복해서 push한다.
                                    array.push(
                                        <span key={i}><button className="btn btn-light" value={i} /* onClick={pageRequest} */>{i}</button>&nbsp;&nbsp;</span>
                                        )
                                    }
                                    return array;
                                })()
                            }
                     </section>
                </>
            )
        }
}

export default AllRecipe;