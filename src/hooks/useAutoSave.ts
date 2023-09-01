import React from 'react';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from 'globals/global.functions';
import {
  DEFAULT_AUTO_SAVE_TIMEOUT,
  LOCAL_STORAGE_KEY,
} from 'globals/global.constants';

interface IUseAutoSaveParams {
  onSave: (isUnmount?: boolean) => void;
  isTimer?: boolean;
  timeOut?: number;
}

interface IUseAutoSaveReturn {
  onChangeAutoSave: () => void;
  resetAutoSave: () => void;
}

/**
 * @function useAutoSave
 * @description custom hook to handle auto save of the form
 * @param {IUseAutoSaveParams}
 * @returns {onChangeAutoSave, resetAutoSave}
 */
const useAutoSave = ({
  onSave,
  isTimer = true,
  timeOut = DEFAULT_AUTO_SAVE_TIMEOUT,
}: IUseAutoSaveParams): IUseAutoSaveReturn => {
  /**
   * store the latest reference of onSave fn, this is required while unmounting the component
   */
  const onSaveRef = React.useRef(onSave);

  /**
   * isTimerCompleted is created due to the closure of setTimeout,
   * we cann't save the form with latest state directly inside setTimout.
   */
  const [isTimerCompleted, setIsTimerCompleted] = React.useState<boolean>(
    false,
  );

  /**
   * @function onChangeAutoSave
   * @description function to get call on each onChange of the form, setTimer and store value in LS.
   */
  const onChangeAutoSave = () => {
    let timer: ReturnType<typeof setTimeout> | null = getLocalStorage(
      LOCAL_STORAGE_KEY.AUTO_SAVE_TIMER,
    );

    if (isTimer) {
      if(!timer) {
        timer = setTimeout(() => {
          removeLocalStorage(LOCAL_STORAGE_KEY.AUTO_SAVE_TIMER);
          setIsTimerCompleted(true);
        }, timeOut);
        setLocalStorage(LOCAL_STORAGE_KEY.AUTO_SAVE_TIMER, timer);
      }
    } else {
      setLocalStorage(LOCAL_STORAGE_KEY.AUTO_SAVE_TIMER, !isTimer);
    }
  };

  const resetAutoSave = () => {
    const timer: ReturnType<typeof setTimeout> | null = getLocalStorage(
      LOCAL_STORAGE_KEY.AUTO_SAVE_TIMER,
    );

    if (timer && isTimer) {
      clearTimeout(timer);
    }
    removeLocalStorage(LOCAL_STORAGE_KEY.AUTO_SAVE_TIMER);
  };

  /**
   * save the form when setTimeout is completed.
   */
  React.useEffect(() => {
    if (isTimerCompleted) {
      onSave();
      setIsTimerCompleted(false);
    }
    onSaveRef.current = onSave; //store the latest reference of onSave fn.
  }, [isTimerCompleted, onSave]);

  /**
   * save data and reset timer on component unmount.
   * display unsaved data warning while refreshing the page if timer is ON.
   */
  React.useEffect(() => {
    //empty ls timer on first load
    if (getLocalStorage(LOCAL_STORAGE_KEY.AUTO_SAVE_TIMER)) {
      resetAutoSave();
    }

    window.addEventListener('beforeunload', (event: any) => {
      if (getLocalStorage(LOCAL_STORAGE_KEY.AUTO_SAVE_TIMER)) {
        event.returnValue = '';
      }
    });

    //unmounting of the component
    return () => {
      if (getLocalStorage(LOCAL_STORAGE_KEY.AUTO_SAVE_TIMER)) {
        isTimer && onSaveRef.current(true); //isTimer is prop onSaveRef is a submit fn

        resetAutoSave();
      }
      window.removeEventListener('beforeunload', () => {});
    };
  }, []);

  return {onChangeAutoSave, resetAutoSave};
};

export default useAutoSave;
