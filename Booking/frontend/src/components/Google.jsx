import React, {useState, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';

function Google(){

    const [user, setUser] = useState({});

    function handledCallBackResponse(response){
        console.log("encoded JWT ID token is: "+ response.credential)
        var decodedObj = jwtDecode(response.credential);
        console.log(decodedObj);
        setUser(decodedObj);
        document.getElementById('signinDiv').hidden = true;

    }   

    function signOutFn(){
        setUser({});
        document.getElementById('signinDiv').hidden = false;
    }
    
    useEffect(() =>{
        /* global google */
        google.accounts.id.initialize({
            client_id: "656215194603-91jcre00rv9s84csp98496tct9pb2lr6.apps.googleusercontent.com",
            callback: handledCallBackResponse
        });
        
        google.accounts.id.renderButton(
            document.getElementById('signinDiv'),
            {theme: 'outline', size:'large'}
        )

        google.accounts.id.prompt();
    },[]);
    
    
    return (
        <div style={{positiion: 'relative', placeContent: 'center', marginTop: '10px'}} className='googleCSS'>
            <div id='signinDiv'></div>
            {Object.keys(user).length != 0 &&
                <button className='signOut' onClick={(evt) => signOutFn(evt)}>Sign Out</button>
            }
            {user &&
                <div>
                    <img src={user.picture}></img>
                    <h2>{user.name}</h2>
                </div>
            }
        </div>
    );
}

export default Google;