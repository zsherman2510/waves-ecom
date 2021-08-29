import React, {useEffect} from 'react'
import Featured from './featured';
import Slimblock from '../../utils/promotions/slimblock'
import {productsBySort} from 'store/actions/productsAction'
import Loader from '../../utils/loader'
import { useDispatch, useSelector } from 'react-redux';

import CardBlock from '../../utils/products/cardBlock';

const slim_promotion = {
    
        img: "./images/featured/featured_home_3.jpg",
        lineOne: "Up to 40% off",
        lineTwo: "In second hand guitar",
        lineTitle: "Shop Now",
        linkTo: "/shop",
      
}
function Home() {
    const {bySold, byDate} = useSelector(state => state.products)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(productsBySort({
            limit: 4, sortBy: 'itemSold', order: 'desc', where: 'getSold'
        }))
    }, [dispatch])
    
    useEffect(() => {
      dispatch(
        productsBySort({
          limit: 4,
          sortBy: "date",
          order: "desc",
          where: 'getDate'
        })
      );
    }, [dispatch]);
    
    
    return (
      <div>
        <Featured />
        {bySold ? (
          <CardBlock items={bySold} title="Best selling guitars" />
        ) : (
          <Loader />
        )}

        <Slimblock items={slim_promotion} />

        {byDate ? (
          <CardBlock items={byDate} title="Latest guitars on the shop" />
        ) : (
          <Loader />
        )}
      </div>
    );
}

export default Home;
