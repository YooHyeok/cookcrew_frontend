import axios from 'axios';
import {Form, Label, Input, Button, Col, FormGroup} from 'reactstrap';

export default function Join() {
    const divStyle = {
        width: '1200px' //캘린더 width 조절을 위해 부모태그에 설정한다.
        , height: '780px'
        , textAlign: 'center'
        , margin: '100px auto'
        , marginBottom: '20px'
        // , border: '0.5px solid gray'
        , padding: '30px'
        // , borderRadius: '20px'
        , top: '100'
    };

    return(
        <div style={divStyle}>
            <div><h1><b>로그인</b></h1></div><br />
            <div style={{
                        width: '500px'
                        , height: '205px'
                        , margin: '0px auto'
                        , border: '0.5px solid gray'
                        , padding: '30px'
                        , borderRadius: '20px'
                    }}>
                <Form style={{width:"400px", margin: '0px auto'}}>
                    <FormGroup row>
                            <Label htmlFor='id' sm={4}>아이디</Label>
                            <Col sm={8}>
                                <Input type='text' name='id' id='id' />
                            </Col>
                    </FormGroup>
                    <FormGroup row>
                            <Label htmlFor='password' sm={4}>비밀번호</Label>
                            <Col sm={8}>
                                <Input type='text' name='password' id='password' />
                            </Col>
                    </FormGroup>
                    <FormGroup row>
                         <Col sm={4} >
                            <Button color='secondary' style={{width:'400px'}} >로그인</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        </div>
    );
}