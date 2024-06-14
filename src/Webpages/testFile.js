import React, { useState, useEffect } from 'react';

const TestFile = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to update the window width state
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // Use useEffect to add an event listener for window resize
  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  return (
    <div style={{ width: windowWidth , backgroundColor: 'red'}}>
      This div adjusts its width based on the window width.
    </div>
  );
};

export default TestFile;
