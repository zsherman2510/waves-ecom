import React from 'react'
import ContactsIcon from '@material-ui/icons/Contacts';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email'

import {useSelector} from 'react-redux'
const Footer = () => {
    return (
      <footer className="bck_b_dark">
        <div className="container">
          <div className="logo">WAVES</div>
          <div className="wrapper">
            <div className="left">
              <h2>Contact information</h2>
              <div className="business_nfo">
                <div className="tag">
                  <ContactsIcon />
                  <div className="nfo">
                    <div>Address</div>
                    <div>some streeet 222</div>
                  </div>
                </div>
                <div className="tag">
                  <PhoneIcon />
                  <div className="nfo">
                    <div>Phone</div>
                    <div>875-894-9444</div>
                  </div>
                </div>
                <div className="tag">
                  <TimelapseIcon />
                  <div className="nfo">
                    <div>Working hours</div>
                    <div>always open</div>
                  </div>
                </div>
                <div className="tag">
                  <EmailIcon />
                  <div className="nfo">
                    <div>Email</div>
                    <div>hsoudj@email.com</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
                <h2>Be the first to know</h2>
                <div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum provident totam dolorum deleniti fuga. Nostrum quo qui consectetur cupiditate totam odit nesciunt dolorem consequuntur sint repellat. A temporibus eligendi aliquid.
                        Voluptatibus debitis nihil, suscipit reiciendis 
                    </div>
                </div>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer