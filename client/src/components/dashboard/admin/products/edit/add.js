import React, { useEffect, useState } from "react";
import DashboardLayout from "hoc/dashboardLayout";
import PicUpload from "./upload";
import PicViewer from "./picViewer";

import { useFormik } from "formik";
import { errorHelper } from "utils/tools";
import Loader from "utils/loader";
import { validation } from "./formValues";

import { useDispatch, useSelector } from "react-redux";

import { getAllBrands } from "store/actions/brandsAction";
import { addProduct } from "store/actions/productsAction";



import {
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

const AddProduct = (props) => {
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands);
  
  
  
  const formik = useFormik({
    initialValues: {
      model: "",
      brand: "",
      //frets: "",
      //woodtype: "",
      description: "",
      price: "",
      available: "",
      shipping: false,
      images: [],
    },
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });
  
   const handleSubmit = (values) => {
     
     setLoading(true);
     dispatch(addProduct(values));
   };
   
   const handlePicValue = (pic) => {
     console.log(pic);
     const picArray = formik.values.images;
     console.log(picArray);
     picArray.push(pic.url);
     console.log(picArray);
     formik.setFieldValue("images", picArray);
   };

   const deletePic = (index) => {
     const picArray = formik.values.images;
     picArray.splice(index, 1);
     formik.setFieldValue("images", picArray);
   };

   useEffect(() => {
     if (notifications && notifications.success) {
       props.history.push("/dashboard/admin/admin_products");
     }
     if (notifications && notifications.error) {
       setLoading(false);
     }
   }, [notifications, props.history]);
   
  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);


  return (
    <DashboardLayout title="Add product">
      {loading ? (
        <Loader />
      ) : (
        <>
          <PicViewer formik={formik} deletePic={(index) => deletePic(index)} />
          <PicUpload picValue={(pic) => handlePicValue(pic)} />
          <Divider className="mt-3 mb-3" />

          <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="model"
                label="Enter a model"
                variant="outlined"
                {...formik.getFieldProps("model")}
                {...errorHelper(formik, "model")}
              />
            </div>
            {/* <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="frets"
                label="Enter the amount of frets"
                variant="outlined"
                type="number"
                {...formik.getFieldProps("frets")}
                {...errorHelper(formik, "frets")}
              />
            </div> */}
            {/* <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="woodtype"
                label="Enter the woodtype"
                variant="outlined"
                {...formik.getFieldProps("woodtype")}
                {...errorHelper(formik, "woodtype")}
              />
            </div> */}
            <div className="form-group">
              <FormControl variant="outlined">
                <h5>Select a brand</h5>
                <Select
                  name="brand"
                  {...formik.getFieldProps("brand")}
                  error={
                    formik.errors.brand && formik.touched.brand ? true : false
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {brands && brands.all
                    ? brands.all.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                {formik.errors.brand && formik.touched.brand ? (
                  <FormHelperText error={true}>
                    {formik.errors.brand}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="description"
                label="Enter the description"
                variant="outlined"
                {...formik.getFieldProps("description")}
                {...errorHelper(formik, "description")}
                multiline
                rows={4}
              />
            </div>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="price"
                label="Enter the price"
                variant="outlined"
                type="number"
                {...formik.getFieldProps("price")}
                {...errorHelper(formik, "price")}
              />
            </div>
            <Divider className="mt-3 mb-3" />
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="available"
                label="How many of this do we have on storage ?"
                variant="outlined"
                type="number"
                {...formik.getFieldProps("available")}
                {...errorHelper(formik, "available")}
              />
            </div>
            <Divider className="mt-3 mb-3" />
            <div className="form-group">
              <FormControl variant="outlined">
                <h5>Do we offer free shipping</h5>
                <Select
                  name="shipping"
                  {...formik.getFieldProps("shipping")}
                  error={
                    formik.errors.shipping && formik.touched.shipping
                      ? true
                      : false
                  }
                >
                  <MenuItem value={true}> Yes </MenuItem>
                  <MenuItem value={false}> No </MenuItem>
                </Select>
                {formik.errors.shipping && formik.touched.shipping ? (
                  <FormHelperText error={true}>
                    {formik.errors.shipping}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>
            <Divider className="mt-3 mb-3" />

            <Button variant="contained" color="primary" type="submit">
              Add product
            </Button>
          </form>
        </>
      )}
    </DashboardLayout>
  );
};

export default AddProduct;
