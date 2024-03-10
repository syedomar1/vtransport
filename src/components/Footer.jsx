import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#374151', // Example background color
      color: 'white', // Example text color
      textAlign: 'center', // Example text alignment
      padding: '5px', // Example padding
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%'
    }}>
      <p style={{ fontSize: '0.8rem' }}>© 2024 Copyright: Vellore Institute of Technology</p>
    </footer>
  );
}