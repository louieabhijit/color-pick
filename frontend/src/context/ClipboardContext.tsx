import React, { createContext, useContext, useState, useCallback } from 'react';
import ClipboardToast from '../components/ClipboardToast';

interface ClipboardContextType {
  copyToClipboard: (text: string) => Promise<void>;
}

const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const useClipboard = () => {
  const context = useContext(ClipboardContext);
  if (!context) {
    throw new Error('useClipboard must be used within a ClipboardProvider');
  }
  return context;
};

export const ClipboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedValue(text);
      setTimeout(() => setCopiedValue(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  return (
    <ClipboardContext.Provider value={{ copyToClipboard }}>
      {children}
      <ClipboardToast copiedValue={copiedValue} />
    </ClipboardContext.Provider>
  );
}; 