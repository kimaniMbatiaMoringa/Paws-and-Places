// import {Routes, Route} from 'react-router-dom'
// import {useNavigate} from 'react-router-dom'
// import logo from './logo.svg';
// import './App.css';
// import Navbar from './navbar';
// import StoryArea from './storyarea';
// import ShowMore from './showMore';
// import Footer from './footer';
// import { useState, useEffect } from 'react';

// function App() {

//   const [places, setPlaces] = useState([]);
//   const [place, setPlace] = useState([]);
//   const [rawReviews, setRawReviews] = useState([])
//   const [reviews_obj, setReviews] = useState([]);
//   const [userIds , setUserIds] = useState([])


//   const navigate = useNavigate();

//   const BASE_URL = "https://paws-and-places-server.onrender.com/doghouses"

//   useEffect(() => {
//     fetch(BASE_URL)
//     .then((response)=> response.json())
//     .then((data)=>{
//         setPlaces(data)
//     })
//   }, []);


//   function setPlacefunc(event){       //Gets the reviews for a place when "Show More" is clicked
//     //setdisplayMore(true)
//     let placeId = event.target.id
//     const match = places.find((item)=>item.id==placeId)
//     setPlace(match)
//     //alert(match.name)
//     fetch(`https://paws-and-places-server.onrender.com/doghouses/${placeId}/reviews`) 
//     .then((response) => response.json())
//     .then((response) => {
//       setRawReviews(response)
//         })
//     .catch((error) => {
//           console.error('Error fetching reviews:', error);
//         });
    
//     let amendedReviews=[]
//     rawReviews.forEach(review=>{
//       let obj ={
//             "body": review.body ,
//             "doghouse_id": review.doghouse_id,
//             "id": review.id,
//             "rating": review.rating,
//             "status": null,
//             "title": review.title,
//             "user_id":review.user_id,
//             "username": "kimbo"
//       }
//       fetch(`https://paws-and-places-server.onrender.com/users/${review.user_id}`)
//       .then((response)=>response.json())
//       .then((response)=>{
//         obj['username'] = response.username
//         //alert(obj.username)
//         amendedReviews.push(obj)
//       })
//     })
//     setReviews(amendedReviews)
//     navigate('showMore')    
//   }

// /*   function getReviewUsers(){
//     //get all the user_id in reviews_obj
//     let userIdArr=[]
//     let userObjArr=[]
//       reviews_obj.forEach(review=>{
//         alert(review.user_id)
//         userIdArr.push(review.user_id)
//       })
//       setUserIds(userIdArr)    
//     }
//      */
//     return (
//       <>
//       <Navbar />
//       <Routes>
//         < Route path="/" element={<StoryArea places={places} setPlacefunc={setPlacefunc} />}></Route>
//         placeIsSelected?(< Route path="/showMore" element={<ShowMore selectedPlace={place} reviews_obj={reviews_obj} userIds={userIds} />}></Route>:)
//       </Routes>
//       <Footer />
//       </>
  
//     );
    
//   }
  
// export default App;

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Navbar from './navbar';
import StoryArea from './storyarea';
import Footer from './footer';
import AddPlaceForm from './AddPlaceForm';
import AuthModal from './AuthForms';
import ShowMore from './showMore';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState([]);
  const [rawReviews, setRawReviews] = useState([]);
  const [reviews_obj, setReviews] = useState([]);
  const [userIds, setUserIds] = useState([]);

  const navigate = useNavigate();
  const buttonStyle = {
    backgroundColor: 'white',
    width: '150px',
    height: '50px',
    border: '5pt solid white',
    color: 'white',
    borderRadius: '20px',
    fontFamily: 'Nirmala-Bold',
    color: '#87a630',
    cursor: 'pointer',
    margin: '5px',
  };
  useEffect(() => {
    // Fetch places data
    const BASE_URL = "https://paws-and-places-server.onrender.com/doghouses";
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data);
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
      });
  }, []);

  const openAuthModal = () => {
    setModalIsOpen(true);
  };

  const closeModals = () => {
    setModalIsOpen(false);
  };

  const setPlacefunc = (event) => {
    let placeId = event.target.id;
    const match = places.find((item) => item.id === placeId);
    setPlace(match);

    fetch(`https://paws-and-places-server.onrender.com/doghouses/${placeId}/reviews`)
      .then((response) => response.json())
      .then((response) => {
        setRawReviews(response);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });

    let amendedReviews = [];
    rawReviews.forEach((review) => {
      let obj = {
        "body": review.body,
        "doghouse_id": review.doghouse_id,
        "id": review.id,
        "rating": review.rating,
        "status": null,
        "title": review.title,
        "user_id": review.user_id,
        "username": "kimbo"
      };
      fetch(`https://paws-and-places-server.onrender.com/users/${review.user_id}`)
        .then((response) => response.json())
        .then((response) => {
          obj['username'] = response.username;
          amendedReviews.push(obj);
        });
    });
    setReviews(amendedReviews);

    navigate('showMore');
  };

  return (
    <>
      <Navbar openAuthModal={openAuthModal} setPlacefunc={setPlacefunc} />
      <Routes>
      <Route path="/" element={<StoryArea places={places} setPlacefunc={setPlacefunc} />} />
      <Route path="/addPlace" element={<AddPlaceForm modalIsOpen={modalIsOpen} setModalIsOpen={closeModals} />} />
      <Route path="/showMore" element={<ShowMore selectedPlace={place} reviews_obj={reviews_obj} userIds={userIds} />} />
      </Routes>
      <Link to="/addPlace">
      <button style={buttonStyle}>Add a Place</button>
      </Link>
      <Footer />
      <AuthModal isOpen={modalIsOpen} onClose={closeModals} />
    </>
  );
}

export default App;
