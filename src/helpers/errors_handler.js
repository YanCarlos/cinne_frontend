import React from 'react';

export default function errorsHandler(errors) {
  return (
    <div>
    {
      Object.keys(errors).map((error, index) => (
        <div key={index}>{errors[error]}</div>
      ))
    }
    </div>
  );
}
