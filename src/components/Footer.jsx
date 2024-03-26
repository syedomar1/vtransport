import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#374151',
      color: 'white',
      textAlign: 'center',
      padding: '5px',
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
    }}>
      <p style={{ fontSize: '0.8rem' }}>© 2024 Copyright: Vellore Institute of Technology</p>
    </footer>
  );
}
