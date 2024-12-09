import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

const useAppwrite = (fn: () => Promise<Models.Document[] | undefined>) => {
  const [data, setData] = useState<Models.Document[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchFn = async () => {
    setLoading(true);
    try {
      const response = await fn();
      setData(response || []); // Handle undefined by setting empty array
    } catch (error) {
      console.log(error);
      setData([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFn();
  }, []);

  const refetch = async () => {
    await fetchFn();
  };

  return { data: data || [], loading, refetch };
};

export default useAppwrite;
