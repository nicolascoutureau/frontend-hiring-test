import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { archiveCalls } from "../api";
import { getPusher } from "../services/pusher";
import { ICall } from "../types";

const perPage = 20;

export interface CallContextState {
  calls: ICall[];
  setCalls: (calls: ICall[]) => void;
  currentCall: ICall | null;
  setCurrentCall: (call: ICall | null) => void;
  page: number,
  setPage: (page: number) => void,
  selectedIds: string[],
  setSelectedIds: (selectedIds: string[]) => void,
  hasNextPage: boolean,
  setHasNextPage: (hasNextPage: boolean) => void,
  perPage: number,
  archiveIds: (ids: string[]) => void,
  toggleSelected: (call: ICall) => void,
}

const CallContext = createContext<CallContextState>({} as CallContextState);

interface CallContextProps {}

export const CallContextProvider: React.FC<CallContextProps> = ({
  children,
}) => {
  const [calls, setCalls] = useState<ICall[]>([]);
  const [currentCall, setCurrentCall] = useState<ICall | null>(null);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    if(!calls) return;

    const current = calls.find(call => call.id === currentCall?.id)

    if (current) {
      setCurrentCall(current)
    }

  }, [calls, currentCall])

  const updateCall = useCallback((call: ICall) => {
    console.log('updateCall', call)
    setCalls(oldCalls => {
      return oldCalls.map(oldCall => oldCall.id === call.id ? call : oldCall);
    })
  }, [setCalls])

  useEffect(() => {
    const pusher = getPusher()
    const channel = pusher.subscribe('private-aircall');

    channel.bind('update-call', updateCall)

    return () => {
      pusher.unsubscribe('private-aircall');
    }
  }, [updateCall]);

  const archiveIds = (ids: string[]) => {
    archiveCalls(ids).then((res) => {
      res.forEach(call => updateCall(call))
  });

    setSelectedIds([]);
  };

  const toggleSelected = (call: ICall) => {
    if (selectedIds.includes(call.id)) {
      setSelectedIds(selectedIds.filter((s) => s !== call.id));
    } else {
      setSelectedIds([...selectedIds, call.id]);
    }
  };

  return (
    <CallContext.Provider value={{ calls, setCalls, currentCall, setCurrentCall, page, setPage, selectedIds, setSelectedIds, hasNextPage, setHasNextPage, perPage, archiveIds, toggleSelected }}>
      {children}
    </CallContext.Provider>
  );
};

export function useCallContext() {
  return useContext(CallContext);
}