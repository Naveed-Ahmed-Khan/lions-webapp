import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import useSWR from "swr";

const useFetch = (url, checkLoggedIn) => {
  // console.log(url);
  // console.log(checkLoggedIn);
  const router = useRouter();
  // const { mutate } = useSWRConfig();
  const token = getCookie("token");

  const { data, error, isValidating, mutate } = useSWR(url, () =>
    axios
      .get(
        url,
        checkLoggedIn && {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        // router.push("/")
      })
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    updateData: () => {
      console.log(`mutating ${url}`);
      mutate();
    },
  };
};

export default useFetch;
