import {useEffect, useState} from 'react';

function useDynamicScroll(render: any, extraDeps: any) {
  const {
    ref,
    limit,
    isNext,
    initialRenderDeps = true,
    isLastEvaluatedKey = false,
  } = extraDeps;
  const scrollElement = ref.current;
  let unmountCallback: any;
  const [offset, setOffset] = useState(0);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);

  useEffect(() => {
    if (isLastEvaluatedKey) {
      let apiRes: any = {};
      let unmountCallback: any;

      if (initialRenderDeps) {
        unmountCallback = render(lastEvaluatedKey);

        unmountCallback.then((res: any) => {
          apiRes = res;
          setLastEvaluatedKey(apiRes?.response?.lastEvaluatedKey);
        });
      }

      if (Object.keys(apiRes).length > 0) {
        return () => {
          apiRes?.emptyCallBack();
        };
      }
    } else {
      if (initialRenderDeps) {
        unmountCallback = render(offset);
        const newOffset = limit + offset;
        setOffset(newOffset);
      }
      if (unmountCallback) {
        return () => {
          unmountCallback();
        };
      }
    }
  }, [initialRenderDeps]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollElement.scrollLeft >= 0 && !scrollElement.scrollTop) {
        return;
      }

      if (
        Math.ceil(scrollElement.scrollTop + scrollElement.clientHeight) >=
        scrollElement.scrollHeight
      ) {
        if (isNext) {
          const newOffset = limit + offset;
          setOffset(newOffset);
          render(offset);
        } else {
          scrollElement.removeEventListener('scroll', handleScroll);
          setOffset(0);
        }
      }
    };

    //Method to call when we have last evaluated key
    const handleScrollWithKey = async () => {
      if (
        scrollElement.scrollTop + scrollElement.clientHeight >=
        scrollElement.scrollHeight
      ) {
        if (isNext && lastEvaluatedKey !== null) {
          let response: any;
          try {
            response = await render(lastEvaluatedKey);
            setLastEvaluatedKey(response.response.lastEvaluatedKey);
          } catch (error) {
            console.log(error);
          }
        } else {
          setOffset(0);
          scrollElement.removeEventListener('scroll', handleScroll);
        }
      }
    };

    if (scrollElement) {
      scrollElement.addEventListener(
        'scroll',
        !isLastEvaluatedKey ? handleScroll : handleScrollWithKey,
      );
      return () => {
        scrollElement.removeEventListener(
          'scroll',
          !isLastEvaluatedKey ? handleScroll : handleScrollWithKey,
        );
      };
    }
  }, [scrollElement, render]);

  useEffect(() => {
    if (!isNext) {
      setOffset(0);
    }
  }, [isNext]);
}

export {useDynamicScroll};
