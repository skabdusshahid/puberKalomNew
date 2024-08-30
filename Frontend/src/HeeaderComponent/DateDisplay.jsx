import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const DateDisplay = ({ className, labelClassName }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = currentDate.toLocaleDateString('bn-BD', options);

  return (
    <div className={className}>
      <label className={labelClassName}>
        {formattedDate} 
      </label>
    </div>
  );
};

export default DateDisplay;
