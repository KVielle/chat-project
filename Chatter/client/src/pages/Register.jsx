import {Alert, Button, Form, Row, Col, Stack} from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {

    const { registerInfo, updateRegisterInfo, registerUser, registerError, registerLoading } = useContext(AuthContext)


    return (
        <Form onSubmit = {registerUser}>
            <Row style = {{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "10%",
            }}>
                <Col xs = {10} lg = {6}>
                    <Stack gap = {3}>
                        <h2 className = "text-center">Register</h2>

                        <Form.Control type = "text" placeholder = "Name" onChange = {(ev) => updateRegisterInfo({...registerInfo, name: ev.target.value})}/>
                        <Form.Control type = "email" placeholder = "Email" onChange = {(ev) => updateRegisterInfo({...registerInfo, email: ev.target.value})}/>
                        <Form.Control type = "password" placeholder = "Password" onChange = {(ev) => updateRegisterInfo({...registerInfo, password: ev.target.value})}/>

                        <Button variant = "primary" type = "submit" style={{width: '60%', backgroundColor: "#00ffd9", color: "grey", border: "none", marginLeft: "auto", marginRight: "auto"}}>
                            {registerLoading ? "Creating your account..." : "Register"}
                        </Button>
                        {
                            registerError?.error && 
                            <Alert variant = "danger">
                            <p className = "text-center">{registerError.message}</p>
                            </Alert>
                        }
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
}

export default Register;