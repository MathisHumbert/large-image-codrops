import { createContext, useContext, useMemo, useState } from 'react';

interface PageProviderProps {
  children: React.ReactNode;
}

interface IPage {
  adjacentItems: never[];
  setAdjacentItems: React.Dispatch<React.SetStateAction<never[]>>;
  isAnimating: boolean;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  scaleImg: number;
  setScaleImg: React.Dispatch<React.SetStateAction<number>>;
}

const PageContext = createContext<IPage>({
  adjacentItems: [],
  setAdjacentItems: () => {},
  isAnimating: false,
  setIsAnimating: () => {},
  scaleImg: 0,
  setScaleImg: () => {},
});

export const PageProvider = ({ children }: PageProviderProps) => {
  const [adjacentItems, setAdjacentItems] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scaleImg, setScaleImg] = useState(0);

  const memoedValue = useMemo(
    () => ({
      adjacentItems,
      setAdjacentItems,
      isAnimating,
      setIsAnimating,
      scaleImg,
      setScaleImg,
    }),
    [adjacentItems, isAnimating]
  );

  return (
    <PageContext.Provider value={memoedValue}>{children}</PageContext.Provider>
  );
};

export default function usePage() {
  return useContext(PageContext);
}
