import React from 'react'
import Carrosel from "utils/carrosel";
const Featured = () => {
    
    
    const carouselItems = [
      {
        img: "./images/featured/featured_home.jpg",
        lineOne: "Fender",
        lineTwo: "Custom Shop",
        lineTitle: "Shop Now",
        linkTo: "/shop",
      },
      {
        img: "./images/featured/featured_home_2.jpg",
        lineOne: "B-Stock",
        lineTwo: "Awesome discounts",
        lineTitle: "View offers",
        linkTo: "/shop",
      },
      {
        img: "./images/featured/featured_home_3.jpg",
        lineOne: "Fender",
        lineTwo: "Custom Shop",
        lineTitle: "Shop Now",
        linkTo: "/shop",
      },
    ];
        

    
    return (
      <div>
        <Carrosel items={carouselItems} />
      </div>
    );
}

export default Featured;
