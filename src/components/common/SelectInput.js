import React from "react";
import PropTypes from "prop-types";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  options
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <div id="dd" class="wrapper-dropdown-3" tabindex="1">
          <span>Transport</span>
          <ul class="dropdown">
            <li><a href="#"><i class="icon-envelope icon-large"></i>Classic mail</a></li>
            <li><a href="#"><i class="icon-truck icon-large"></i>UPS Delivery</a></li>
            <li><a href="#"><i class="icon-plane icon-large"></i>Private jet</a></li>
          </ul>
        </div>
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
        >
          <option value="">{defaultOption}</option>
          {options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

SelectInput.defaultProps = {
  defaultOption: "",
  value: "",
  error: "",
  options: []
};

export default SelectInput;
