import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// Define the shape of your context data
interface IContextData {
  selectedFunction: (() => void) | null;
  setSelectedFunction: (func: (() => void) | null) => void;
}

// Create the context
const globalContext = createContext<IContextData | undefined>(undefined);

const { Provider } = globalContext;

// Create a provider component
interface IProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider: React.FC<IProviderProps> = ({
  children,
}) => {
  const [selectedFunction, setSelectedFunction] = useState<(() => void) | null>(
    null
  );
  useEffect(() => {
    const handlePopState = () => {
      if (selectedFunction) {
        selectedFunction();
        setSelectedFunction(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedFunction]);

  const contextValue: IContextData = { selectedFunction, setSelectedFunction };
  return <Provider value={contextValue}>{children}</Provider>;
};

export const useGlobalContext = () => {
  const context = useContext(globalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a MyContextProvider');
  }
  return context;
};
