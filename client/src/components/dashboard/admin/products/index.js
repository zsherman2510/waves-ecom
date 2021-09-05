import React, {useEffect, useReducer, useState} from 'react'
import DashboardLayout from '../../../../hoc/dashboardLayout';
import { useSelector, useDispatch } from 'react-redux';
import { productsByPaginate, productRemove } from 'store/actions/productsAction';
import ProductsTable from "./productsTable";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "utils/tools";
import { TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
const AdminProducts = (props) => {
    
     const [removeModal, setRemoveModal] = useState(false);
     const [toRemove, setToRemove] = useState(null);
     
    const notifications = useSelector(state => state.notifications);
    const products = useSelector(state => state.products);
    
    const dispatch = useDispatch();
    
    const defaultValues = {
        keywords: '', 
        brands: [],
        min: 1,
        max: 5000,
        page: 1
    }
    
    const [searchValues, setSearchValues] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      defaultValues
    );
    
     const formik = useFormik({
       initialValues: { keywords: "" },
       validationSchema: Yup.object({
         keywords: Yup.string()
           .min(3, "You need more than 3")
           .max(200, "Your search is too long"),
       }),
       onSubmit: (values, { resetForm }) => {

         setSearchValues({ keywords: values.keywords, page: 1 });
         resetForm();
       },
     });
    
      const gotoEdit = (id) => {
        props.history.push(`/dashboard/admin/edit_product/${id}`);
      };

      const gotoPage = (page) => {
        setSearchValues({ page: page });
      };
      
    const handleClose = () => {
        setRemoveModal(false)
    }

    const handleModal = (id) => {
        setToRemove(id);
        setRemoveModal(true)
    }

    const handleRemove = () => {
        dispatch(productRemove(toRemove))
    }
    
    const resetSearch = () => {
      setSearchValues(defaultValues);
    };
      
    useEffect(() => {
        
        dispatch(productsByPaginate(searchValues))
    }, [dispatch, searchValues])
    
    useEffect(() => {
        handleClose();///
        setRemoveModal(null);
        if (notifications && notifications.removeArticle) {
          dispatch(productsByPaginate(searchValues));
        }
    }, [dispatch, notifications, searchValues])
    return (
      <DashboardLayout>
        <div className="products_table">
          <div>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
              <TextField
                style={{ width: "100%" }}
                name="keywords"
                label="Enter your search"
                variant="outlined"
                {...formik.getFieldProps("keywords")}
                {...errorHelper(formik, "keywords")}
              />
            </form>
            <Button onClick={() => resetSearch()}>Reset search</Button>
          </div>
          <hr />
          <ProductsTable
            removeModal={removeModal}
            prods={products.byPaginate}
            prev={(page) => gotoPage(page)}
            next={(page) => gotoPage(page)}
            gotoEdit={(id) => gotoEdit(id)}
            handleClose={() => handleClose()}
            handleModal={(id) => handleModal(id)}
            handleRemove={() => handleRemove()}
          />
        </div>
      </DashboardLayout>
    );
}

export default AdminProducts
