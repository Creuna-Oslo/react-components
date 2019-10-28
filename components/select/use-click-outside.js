import useEvent from './use-event';

/** Executes the provided callback when a click event occurs outside of the provided ref */
const useClickOutside = (ref, callback = () => {}) => {
  useEvent('mousedown', e => {
    if (
      ref.current &&
      e.target !== ref.current &&
      !ref.current.contains(e.target)
    ) {
      callback();
    }
  });
};

export default useClickOutside;
