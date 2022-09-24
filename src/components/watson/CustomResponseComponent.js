import React, { useState } from "react";
import { DatePicker, DatePickerInput} from "carbon-components-react";
import PropTypes from "prop-types";

/**
 * Your custom response component can also make use of the message object if you have set "user_defined" variables.  
 */
function CustomResponseComponent() {
  const [datePickerElement, setDatePickerElement] = useState(null);

  return (
    <>
      {datePickerElement && (
        <DatePicker datePickerType="range" appendTo={datePickerElement}>
          <DatePickerInput id="date-picker-input-id-start" placeholder="mm/dd/yyyy" labelText="Start date" />
          <DatePickerInput id="date-picker-input-id-finish" placeholder="mm/dd/yyyy" labelText="End date" />
        </DatePicker>
      )}
      {/* This is where the date picker popup will appear. */}
      <div ref={setDatePickerElement} style={{ position: "relative" }} />
    </>
  )
}

CustomResponseComponent.propTypes = {
  message: PropTypes.object,
};

export default CustomResponseComponent;