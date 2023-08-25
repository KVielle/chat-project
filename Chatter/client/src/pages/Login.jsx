import { useContext } from "react";
import {Alert, Button, Form, Row, Col, Stack} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";



const Login = () => {

    const {loginInfo, loginUser, loginError, updateLoginInfo, loginLoading} = useContext(AuthContext);

    return ( 
        <Form onSubmit = {loginUser}>
            <Row style = {{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "10%",
            }}>
                <Col xs = {10} lg = {6}>
                    <Stack gap = {3}>
                        <h2 className = "text-center">Login</h2>

                        <Form.Control type = "email" placeholder = "Email" onChange = {(ev) => {updateLoginInfo({...loginInfo, email: ev.target.value})}} />
                        <Form.Control type = "password" placeholder = "Password" onChange = {(ev) => {updateLoginInfo({...loginInfo, password: ev.target.value})}} />

                        <Button variant = "primary" type = "submit" style={{width: '60%', backgroundColor: "#00ffd9", color: "grey", border: "none", marginLeft: "auto", marginRight: "auto"}}>
                            {loginLoading ? "Getting you in..." : "Login"}
                        </Button>

                        {loginError?.error && (
                            <Alert variant = "danger">
                            <p className = "text-center">{loginError?.message}</p>
                        </Alert>
                        )} 
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
}

export default Login;