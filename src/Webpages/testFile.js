// src/App.js
import React, { useEffect, useState } from 'react';

const TestFile = () => {
  const [yearList, setYearList] = useState([]);


  function getYearsFromArray(currentYear, oldestYear){
    let years = [];
    for (let year = currentYear; year > oldestYear - 1; year--) {
      years.push(year);
    }

    return years;
  }
  
  useEffect(() => {
    const getYears = getYearsFromArray(2025, 1940);
    setYearList(getYears);
  }, [])
  

    // ADD YEAR FROM 1960 TO 2024 IN DESCENDING ORDER

  return (
    <div>
      <div>Years: </div>
      <select name='year' id='year'>
          {yearList.map((year) => (
            <option value={year}>{year}</option>
          ))}
      </select>
        
    </div>
  );
  };

export default TestFile;
