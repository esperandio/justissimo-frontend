import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CustomResponseComponent from './CustomResponseComponent';

/**
 * We need to use a component here because the "customResponseHandler" is registered only once on the chat instance
 * and it needs to be able to access the previous state so it can add elements to it. You can't do that using react
 * hooks since any callbacks have to be recreated if their dependencies change.
 */
function CustomResponsePortalsContainer({ instance }) {
  // This state will be used to record all of the custom response events that are fired from the widget.
  // These events contain the HTML elements that we will attach our portals to as well as the messages that we wish to
  // render in the message.
  const [customResponseEvents, setCustomResponseEvents] = useState([]);

  // When the component is mounted, register the custom response handler that will store the references to the custom
  // response events.
  useEffect(() => {
    // This handler will fire each time a custom response occurs and we will update our state by appending the event
    // to the end of our elements list.
    function customResponseHandler(event) {
      // Use functional updates since the state is computed and we can get the previous value of the events array.
      // Passing in a reference to customResponseEvents and concatenating to it will not work since this function will
      // capture the initial value of customResponseEvents, which is empty, and not updates made to it.
      setCustomResponseEvents(eventsArray => eventsArray.concat(event));
    }
    
    instance.on({ type: 'customResponse', handler: customResponseHandler });

    // Remove the custom response handler.
    return () => {
      instance.off({ type: 'customResponse', handler: customResponseHandler });
    };
  }, [instance]);

  // All we need to do to enable the React portals is to render each portal somewhere in your application (it
  // doesn't really matter where).
  return (
    <>
      {customResponseEvents.map(function mapEvent(event, index) {
        return (
          // eslint-disable-next-line
          <CustomResponseComponentPortal key={index} hostElement={event.data.element}>
            {/* This is your custom response component. It can be whatever you like that renders the given message
             in whatever manner your application needs. */}
            <CustomResponseComponent message={event.data.message} />
          </CustomResponseComponentPortal>
        );
      })}
    </>
  );
}

CustomResponsePortalsContainer.propTypes = {
  instance: PropTypes.object.isRequired,
};

/**
 * This is the component that will attach a React portal to the given host element. The host element is the element
 * provided by the chat widget where your custom response will be displayed in the DOM. This portal will attached
 * any React children passed to it under this component so you can render the response using your own React
 * application. Those children will be rendered under the given element where it lives in the DOM.
 */
function CustomResponseComponentPortal({ hostElement, children }) {
  return ReactDOM.createPortal(children, hostElement);
}

export default CustomResponsePortalsContainer;