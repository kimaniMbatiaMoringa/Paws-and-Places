import React from 'react';
import fb from './assets/facebook.png'
import x from './assets/logo-x.jpeg'
import instagram from './assets/instagram.png'

const mainFooterStyle = {
  height: "300px",
  backgroundColor: "#DA9455",
  marginBottom: "0px",
  color: "white",
  padding: "20px",
};

const contactStyle = {
  fontSize: "18px",
  fontWeight: "bold",
};

const footerContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "block",
  justifyContent: "center",
  verticalalign:"baseline",
  fontFamily: "Nirmala-Bold"
};

const socialLinksStyle = {
  marginTop: "20px",
};

function Footer() {
  return (
    <div className='container-fluid' style={mainFooterStyle}>
      <div className='row' style={footerContentStyle}>
        <div className='col-md-4'>
          <h4>Contact Us</h4>
          <p>+254 727 444 777</p> 
          <p>info@pawsandplaces.com</p>
        </div>
        <div className='col-md-4'>
          <div style={contactStyle}>CONNECT WITH US</div>
          <div style={socialLinksStyle}>
            <div className='row'>
              <div className='col-sm-1'>
                <a href='#'><img src={fb} style={{height:"30px",width:"30px"}}></img></a>
                <br></br>
              </div>
              <div className='col-sm-1'>
                <a href='#'><img src={x} style={{height:"30px",width:"30px"}}></img></a>
                <br></br>
              </div>
              <div className='col-sm-1'>
              <a href='#'><img src={instagram} style={{height:"30px",width:"30px"}}></img></a>
                <br></br>
              </div>
            </div>

          </div>
        </div>
        <div className='col-md-4'>
        <h6>© Copyright Paws & Places 2023</h6>
        </div>
      </div>
    </div>
  );
}

export default Footer;
