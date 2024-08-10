import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const EquipmentModel = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
 //   backgroundColor: '#282c34',
  };

  const imageStyle = {
    width: '90%',
    maxWidth: '800px',
    animation: 'swing 10s linear infinite',
    cursor: 'pointer', // Change cursor to pointer on hover
  };

  const keyframesStyle = `
    @keyframes swing {
      0%, 100% {
        transform: rotateY(0deg);
      }
      50% {
        transform: rotateY(35deg);
      }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{keyframesStyle}</style>
      <img
        src="../../assets/3D.png"
        alt="Equipment Model"
        style={imageStyle}
        onClick={() => navigate('/Equipment')} // Navigating on click
      />
    </div>
  );
};

export default EquipmentModel;
