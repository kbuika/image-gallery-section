import { useState, useEffect } from "react";
import axios from "axios";
import { errorAlert } from "../utils";

interface Data {
  image: string;
  article: {
    title: string;
    description: string;
  };
}

interface HookResult {
  data: Data[] | null;
  loading: boolean;
  error: Error | null | unknown;
  refetch: () => void;
}

const useFetch = (url: string): HookResult => {
  const [data, setData] = useState<Data[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const config = {
        method: "get",
        url: url,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "no-cors",
      };

      try {
        const response = await axios(config);
        setData(response.data);
      } catch (error: unknown) {
        setError(error);
        errorAlert("An error occured while fetching data, please try again later.");
      }

      setLoading(false);
    }

    fetchData();
  }, [url, shouldRefetch]);

  const refetch = () => {
    setShouldRefetch((prev) => !prev);
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useFetch;
