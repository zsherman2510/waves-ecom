import React, {useEffect, useReducer, useState} from 'react'
import DashboardLayout from '../../../../hoc/dashboardLayout';
import { useSelector, useDispatch } from 'react-redux';
import { productsByPaginate, productRemove } from 'store/actions/productsAction';
import ProductsTable from "./productsTable";

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
        max: 10000,
        page: 1
    }
    
    const [searchValues, setSearchValues] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      defaultValues
    );
    
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
      
    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [dispatch, searchValues])
    
    useEffect(() => {
        handleClose();///
        setRemoveModal(null);
        if (notifications && notifications.removeArticle) {
          dispatch(productsByPaginate(searchValues));
        }
    }, [dispatch, notifications])
    return (
      <DashboardLayout>
        <div className="products_table">
          <div>search</div>
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
