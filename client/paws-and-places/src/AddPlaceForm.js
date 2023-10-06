// import React, { useState } from 'react';
// import Modal from 'react-modal';

// const modalStyle = {
//   content: {
//     width: '400px',
//     margin: 'auto',
//     padding: '20px',
//   },
// };

// function AddPlaceForm() {
//   const [formData, setFormData] = useState({
//     amenities: '',
//     description: '',
//     image_Url: '',
//     location: '',
//     name: '',
//     price_Per_Night: '',
    
    
//   });

//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       photo: file,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://paws-and-places-server.onrender.com/doghouses', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         console.log('Place added successfully');
//         setFormData({
//           amenities: '',
//           description: '',
//           image_Url: '',
//           location: '',
//           name: '',
//           price_Per_Night: '',
         
//         });
//         setModalIsOpen(false);
        
//       } else {
//         console.error('Failed to add place');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

  
//   const reloadDogHousesData = () => {
//   };

//   return (
//     <div>
//       <button onClick={() => setModalIsOpen(true)}>Add a Place</button>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         style={modalStyle}
//         contentLabel="Add a Place Modal"
//       >
//         <h2>Paws & Places</h2>
//         <h3>Create a Place</h3>
//         <form onSubmit={handleSubmit}>
//           {/* <div>
//             <label>Upload Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               name="photo"
//               onChange={handleFileChange}
//               required
//             />
//           </div> */}
//           <div>
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Location:</label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Description:</label>
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Price Per Night:</label>
//             <input
//               type="text"
//               name="pricePerNight"
//               value={formData.pricePerNight}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
          
//           <div>
//             <label>Image URL:</label>
//             <input
//               type="text"
//               name="imageUrl"
//               value={formData.imageUrl}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Amenities:</label>
//             <input
//               type="text"
//               name="amenities"
//               value={formData.amenities}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
          
//           <div>
//             <button type="submit">Submit</button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }

// export default AddPlaceForm;
import React, { useState } from 'react';
import Modal from 'react-modal';


const modalStyle = {
  content: {
    width: '400px',
    margin: 'auto',
    padding: '20px',
  },
};

function AddPlaceForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    price_Per_Night: '',
    image_Url: '',
    amenities: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any validation you need here before submitting the form
    onSubmit(formData);
    // Clear the form fields and close the modal
    setFormData({
      name: '',
      location: '',
      description: '',
      price_Per_Night: '',
      image_Url: '',
      amenities: '',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose = {onClose}
      style={{
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        },
      }}
      contentLabel="Add a Place Modal"
    >
      <h2>Paws & Places</h2>
      <h3>Create a Place</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price Per Night:</label>
          <input
            type="text"
            name="price_Per_Night"
            value={formData.price_Per_Night}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_Url"
            value={formData.image_Url}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Amenities:</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Modal>
  );
}

export default AddPlaceForm;
