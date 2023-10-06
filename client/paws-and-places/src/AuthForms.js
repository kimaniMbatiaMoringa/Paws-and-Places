// import React, { useState } from 'react';
// import Modal from 'react-modal';

// const modalStyle = {
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', 
//     zIndex: 1000, 
//   },
//   content: {
//     width: '400px',
//     height: '400px',
//     margin: 'auto',
//     padding: '40px',
//     borderRadius: '10px',
//     boxShadow: '10px 10px 10px 10px rgba(0,0,0,0.5)', 
//     backgroundColor: 'white', 
//     fontsize: '40px',
//     backgroundColor:'yellow'
//   },
// };

// function AuthModal({ isOpen, onClose, onLogin, onSignup, onLogout }) {
//   const [showLogin, setShowLogin] = useState(true);
//   const [showSignup, setShowSignup] = useState(false);

//   const [loginUsername, setLoginUsername] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');

//   const [signupName, setSignupName] = useState('');
//   const [signupEmail, setSignupEmail] = useState('');
//   const [signupUsername, setSignupUsername] = useState('');
//   const [signupPassword, setSignupPassword] = useState('');

//   const toggleForm = () => {
//     setShowLogin(!showLogin);
//     setShowSignup(!showSignup);
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('https://paws-and-places-server.onrender.com/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: loginUsername,
//           password: loginPassword,
//         }),
//       });

//       if (response.ok) {
        
//         onLogin();
//         setLoginUsername('');
//         setLoginPassword('');
//         onClose();
//       } else {
//         console.error('Login failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleSignup = async () => {
//     try {
//       const response = await fetch('https://paws-and-places-server.onrender.com/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: signupName,
//           email: signupEmail,
//           username: signupUsername,
//           password: signupPassword,
//         }),
//       });

//       if (response.ok) {
//         onSignup();
//         setSignupName('');
//         setSignupEmail('');
//         setSignupUsername('');
//         setSignupPassword('');
//         onClose();
//       } else {
//         console.error('Signup failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleLogout = () => {
//     onLogout();
//     onClose();
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       style={modalStyle}
//       contentLabel="Authentication Modal"
//     >
//       {showLogin && (
//         <>
//           <h2>Login</h2>
//           <input
//             type="text"
//             placeholder="Username"
//             value={loginUsername}
//             onChange={(e) => setLoginUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={loginPassword}
//             onChange={(e) => setLoginPassword(e.target.value)}
//           />
//           <br />
//           <button onClick={handleLogin}>Login</button>
//           <h6>Don't have an account?</h6>
//           <button onClick={toggleForm}>Sign Up</button>
//         </>
//       )}

//       {showSignup && (
//         <>
//           <h2>Sign Up</h2>
//           <input
//             type="text"
//             placeholder="Name"
//             value={signupName}
//             onChange={(e) => setSignupName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={signupEmail}
//             onChange={(e) => setSignupEmail(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Username"
//             value={signupUsername}
//             onChange={(e) => setSignupUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={signupPassword}
//             onChange={(e) => setSignupPassword(e.target.value)}
//           />
//           <br />
//           <button onClick={handleSignup}>Sign Up</button>
//           <button onClick={toggleForm}>Back to Login</button>
//         </>
//       )}

      
//       <button onClick={handleLogout}>Logout</button>
//     </Modal>
//   );
// }

// export default AuthModal;
import React, { useState } from 'react';
import Modal from 'react-modal';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    width: '400px',
    height: '350px',
    margin: 'auto',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '10px 10px 10px 10px rgba(0,0,0,0.5)',
    backgroundColor: 'white',
    fontsize: '50px',
    backgroundColor: 'pink',
    fontcolor: ' dark-black',
  },
};

function AuthModal({ isOpen, onClose, onLogin, onSignup, onLogout }) {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const toggleForm = () => {
    setShowLogin(!showLogin);
    setShowSignup(!showSignup);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://paws-and-places-server.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      if (response.ok) {
        onLogin();
        setLoginUsername('');
        setLoginPassword('');
        onClose();
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('https://paws-and-places-server.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          username: signupUsername,
          password: signupPassword,
        }),
      });

      if (response.ok) {
        onSignup();
        setSignupName('');
        setSignupEmail('');
        setSignupUsername('');
        setSignupPassword('');
        onClose();
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyle}
      contentLabel="Authentication Modal"
    >
      {showLogin && (
        <>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Login</button>
          <h6>Don't have an account?</h6>
          <button onClick={toggleForm}>Sign Up</button>
        </>
      )}

      {showSignup && (
        <>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <br />
          <button onClick={handleSignup}>Sign Up</button>
          <button onClick={toggleForm}>Back to Login</button>
        </>
      )}

      <button onClick={handleLogout}>Logout</button>
    </Modal>
  );
}

export default AuthModal;
