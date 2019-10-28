import React from 'react';

/** Attaches an event listener for `eventName` to `window`. */
export default function useEvent(eventName = '', eventHandler = () => {}) {
  React.useEffect(() => {
    window.addEventListener(eventName, eventHandler);
    return () => window.removeEventListener(eventName, eventHandler);
  }, []);
}
