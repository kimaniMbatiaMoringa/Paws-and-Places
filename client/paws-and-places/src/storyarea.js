import React, { useState, useEffect } from 'react';

const mainBackground ={
    backgroundColor:"#FCFBF3",
    overflow:"hidden",
    display: "flex"
}
const cardStyle = {
  width: "300px",
  height: "550px",
  paddingTop: "20px",
  display: "inline"
}

const cardImageStyle = {
  width: "100%",
  height: "70%",
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
  fontFamily: "fantasy",
  textAlign: "center",
  fontSize: "16px",
  lineHeight: "0.6",
  margin: "0",
  padding: "10px",
  alignItems: "center", 
};


const cardFooterStyle={
    backgroundColor:"#BA4D39",
    height:"10%",
    width: "100%",
}

function StoryArea() {
  const [places, setPlaces] = useState([]);

  let tempPlaces = [
    {
      "name": "Cozy Pet Haven",
      "location": "123 Main Street",
      "description": "A cozy place for your furry friends.",
      "price_per_night": 50,
      "image_url": "https://photos.bringfido.com/photo/2023/09/28/OR_Thumb.jpeg?size=tile&density=2x",
      "amenities": ["WiFi", "Pet Spa"],
      "email": "cozy@pethaven.com",
      "date_created": "2023-10-01"
    },
   
    
  ];

  useEffect(() => {
    setPlaces(tempPlaces);
  }, []);

  return (
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
            <p>Amenities: {place.amenities.join(', ')}</p>
            <p>Email: {place.email}</p>
            <p>Date Created: {place.date_created}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StoryArea;
