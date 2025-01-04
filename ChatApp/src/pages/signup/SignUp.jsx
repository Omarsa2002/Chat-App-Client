import classes from './signUp.module.css'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Divider, Group, Text } from "@mantine/core";
import signUpValidation from "./signUpValidation";
import { NOTIFICATION_TYPES, showNotification } from '../../core/helperMethods/showNotification'
import API_CONFIG from "../../core/utils/apiConfig.js";
import { contentType, HTTP_METHODS, httpRequest } from "../../core/utils/httpRequest";
function SignUp() {
    function addUser(values) {
        const data = { ...values };
        httpRequest(API_CONFIG.endpoints.auth.signup, HTTP_METHODS.POST, contentType.appJson, data)
        .then((res) => {
            if (res.status === 201) {
                showNotification("Success register", NOTIFICATION_TYPES.SUCCESS);
                setTimeout(() => {
                    location.href = `/activateemail?email=${data.email}`;
                }, 1000);
            }
        });
    }

    return(
        <div className={classes.style}>
            <div className={classes.titleHeader}>
                <p className={classes.title}>Sign-up and chat for free</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <p className={classes.underline}></p>
                </div>
                <p className={classes.companies}>
                    1,50,000+ users 
                </p>
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
                            userName: "",
                            email: "",
                            password: "",
                        }}
                        validationSchema={signUpValidation}
                        onSubmit={addUser}
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
                                <label className={classes.label} htmlFor="firstName">
                                    Name:
                                </label>
                                <br />
                                <Field
                                    className={classes.field}
                                    id="userName"
                                    type="username"
                                    name="userName"
                                    placeholder="Name"
                                />
                                <ErrorMessage
                                    name="userName"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                            </div>
                            <br/>
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
                            <Text fz={12} mb={8} mt={-5}>
                                {" "}
                                <span className={classes.signing}>
                                    By signing up, you agree to our{" "}
                                </span>
                                <span style={{ color: "#00A5EC", fontWeight: 500 }}>
                                    Terms and Conditions.
                                </span>
                            </Text>
                            <div>
                                <Button style={{ width: "100%" }} type="submit">
                                    Register{" "}
                                </Button>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "-10px",
                                        marginTop: '20px'
                                    }}
                                >
                                    <p className={classes.register}>Already registered? </p>
                                    <a
                                        href="/login"
                                        style={{ color: "#00A5EC", textDecoration: "none" }}
                                    >
                                        Login
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

export default SignUp;