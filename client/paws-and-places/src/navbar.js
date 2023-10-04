import React, { useState } from 'react';
import logo from './assets/Asset 1.png'
import logo2 from './assets/Asset 2.png'
import { LoginForm, SignupForm } from './LoginForm';

function Navbar(){
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const toggleLoginModal = () => {
    setShowLogin(!showLogin);
  };

  const toggleSignupModal = () => {
    setShowSignup(!showSignup);
  };


    const navbarStyle={
        //position: 'relative',
        height:"200px",
        backgroundColor: "#87a630",
        fontFamily: 'Forte-Regular',
        overflow:"hidden"
    }

    const rowStyle={
        //alignContent:'justify-center'
        position:'relative'
    }

    const logoImage={
        width:"180px",
        height:"180px",
        marginLeft:'10%'
        //border: '2px solid black'
    }

    const logoStyle={
        position: 'relative',
        fontSize:"80px",
        color: "white",
        top: "10px",
        marginLeft:"30%",
        bottom: "10px"
    }

    const logo2Style={
        position: "relative",
        width:"auto",
        height: "100px",
        //left:"400px",
        top: "30px",
        //border:"2px solid black"
    }

    const buttonStyle={
        //marginLeft:"100px",
        //marginTop: "-15%",
        position: 'absolute',
        backgroundColor: "white",
        width: "150px",
        height:'50px',
        border: "5pt solid white",
        color: "white",
        top: '50px',
        borderRadius: '20px',
        fontFamily:'Nirmala-Bold',
        color: "#87a630"
    }

    const colcontainer={
        position:'relative'
    }

    return(
        <div className='navbar' style={navbarStyle}>
                <div className='row' style={{}}>
                    <div className='col'>
                        <div className='container' style={colcontainer}>
                           <img src={logo} style={logoImage}></img>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='container' style={colcontainer}>
                            <img src={logo2} style={logo2Style}></img>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='container'style={colcontainer}>
                          <button style={buttonStyle} onClick={toggleLoginModal}>
                          Login
                         </button>
                         {showLogin && <LoginForm />}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Navbar
