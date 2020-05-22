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
        <GoogleLogin
            clientId="387693868495-lnpfo6dneu2mn38g6b347tdh5ufrsoqg.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={handleSuccess}
            onFailure={handleError}
            isSignedIn={true}
        />
    )
}

export default GOauth;