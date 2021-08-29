import React from 'react'
import {Link} from 'react-router-dom'
import { toast } from "react-toastify";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
export const WavesButton = (props) => {
    
    let template = '';
    
    switch(props.type){
        case "default":
            template = <Link
                className={!props.altClass ? 'link_default' : props.altClass}
                to={props.linkTo}
                style={{
                    
                    ...props.style
                }}
            >
            {props.title}
            </Link>
        break;
        case "bag_link":
            // template = <AddShoppingCartIcon />
            template = <div
                className="bag_link"
                onClick={() => {
                  
                    props.runAction();
                  
                }}
                style={{ ...props.style }}
              >
                <AddShoppingCartIcon />
              </div>;
            
        break;
        default:
            template= '';
    }
     return template;
}

export const renderCardImage = (image) => {
    if(image.length > 0){
        return image[0];
    }else{
        return '/images/image_not_available.png'
    }
}

export const showToast = (type, msg) => {
    switch(type){
        case 'SUCCESS':
            toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT})
        break;
        case 'ERROR':
            toast.error(msg, { position: toast.POSITION.BOTTOM_RIGHT });
        break;
        default:
            return false;
    }
}


