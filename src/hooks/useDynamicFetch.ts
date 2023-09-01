import {useEffect, useState} from 'react';
import {useAppDispatch} from './reduxHooks';

function useDynamicFetch(props: any) {
  const dispatch: any = useAppDispatch();
  const {ref, limit, action} = props;
  const scrollElement = ref.current;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [scrollElement, offset]);

  const handleScroll = async () => {
    if (
      scrollElement.scrollTop + scrollElement.clientHeight >=
      scrollElement.scrollHeight
    ) {
      const newOffset = limit + offset;
      setOffset(newOffset);
      dispatch(action(newOffset, limit));
    }
  };
}
export {useDynamicFetch};
