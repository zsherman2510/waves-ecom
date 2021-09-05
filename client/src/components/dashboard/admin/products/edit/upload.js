import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getTokenCookie } from "utils/tools";
import Loader from "utils/loader";

const PicUpload = ({picValue }) => {
  const [loading, setLoading] = useState(false);

  const formikImg = useFormik({
    initialValues: { pic: "" },
    validationSchema: Yup.object({
      pic: Yup.mixed().required("A file is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      let formData = new FormData();
      formData.append("file", values.pic);
      
      console.log(formData);

      axios
        .post(`/api/products/upload`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${getTokenCookie()}`,
          },
        })
        .then((response) => {
          picValue(response.data);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={formikImg.handleSubmit}>
          <div className="form-group">
            <input
              type="file"
              id="file"
              name="file"
              onChange={(event) => {
                formikImg.setFieldValue("pic", event.target.files[0]);
              }}
            />
          </div>

          {/* <Form.File
              id="file"
              name="file"
              
              onChange={(event) => {
                formikImg.setFieldValue("pic", event.target.files[0]);
              }}
            /> */}
          {formikImg.errors.pic && formikImg.touched.pic ? (
            <div>Error</div>
          ) : null}

          <Button variant="secondary" type="submit">
            Add image
          </Button>
        </Form>
      )}
    </>
  );
};

export default PicUpload;
