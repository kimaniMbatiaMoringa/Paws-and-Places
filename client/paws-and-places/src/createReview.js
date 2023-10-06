import React, { useState, useEffect } from 'react';

function CreateReview(selectedPlace){
    const [formData, setFormData]=useState({
        title:'',
        body: '',
        rating:'',
        doghouse_id: selectedPlace

    })

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

    const handleFormSubmit =(e)=>{
        //fetch(`https://paws-and-places-server.onrender.com/doghouses/${placeId}/reviews`)
        //.then((response) => response.json())
        //.then((reviews) => {
        //  setReviews(reviews)
        //    })
        //.catch((error) => {
        //  console.error('Error fetching reviews:', error);
        }
    return(
        <div className='container' style={{textAlign:"center"}}>
            <h1>Add a review</h1>
            <div className='row' style={{height:""}}>
                <label htmlFor='title'></label>
                <input 
                    type="text"
                    id= "title"
                    name="title"
                    value={formData.title}
                    placeholder='Title'
                />
            </div>
            <div className='row' style={{height:"100px"}}>
                <label htmlFor='body'></label>
                    <input 
                    type="text"
                    id= "body"
                    name="body"
                    value={formData.body}
                    placeholder='Body'
                />
            </div>
            <label htmlFor='rating'>Rating</label>
                <select id= "rating" name="rating" value={formData.body}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button style={buttonStyle} onClick={handleFormSubmit}>Add Review</button>           
        </div>
    )
}

export default CreateReview