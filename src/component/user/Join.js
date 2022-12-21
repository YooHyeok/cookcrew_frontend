import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "reactstrap";
import './Join.css';


function Join() {
    const [userJoin, setUserJoin] = useState({
        nickname: '', id: '', password: '', address: '', detailaddress: '', email: '', checked: ''
    });

    //정규식
    const [validId, setValidId] = useState(false);
    const [validNN, setValidNN] = useState(false);

    //비밀번호 일치, 불일치
    const [repw, setRepw] = useState('')

    // ID와 닉네임의 정규식 표현:첫글자는 영문 대소문자, 4~16자의 영문 대소문자, 숫자와 특수기호(_),(-)만 사용가능합니다.
    const ID_REG = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;

    // 아이디 정규표현식 일지하는지 검사
    const setIdInfo = (e) => {

        let id = e.target.value;
        setUserJoin({ ...userJoin, 'id': id });
        const reg = new RegExp(ID_REG);
        let checkReg = reg.test(id) ? true : false;
        if (checkReg) {
            console.log("정규표현식 일치")
            document.getElementById("regTrue").setAttribute("style", "display:show; color: blue;")
            document.getElementById("regFalse").setAttribute("style", "display:none; color: red;")
        }
        if (!checkReg) {
            console.log("정규표현식 불일치")
            document.getElementById("regFalse").setAttribute("style", "display:show; color: red;")
            document.getElementById("regTrue").setAttribute("style", "display:none; color: blue;")
        }
    }

    // 닉네임 정규표현식 일지하는지 검사
    const setNnInfo = (e) => {

        let nickname = e.target.value;
        setUserJoin({ ...userJoin, 'nickname': nickname });
        const reg = new RegExp(ID_REG);
        let checkReg = reg.test(nickname) ? true : false;
        if (checkReg) {
            console.log("닉네임 정규표현식 일치")
            document.getElementById("regnnTrue").setAttribute("style", "display:show; color: blue;")
            document.getElementById("regnnFalse").setAttribute("style", "display:none; color: red;")
        }
        if (!checkReg) {
            console.log("닉네임 정규표현식 불일치")
            document.getElementById("regnnFalse").setAttribute("style", "display:show; color: red;")
            document.getElementById("regnnTrue").setAttribute("style", "display:none; color: blue;")
        }
    }

    // 사용자가 입력할 때마다 정규표현식 확인하기
    useEffect(() => {
        const result = ID_REG.test(userJoin.id);
        setValidId(result);
    }, [userJoin.id])

    useEffect(() => {
        const result = ID_REG.test(userJoin.nickname);
        setValidNN(result);
    }, [userJoin.nickname])


    // 사용 가능한 아이디인지 중복 검사(백에서 처리)
    const CheckId = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', userJoin.id)
        axios.post('/exsitById', formData)
            .then((res) => {
                if (res.data === false) {
                    alert("사용 가능합니다.");
                }
                else if (res.data === true) {
                    alert("중복되는 아이디입니다.")
                }
            }).catch((error) => {
                // alert("중복되는 아이디 입니다.")
                console.log("Error")
            })

    };

    // 사용 가능한 닉네임인지 중복 검사(백에서 처리)
    const CheckNN = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nickname', userJoin.nickname)
        axios.post('/exsitByNn', formData)
            .then((res) => {
                if (res.data === false) {
                    alert("사용 가능합니다.");
                }
                else if (res.data === true) {
                    alert("중복되는 닉네임입니다.")
                }
            }).catch((error) => {
                // alert("중복되는 아이디 입니다.")
                console.log("Error")
            })

    };


    //  입력 set
    const setInfo = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserJoin({ ...userJoin, [name]: value });
    }


    const submit = () => {
        //e.preventDefault();
        const formData = new FormData();
        formData.append('nickname', userJoin.nickname);
        formData.append('id', userJoin.id);
        formData.append('password', userJoin.password);
        formData.append('address', userJoin.address);
        formData.append('detailaddress', userJoin.detailaddress);
        formData.append('email', userJoin.email);
        formData.append('checked', userJoin.checked);

        if (validId && validNN) {
            axios.post('/join', formData)
                .then((res) => {
                    alert("회원 가입을 축하합니다.")

                }).catch((error) => {
                    console.log("error")
                })
        }
    }

    return (
        <form className="join_wrap">
            <div className='joinus'><h1><b>회원가입</b></h1><br />
                <section className="join_cl" >
                    <div style={{ width: "400px", margin: "0 auto" }} >
                        {/* 닉네임 */}
                        <label >Nickname</label><br />
                        <input className="inputStyle" type="text" name="nickname" id="nickname" placeholder="nickname" value={userJoin.nickname} onChange={setNnInfo} required></input>
                        <Button color="warning" className="CheckBtn" onClick={CheckNN}>중복 확인</Button>
                        <p>
                            <span id="regnnTrue" style={{ display: "none" }}><b>사용 가능한 닉네임입니다.</b></span>
                            <span id="regnnFalse" style={{ display: "none" }}><b>4~16자의 영문 대소문자, 숫자와 특수기호(_),(-)만 사용가능합니다.</b></span>
                        </p>


                        {/* 아이디 */}
                        <div>
                            <label htmlFor="id">ID</label><br />
                            <input className="inputStyle" type="text" name="id" id="id" placeholder="id" value={userJoin.id} onChange={setIdInfo} required />
                            <Button color="warning" className="CheckBtn" onClick={CheckId}>중복 확인</Button>
                            <p>
                                <span id="regTrue" style={{ display: "none" }}><b>사용 가능한 아이디 입니다.</b></span>
                                <span id="regFalse" style={{ display: "none" }}><b>4~16자의 영문 대소문자, 숫자와 특수기호(_),(-)만 사용가능합니다.</b></span>
                            </p>
                        </div>

                        {/* 비밀번호 */}
                        <label>비밀번호</label><br />
                        <input className="inputStyle" type="password" name="password" id="password" placeholder="password" value={userJoin.password} required></input>
                        <br /><br />

                        <label>비밀번호 재확인</label><br />
                        <input className="inputStyle" type="password" name="repw" id="repw" value={repw} required></input>
                        <p>
                            <span id="pwTrue" style={{ display: "none" }}><b>비밀번호 일치</b></span>
                            <span id="pwFalse" style={{ display: "none" }}><b>비밀번호 불일치</b></span>
                        </p>

                        <label>주소</label><br />
                        <input className="inputStyle" type="text" name="address" id="address" value={userJoin.address} onChange={setInfo} required />
                        <Button color="warning" className="CheckBtn">주소 찾기</Button>
                        <br /><br />

                        <label>상세 주소</label><br />
                        <input className="inputStyle" type="text" name="detailaddress" id="detailaddress" value={userJoin.detailaddress} onChange={setInfo} required />
                        <br /><br />

                        <div>
                            <label>e-mail</label><br />
                            <input className="inputStyle" type="email" name="email" id="email" value={userJoin.email} onChange={setInfo} required />
                            <Button color="warning" className="CheckBtn">인증 번호</Button>
                            <br /><br />
                        </div>

                        <label>인증 번호 </label><br />
                        <input className="inputStyle" type="text" name="checked" id="checked" value={userJoin.checked} onChange={setInfo} required />
                        <br /><br />

                        <div>
                            <Button type='submit' color="warning" onClick={submit} style={{ width: "355px", height: "50px" }}>회 원 가 입</Button>
                        </div>
                    </div>

                </section>
            </div>
        </form>
    )
};

export default Join;