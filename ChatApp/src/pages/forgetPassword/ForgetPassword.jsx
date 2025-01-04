import classes from './forgetpassword.module.css'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@mantine/core";
import { NOTIFICATION_TYPES, showNotification } from '../../core/helperMethods/showNotification.js'
import API_CONFIG from "../../core/utils/apiConfig.js";
import { contentType, HTTP_METHODS, httpRequest } from "../../core/utils/httpRequest.js";


function ForgetPassword(){

    function sendCode(values){
        httpRequest(API_CONFIG.endpoints.auth.forgetPassword, HTTP_METHODS.POST, contentType.appJson, values)
        .then(()=>{
            showNotification("we sent you a code at your email", NOTIFICATION_TYPES.SUCCESS);
            setTimeout(() => {
                location.href = `/updatepassword?email=${values.email}`;
            }, 2000)
        })
    }
    return(
        <div className={classes.style}>
            <div className={classes.titleHeader}>
                <p className={classes.title}>we will send you a code at your Email</p>
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
                            email:""
                        }}
                        onSubmit={sendCode}
                    >
                        <Form className={classes.form}>
                            <div>
                                <label className={classes.label} htmlFor="email">
                                    email:
                                </label>
                                <br />
                                <Field
                                    className={classes.field}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="email"
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
                                    Send code{" "}
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </>
            </div>
        </div>
    );
}

export default ForgetPassword