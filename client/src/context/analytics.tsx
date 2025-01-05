'use client'

import React, { createContext, useState, useEffect } from 'react';

type DashboardData = string[]

type DashboardContextType = {
  dashboardData: DashboardData;
  fetchDashboardData: () => Promise<void>;
  isLoading: boolean;
};

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if data exists in localStorage
    const storedData = localStorage.getItem('dashboardData');
    if (storedData) {
      setDashboardData(JSON.parse(storedData));
    }else{
        fetchDashboardData()
    }
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4000/ai/analytics'); // Replace with your API endpoint
      const finalresponse = await response.json();
      setDashboardData(finalresponse.data);
      // Store data in localStorage
      localStorage.setItem('dashboardData', JSON.stringify(finalresponse.data));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardContext.Provider value={{ dashboardData, fetchDashboardData, isLoading }}>
      {children}
    </DashboardContext.Provider>
  );
};

