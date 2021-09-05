import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "utils/loader";
import { errorHelper } from "utils/tools";

import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { userRegister, userSignIn } from "store/actions/usersActions";

const AuthForm = (props) => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry the email is required")
        .email("This is an invalid email"),
      password: Yup.string().required("Sorry the email is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
      
    if (props.formType) {
        
      dispatch(userRegister(values));
    } else {
      ///// sign in
      dispatch(userSignIn(values));
    }
  };
  //checks if there is a notification like when someone successfully logged or registered in, then push them to the dashboard
  useEffect(() => {
    if (notifications && notifications.success) {
      props.history.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [notifications, props.history]);

  return (
    <>
      <div className="auth_container">
        {loading ? (
          <Loader />
        ) : (
          <form className="mt-3" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="email"
                label="Enter your email"
                variant="outlined"
                {...formik.getFieldProps("email")}
                {...errorHelper(formik, "email")}
              />
            </div>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="password"
                label="Enter your password"
                variant="outlined"
                type="password"
                {...formik.getFieldProps("password")}
                {...errorHelper(formik, "password")}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="small"
            >
              {props.formType ? "Register" : "Login"}
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

export default AuthForm;
