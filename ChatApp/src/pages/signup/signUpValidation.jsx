import * as yup from "yup";

const RegisterUserSchema = yup.object().shape({
    userName: yup
        .string()
        .required("user name is required")
        .min(3, "user name must be at least 3 characters")
        .max(30, "user name must be at most 30 characters"),
    email: yup
        .string()
        .email("Enter a valid email address")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
});

//Regex

export default RegisterUserSchema;
