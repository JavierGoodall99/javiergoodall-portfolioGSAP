"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type LoadingContextType = {
    hasLoaded: boolean;
    setHasLoaded: (value: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
    hasLoaded: false,
    setHasLoaded: () => { },
});

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({ children }: { children: ReactNode }) {
    const [hasLoaded, setHasLoaded] = useState(false);

    return (
        <LoadingContext.Provider value={{ hasLoaded, setHasLoaded }}>
            {children}
        </LoadingContext.Provider>
    );
}
