import React, {useState} from 'react'
import {Button} from '@material-ui/core';
import AuthForm from './authForm';
const RegisterLogin = (props) => {
    const [formType, setFormType] = useState(false);
    const toggleFormType = () => {
        setFormType(!formType);
    }
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              {formType ? (
                <>
                  <h1>New customers</h1>
                  <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum."
                  </p>
                </>
              ) : (
                <>
                  <h1>Welcome Back</h1>
                  <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum."
                  </p>
                </>
              )}

            <Button
              variant="contained"
              color="default"
              size="small"
              onClick={()=> toggleFormType()}
            
            >
              {formType ? 'Already Registered' : 'Need to Register' }
            </Button>
            </div>
            <div className="right"> <h2>{formType ? 'Register' : 'Sign in'}</h2>
                <AuthForm 
                  formType={formType}
                  {...props}
                />
            </div>
          </div>
        </div>
      </div>
    );
}

export default RegisterLogin
