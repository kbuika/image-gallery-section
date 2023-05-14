import { useState, useEffect } from "react";

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

      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error: unknown) {
        setError(error);
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
