import React from 'react'
import {GoogleLogin} from 'react-google-login'

const GOauth = (props: any) => {

    const handleSuccess = (e: any) => {
        props.authorised(e.profileObj.email);
    }

    const handleError = (e: any) => {
        console.log(e);
    }

    return (
        <div className="google-login-btn">
            <GoogleLogin
                clientId={props.clientId}
                buttonText="Login with Google"
                onSuccess={handleSuccess}
                onFailure={handleError}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GOauth;