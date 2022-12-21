import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Form({ addTask }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length !== 0) {
      addTask(name);
    }
    setName('');
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
          <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            value={name}
            onChange={handleChange}
          />
        </label>
      </h2>

      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

Form.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default Form;
