import classes from './login.module.css'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Divider, Group} from "@mantine/core";
import { NOTIFICATION_TYPES, showNotification } from '../../core/helperMethods/showNotification'
import API_CONFIG from "../../core/utils/apiConfig.js";
import { contentType, HTTP_METHODS, httpRequest } from "../../core/utils/httpRequest";
//import socket from '../../core/utils/socketIo.js';
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function Login({ setRefreshKey }){
    const navigate = useNavigate();
    function newLogin(values){
        httpRequest(API_CONFIG.endpoints.auth.login, HTTP_METHODS.POST, contentType.appJson, values)
        .then(res=>{
            showNotification("login Success", NOTIFICATION_TYPES.SUCCESS);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            localStorage.setItem("isLogged", JSON.stringify(true));
             // Get connectSocket function
            //connectSocket();  // Connect socket to the server
            // socket.connect()
            //console.log("Socket connected after connect():", socket.connected);
            //socket.emit('login',res.data)
            setRefreshKey(prevKey => prevKey + 1);
            setTimeout(() => {
                navigate('/')
            }, 1000);
        })
    }
    return(
        <div className={classes.style}>
            <div className={classes.titleHeader}>
                <p className={classes.title}>Login and chat for free</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <p className={classes.underline}></p>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "50px auto 0px",
                    paddingBottom: "50px",
                }}
            >
                <>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={newLogin}
                    >
                        <Form className={classes.form}>
                            <Group grow mb="md" mt="md" >
                                {/* <SignupAndLoginwithgoogle/> */}
                            </Group>
                            <Divider
                                label="OR"
                                labelPosition="center"
                                my="lg"
                                color="black"
                            />
                            <div>
                                <label className={classes.label} htmlFor="email">
                                    Email:
                                </label>
                                <br />
                                <Field
                                    className={classes.field}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                            </div>
                            <br />
                            <div>
                                <label className={classes.label} htmlFor="password">
                                    Password:
                                </label>
                                <br />
                                <Field
                                    className={classes.field}
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                            </div>
                            <br />
                            <div
                                style={{
                                    textAlign: "end",
                                    fontWeight: 500,
                                    color: "rgb(51,51,51)",
                                    marginTop: "-20px",
                                    marginBottom: "-8px",
                                }}
                            >
                                <a
                                    href="/forgetpassword"
                                    style={{
                                        textDecoration: "none",
                                        color: "#00A5EC",
                                        margin: "0px",
                                    }}
                                >
                                    Forget password?
                                </a>
                            </div>
                            <br/>
                            <div>
                                <Button style={{ width: "100%" }} type="submit">
                                    Login{" "}
                                </Button>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "-10px",
                                        marginTop: "20px"
                                    }}
                                >
                                    <p className={classes.register}>don{"'"}t have an account?{" "} </p>
                                    <a
                                        href="/signup"
                                        style={{ color: "#00A5EC", textDecoration: "none" }}
                                    >
                                        Register now
                                    </a>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </>
            </div>
        </div>
    );
}

export default Login