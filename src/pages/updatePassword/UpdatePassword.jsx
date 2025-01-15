import classes from './updatePassword.module.css'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@mantine/core";
import { NOTIFICATION_TYPES, showNotification } from '../../core/helperMethods/showNotification'
import API_CONFIG from "../../core/utils/apiConfig.js";
import { contentType, HTTP_METHODS, httpRequest } from "../../core/utils/httpRequest";
import { useLocation } from "react-router-dom";

function UpdatePassword(){
    const queryParams = new URLSearchParams(useLocation().search);
    const email = queryParams.get("email");
    function resendCode(){
        const data = {
            email,
            codeType: 'updatePassword'
        }
        httpRequest(API_CONFIG.endpoints.auth.resendCode, HTTP_METHODS.PATCH, contentType.appJson, data)
        .then(()=>{
            showNotification("we sent you a new code", NOTIFICATION_TYPES.SUCCESS);
        })
    }
    function updatePassword(values){
        if(values.newPassword!==values.confirmPassword){
            showNotification("new password and confirm password should be the same", NOTIFICATION_TYPES.ERROR)
            return
        }
        const data = {
            email,
            code: values.code,
            password: values.newPassword
        }
        console.log(data);
        httpRequest(API_CONFIG.endpoints.auth.setPassword, HTTP_METHODS.PUT, contentType.appJson, data)
        .then(()=>{
            showNotification("your password has been updated", NOTIFICATION_TYPES.SUCCESS);
            setTimeout(() => {
                location.href = `/login`;
            }, 2000)
        })
    }
    return(
        <div className={classes.style}>
            <div className={classes.titleHeader}>
                <p className={classes.title}>Activate your Email</p>
                <p className={classes.title}>we sent you a code at your Email</p>
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
                            code:"",
                            newPassword:"",
                            confirmPassword:""
                        }}
                        onSubmit={updatePassword}
                    >
                        <Form className={classes.form}>
                            <div>
                                <label className={classes.label} htmlFor="email">
                                    code:
                                </label>
                                <br />
                                <Field
                                    className={classes.field}
                                    id="code"
                                    type="text"
                                    maxLength="6"
                                    name="code"
                                    placeholder=""
                                />
                                <ErrorMessage
                                    name="code"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                            </div>
                            <br />
                            <div>
                                <label className={classes.label} htmlFor="email">
                                    new password:
                                </label>
                                <br />
                                <Field
                                    className={classes.field}
                                    id="newPassword"
                                    type="password"
                                    name="newPassword"
                                    placeholder="new password"
                                />
                                <ErrorMessage
                                    name="code"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                            </div>
                            <br />
                            <div>
                                <label className={classes.label} htmlFor="email">
                                    confirm password:
                                </label>
                                <br />
                                <Field
                                    className={classes.field}
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="confirm password"
                                />
                                <ErrorMessage
                                    name="code"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                            </div>
                            <br />
                            <div>
                                <Button style={{ width: "100%" }} type="submit">
                                    Update your password{" "}
                                </Button>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "-10px",
                                        marginTop: '20px'
                                    }}
                                >
                                    <p className={classes.register}>didn{"'"}t receive any code?{" "} </p>
                                    <a
                                        onClick={resendCode}
                                        style={{ color: "#00A5EC", textDecoration: "none" }}
                                    >
                                        resend code 
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

export default UpdatePassword