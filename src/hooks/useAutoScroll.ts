import React, {RefObject} from 'react';

interface IUseAutoScrollReturn {
  ref: RefObject<HTMLDivElement>;
  scrollToFirstError: () => void;
}

/**
 * @description Custom hook for auto scroll to the first error of the form.
 * @component useAutoScroll
 * @returns {ref, scrollToFirstError} scrollToFirstError
 */
const useAutoScroll = (): IUseAutoScrollReturn => {
  const ref: RefObject<HTMLDivElement> = React.useRef(null);

  /**
   * @function scrollToFirstError
   * @description Function which auto scrolls the user to the first error on that page
   * @returns void
   */
  const scrollToFirstError = () => {
    /* setTimeout helps to get updated values of form error states */
    setTimeout(() => {
      const firstErrorElement = ref?.current?.querySelectorAll(
        `[data-error="error"]`,
      );

      /* 
         if an error element is found it scrolls the user to the first error element and focus on it
      */
      if (firstErrorElement && firstErrorElement?.length > 0) {
        firstErrorElement[0].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'start',
        });
        (firstErrorElement[0] as HTMLElement)?.focus({
          preventScroll: true,
        });
      }
    }, 0);
  };

  return {ref, scrollToFirstError};
};

export default useAutoScroll;
