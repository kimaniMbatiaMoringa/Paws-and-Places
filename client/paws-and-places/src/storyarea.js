import React, {useState, useEffect} from 'react';

const mainBackground ={
    backgroundColor:"#FCFBF3",
    overflow:"hidden"
}

const cardStyle={
    width:"400px",
    height:"550px",
    paddingTop: "20px"
}

const cardImageStyle={
    width:"100%",
    height: "70%",
    backgroundColor:"grey",
    borderRadius: "20px 20px 1px 1px"
}

const cardInfoStyle={
    height: "20%",
    width: "100%",
    backgroundColor:"white",
    fontFamily:'Nirmala-Bold',
    textAlign: "center"
}

const cardFooterStyle={
    backgroundColor:"#BA4D39",
    height:"10%",
    width: "100%",
}

function StoryArea(){
    const [places,setPlaces]=useState([])

    let tempPlaces=[
        {location:"Kipkembo Kennels", placeAddress:"23 Kijabe Street, CBD"},
        {placeName:"RSPCA-K", placeAddress:"Argwings Kodhek Rd, Kilimani"},
        {placeName:"Nairobi Kennel Union", placeAddress:"21 Langata Road, Karen"},
        {placeName:"Adopt A Dog", placeAddress:"Funmall, Ring road, Westlands"}
    ]

    useEffect(()=>{
        setPlaces(tempPlaces)
    })
    
    return(
        <div className='row'>
        {places.map(place=>(
            <div className='container-fluid' style={cardStyle}>
            <div className='container' style={cardImageStyle}>
            </div>
            <div className='container' style={cardInfoStyle}>
                <h3>{place.placeName}</h3>
                <h6>{place.placeAddress}</h6>
            </div>
            <div className='container' style={cardFooterStyle}>
            </div>
        </div>
        ))}

        </div>

    )
}

export default StoryArea