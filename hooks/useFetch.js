import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { useAuth } from "../contexts/AuthContext";

const useFetch = (url, checkLoggedIn, params) => {
  // console.log(url);
  // console.log(checkLoggedIn);
  const router = useRouter();
  // const { mutate } = useSWRConfig();
  const token = getCookie("token");
  let options = {};

  if (checkLoggedIn) {
    options["headers"] = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  if (params) {
    options["params"] = params;
  }

  const { data, error, isValidating, mutate } = useSWR(url, () =>
    axios
      .get(url, options)
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
    updateData: (updatedUrl) => {
      console.log(`mutating ${updatedUrl}`);
      mutate();
    },
  };
};

export default useFetch;
