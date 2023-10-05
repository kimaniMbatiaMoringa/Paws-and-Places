import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'


const mainBackground ={
    backgroundColor:"#FCFBF3",
    overflow:"hidden",
    display: "flex"
}
const cardStyle = {
  width: "300px",
  height: "750px",
  margin: "20px",
  display: "inline",
  //border: "2px solid black"
}

const cardImageStyle = {
  width: "100%",
  height: "50%",
  backgroundColor: "grey",
  borderRadius: "10px 10px 2px 2px"
}

// const cardInfoStyle = {
//   height: "30%",
//   width: "100%",
//   backgroundColor: "white",
//   fontFamily:"fantasy",
//   textAlign: "center"
// }
const cardInfoStyle = {
  height: "30%",
  width: "100%",
  backgroundColor: "white",
  fontFamily: "Nirmala-Bold",
  textAlign: "center",
  fontSize: "16px",
  lineHeight: "0.6",
  margin: "0",
  padding: "10px",
  alignItems: "center", 
};


const cardFooterStyle={
    position:"relative",
    height:"8%",
    width: "100%",
    top: "-5%",
    textAlign:"center",
    backgroundColor: "#87a630",
    borderRadius: "1px 1px 20px 20px"
}

const buttonStyle={
    //marginLeft:"100px",
    //marginTop: "-15%",
    position: 'relative',
    backgroundColor: "#87a630",
    width: "150px",
    height:'30px',
    color: "white",
    borderRadius: '20px',
    fontFamily:'Nirmala-Bold',
    marginTop: '10px',
    border: "2pt solid white",
}

function StoryArea({places, setPlacefunc}) {
  
  const [displayMore, setdisplayMore]= useState(false)
  const [searchFilter, setSearchFilter] = useState("")




  return (
    <div className='container-fluid' style={mainBackground}>
        <div className='row'>
      {places.map((place, index) => (
        <div className='container-fluid' style={cardStyle} key={index}>
          <div className='container' style={cardImageStyle}>
            <img src={place.image_url} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className='container' style={cardInfoStyle}>
            <h3>{place.name}</h3>
            <h6>{place.location}</h6>
            <p>{place.description}</p><p>Price per night: ${place.price_per_night}</p>
            {/* <p style={{fontSize:"12px"}}>Amenities: {place.amenities}</p> */}
            {/* <p>Email: {place.email}</p>
            <p>Date Created: {place.date_created}</p> */}
          </div>
          <div className='container' style={cardFooterStyle} id={place.id}>
            <button id={place.id} style={buttonStyle} onClick={setPlacefunc}>Show More</button>
          </div>
        </div>
      ))}
        </div>
    </div>

  )
}

export default StoryArea;
