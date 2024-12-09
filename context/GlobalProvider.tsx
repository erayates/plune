import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Account, Models } from "react-native-appwrite";
import client from "@/lib/appwrite";

// Types
interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: Models.User<Models.Preferences> | null;
}

interface GlobalContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

// Create context with initial value
export const GlobalContext = createContext<GlobalContextType>({
  auth: {
    isLoggedIn: false,
    isLoading: true,
    user: null,
  },
  setAuth: () => {},
});

// Provider props interface
interface GlobalProviderProps {
  children: ReactNode;
}

// Provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const account = new Account(client);
        const user = await account.get();

        setAuth((prev) => ({
          ...prev,
          isLoggedIn: true,
          user,
        }));
      } catch (error) {
        setAuth((prev) => ({ ...prev, user: null }));
      } finally {
        setAuth((prev) => ({ ...prev, isLoading: false }));
      }
    })();
  }, []);

  const value = {
    auth,
    setAuth,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

// Custom hook
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
