import React from 'react';

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
  verticalalign:"baseline"
};

const socialLinksStyle = {
  marginTop: "20px",
};

function Footer() {
  return (
    <div className='container-fluid' style={mainFooterStyle}>
      <div className='row' style={footerContentStyle}>
        <div className='col-md-4'>
          <p>paws and places</p>
          <p>+254 727 444 777</p> 
          <p>info@pawsandplaces.com</p>
        </div>
        <div className='col-md-4'>
          <div style={contactStyle}>CONNECT WITH US</div>
          <div style={socialLinksStyle}>
            <a href='#'>Facebook</a>
            <br></br>
            <a href='#'>Twitter</a>
            <br></br>
            <a href='#'>Instagram</a>
          </div>
        </div>
        <div className='col-md-4'>
          
        </div>
      </div>
    </div>
  );
}

export default Footer;
