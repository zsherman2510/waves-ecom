import React, { useEffect, useReducer, useState } from "react";
import CardBlocks from "../../utils/products/cardBlock";
import PaginateNav from "../../utils/paginateNav";


import { useDispatch, useSelector } from "react-redux";
import { productsByPaginate } from "store/actions/productsAction";
import { getAllBrands } from "store/actions/brandsAction";

import GridOffIcon from "@material-ui/icons/GridOff";
import GridOnIcon from "@material-ui/icons/GridOn";

    const defaultValues = {
      keywords: "",
      brands: [],
      min: 1,
      max: 5000,
      page: 1,
    };
    
const Shop = () => {
  const [grid, setGrid] = useState(false);
 const [searchValues, setSearchValues] = useReducer(
   (state, newState) => ({ ...state, ...newState }),
   defaultValues
 );
  const {byPaginate} = useSelector(state => state.products);
  const brands = useSelector(state => state.brands);
  const dispatch = useDispatch();

  const handleGrid = () => setGrid(!grid);

  const goToPage = (page) => {
    console.log(page);

    setSearchValues({ page: page });
  };

  const handleResetSearch = () => {
    setSearchValues({ keywords: "" });
  };
  
  
  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(productsByPaginate(searchValues));
  }, [searchValues, dispatch]);

  

  return (
    <div className="page_container">
      <div className="page_top">
        <div className="container">FORM</div>
      </div>
      <div className="container">
        <div className="shop_wrapper">
          <div className="left">collapse brand collapse frets range select</div>
          <div className="right">
            <div className="shop_options">
              <div className="shop_grids clear">
                <div
                  className={`grid_btn ${grid ? "" : "active"}`}
                  onClick={() => handleGrid()}
                >
                  <GridOnIcon />
                </div>
                <div
                  className={`grid_btn ${!grid ? "" : "active"}`}
                  onClick={() => handleGrid()}
                >
                  <GridOffIcon />
                </div>
              </div>
              <div>
                {byPaginate && byPaginate.docs ? (
                  <>
                    <CardBlocks
                      grid={grid}
                      items={byPaginate.docs}
                      shop={true}
                    />
                    <PaginateNav
                      prods={byPaginate}
                      prev={(page) => goToPage(page)}
                      next={(page) => goToPage(page)}
                      resetSearch={() => handleResetSearch()}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
