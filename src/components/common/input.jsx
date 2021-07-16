import * as React from 'react';

export const Input = ({name, label, value, onChange, error, type}) => {
   return (<div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
         value={value}
         onChange={onChange}
         autoFocus
         type={type}
         id={name}
         name={name}
         className="form-control"
      />

      {error && <div className="alert alert-danger mt-2">{error}</div>}
   </div>);
};
