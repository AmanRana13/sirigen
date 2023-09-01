import {API} from 'globals/api';
import * as React from 'react';

function useFetch(query: any, page: any) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [list, setList] = React.useState<string[]>([]);

  const sendQuery = React.useCallback(
    async (url: string) => {
      try {
        setLoading(true);
        setError('');
        const res = await API({url, method: 'get'});
        setList((prev) => [...prev, ...res.data]);
        setLoading(false);
      } catch (err: any) {
        setError(err.response.message);
      }
    },
    [query, page],
  );

  React.useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, page]);

  return {loading, error, list};
}
export default useFetch;
