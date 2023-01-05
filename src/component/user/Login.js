import { Checkbox, TextField, Button, FormControlLabel, Link, Grid, Typography, Box, Container } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from 'react-cookie';


function Login() {

    const divStyle = {
        width: '1200px' //캘린더 width 조절을 위해 부모태그에 설정한다.
        , height: '800px'
        , textAlign: 'center'
        , margin: '100px auto'
        , marginBottom: '20px'
        , padding: '30px'
        , top: '100'
    };

    const [user, setUser] = useState({ id: '', password: '' });
    const handleInputUser = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const [cookie, setCookie] = useCookies(['refreshToken']);
    const dispatch = useDispatch();

    const userId = useSelector((state) => { return state.UserId });
    const accessToken = useSelector((state) => { return state.Authorization });



    // login 버튼 클릭 이벤트
    const ClickLogin = (e) => {
        e.preventDefault();
        if (user.id == '') {
            alert("아이디를 입력해주세요.");
            document.getElementById().SetFocus();
            return;
        }
        if (user.password == '') {
            alert("비밀번호를 입력해주세요.");
            document.getElementByPassword().SetFocus();
            return;
        }

        const formData = new FormData();
        formData.append('id', user.id)
        formData.append('password', user.password)

        // axios post 통신 - spring에서 객체로받지않고  String ___, String ___ 형태로 받을때는
        // params 객체에 담아서 넘긴다. 이때 매개변수는 post() 메소드의 3번째인자로 넘겨야한다. 객체를 커맨드 객체라고도 한다.
        axios.post('/login', null, { params: user })
            .then((res) => {
                // setUser(res.data);
                //accessToken redux에 저장
                dispatch({ type: "NEWTOKEN", data: res.data.accessToken });
                //userId redux에 저장
                dispatch({ type: "USERID", data: res.data.userId });
                //refreshToken Cookie에 저장
                const expires = new Date(); //쿠키 만료시간 지정
                expires.setDate(expires.getDate() + 1) //현재날짜 + 1 = 하루
                setCookie('refreshToken', res.data.refreshToken, { url: '/', expires })

                // if (accessToken != null && userId != null)
                document.location.href = "/"
            })
            .catch((error) => {
                alert("아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.")
                console.log(error)
            })

    }

    // 인풋에 적용할 eneter 키 입력 함수
    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            ClickLogin(e); //Enter 입력이 되면 클릭 이벤트 실행

        }
    };



    return (
        <div style={divStyle} >
            <Container component="main" maxWidth="xs">
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>

                    <Typography component="h1" variant="h5">
                        <div><h1><b> Log in </b></h1></div><br />
                    </Typography>

                    <TextField label="ID" name='id' id='id' value={user.id} margin="normal" fullWidth required autoFocus onChange={handleInputUser} onKeyDown={handleOnKeyDown} />
                    <TextField label="Password" type='password' name='password' id="password" margin="normal"
                        value={user.password} autoComplete="current-password" fullWidth required onChange={handleInputUser} onKeyDown={handleOnKeyDown} />
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

                    <Button type='submit' variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth onClick={ClickLogin}>Login</Button>

                    <Grid container className="forget_btn">
                        <Grid item>
                            <Link>Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link>Join Us</Link>
                        </Grid>
                    </Grid>

                </Box>
            </Container>
        </div>
    )
}

export default Login;