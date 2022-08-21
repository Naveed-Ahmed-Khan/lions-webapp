import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const useFetch = (url) => {
  const { mutate } = useSWRConfig();

  const { data, error } = useSWR(url, () =>
    axios.get(url).then((res) => res.data)
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    updateData: function () {
      mutate(url);
    },
  };
};

export default useFetch;
