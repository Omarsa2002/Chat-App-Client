import classes from './activateEmail.module.css'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@mantine/core";
import { NOTIFICATION_TYPES, showNotification } from '../../core/helperMethods/showNotification.js'
import API_CONFIG from "../../core/utils/apiConfig.js";
import { contentType, HTTP_METHODS, httpRequest } from "../../core/utils/httpRequest.js";
import { useLocation } from "react-router-dom";

function ActivateEmail(){
    const queryParams = new URLSearchParams(useLocation().search);
    const email = queryParams.get("email");
    function resendCode(){
        const data = {
            email,
            codeType: 'activate'
        }
        httpRequest(API_CONFIG.endpoints.auth.resendCode, HTTP_METHODS.POST, contentType.appJson, data)
        .then(()=>{
            showNotification("we sent you a new code", NOTIFICATION_TYPES.SUCCESS);
        })
    }
    function newActivateEmail(values){
        const data = {
            email,
            code: values.code
        }
        console.log(data);
        httpRequest(API_CONFIG.endpoints.auth.confirmEmail, HTTP_METHODS.POST, contentType.appJson, data)
        .then(()=>{
            showNotification("your email has been activated", NOTIFICATION_TYPES.SUCCESS);
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
                            code:""
                        }}
                        onSubmit={newActivateEmail}
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
                                <Button style={{ width: "100%" }} type="submit">
                                    Activate Email{" "}
                                </Button>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "-10px",
                                        marginTop:"20px"
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

export default ActivateEmail