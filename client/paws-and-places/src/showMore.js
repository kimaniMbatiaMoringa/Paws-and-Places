import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import CreateReview from './createReview';

function ShowMore({selectedPlace, reviews_obj,userIds}){
    //const [place, setPlace] = useState([]);
    

    const navigate = useNavigate();

    const mainContainer={
        //border:"2px solid black",
        height:"550px",
        marginTop:"30px"
    }

    const cardImageStyle = {
        width: "300px",
        height: "400px",
        backgroundColor: "grey",
        borderRadius: "10px 10px 2px 2px"
      }

      const placeStyle={
        fontFamily: "Forte-Regular",
        fontSize: "72pt"
      }

      const buttonStyle={
        //marginLeft:"100px",
        //marginTop: "-15%",
        position: 'relative',
        backgroundColor: "#87a630",
        width: "150px",
        height:'50px',
        color: "white",
        top: '50px',
        borderRadius: '20px',
        fontFamily:'Nirmala-Bold',
        
    }

    const reviewContainer={
        padding:"60px", 
        textAlign:"center"
    }

/*     userIds.forEach(user=>{
        fetch(`https://paws-and-places-server.onrender.com/users/${user}`)
        .then((response) => response.json())
        .then(response =>{
          alert(response)
        }
        )}) */

    function goBack(){
        navigate('/') 
    }

    function addReview(){
        alert("clicked")
    }

    return(
        <div className='container'>
                <div className='container' style={mainContainer}>
                    <div className='row'>
                        <div className='col-5' style={{marginRight:"15px"}}>
                            <div className='container' style={cardImageStyle}>
                                <img src={selectedPlace.image_url} alt={selectedPlace.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className='col'>
                            <h3 style={placeStyle}>{selectedPlace.name}</h3>
                            <h3>{selectedPlace.description}</h3>
                            <h5>{selectedPlace.location}</h5>
                            <p>{selectedPlace.amenities}</p>
                            <h6>${selectedPlace.price_per_night} per Night</h6>
                            <button style={buttonStyle} onClick={goBack}>Back</button>
                        </div>
                    </div>
                </div>
                <div className='container' style={reviewContainer}>
                        <h2>Reviews</h2>
                        {reviews_obj.map((review, index) => (
                            <div className='container-fluid'>
                                <div className='row'>
                                    <div className='col'>
                                        <h4>{review.rating} /5</h4>
                                    </div>
                                    <div className='col'>
                                    <h6>{review.username}</h6>
                                    <h4>{review.title}</h4>
                                        <h6>{review.body}</h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* <button style={buttonStyle} onClick={addReview}>Add review</button> */}
                    </div>
                    <div className='container' style={{height:"400px"}}>
                        <CreateReview selectedPlace={selectedPlace} />
                    </div>
                    
        </div>
  )

}

export default ShowMore