import React from 'react';
import logo from './assets/Asset 1.png'
import logo2 from './assets/Asset 2.png'
import AuthModal from './AuthForms';
import {useNavigate} from 'react-router-dom'


function Navbar({ setPlacefunc }){
  const [authModalIsOpen, setAuthModalIsOpen] = React.useState(false);
  
  const navigate = useNavigate();

  const openAuthModal = () => {
    setAuthModalIsOpen(true);
  };
 const closeAuthModal = () => {
    setAuthModalIsOpen(false);
  };

  function createDogHouse(){
    navigate('addPlace')
  }



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

      top: "30px",
  }
  const buttonStyle={
    backgroundColor: "white",
    width: "150px",
    height:'50px',
    border: "5pt solid white",
    color: "white",
    top: '50px',
    borderRadius: '20px',
    fontFamily:'Nirmala-Bold',
    color: "#87a630",
    cursor:"pointer",
    margin: "5px",
}

const colcontainer={
    position:'relative'
}
return (
  <div className='navbar' style={navbarStyle}>
    <div className='row'>
      <div className='col'>
        <div className='container' style={colcontainer}>
          <img src={logo} style={logoImage} alt="Logo 1" />
        </div>
</div>
<div className='col'>
  <div className='container' style={colcontainer}>
    <img src={logo2} style={logo2Style} alt="Logo 2" />
  </div>
</div>
<div className='col'>
  <div className='container' style={colcontainer}>
            <h4>Hello guest</h4>
            <div className='row'>
              <div className='col'>
                <button style={buttonStyle} onClick={openAuthModal}>
                  Login/Sign Up
                </button>
              </div>
              <div className='col'>
                <button style={buttonStyle} onClick={createDogHouse}>Add a Place</button>   
              </div>
            </div>

                
  </div>
</div>
</div>
<AuthModal isOpen={authModalIsOpen} onClose={closeAuthModal} /> 

</div>

);
}

export default Navbar;