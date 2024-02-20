import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  fetchAndStoreHeadlines,
  getStoredHeadlines,
  updateStoredHeadlines,
} from '../../services/newsService';

const useHomeScreen = () => {
  const [headlines, setHeadlines] = useState<any>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [countdown, setCountdown] = useState(10);
  const timerRef = useRef<any>(null);

  const fetchHeadlines = async () => {
    await fetchAndStoreHeadlines();
    const storedHeadlines = await getStoredHeadlines();
    setHeadlines(storedHeadlines.slice(0, 10));
    resetTimerAndCountdown();
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setCountdown(10);
    addRandomHeadlines();
    setRefreshing(false);
  }, []);

  const addRandomHeadlines = async () => {
    setRefreshing(true);
    const storedHeadlines = await getStoredHeadlines();
    const existingIds = new Set(headlines.map(h => h.id));
    const newHeadlines = storedHeadlines
      .filter(h => !existingIds.has(h.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setHeadlines(prev => [...newHeadlines, ...prev]);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const resetTimerAndCountdown = () => {
    setCountdown(10);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 1) {
          addRandomHeadlines();
          return 10;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);
  };

  const deleteItem = async (index: number) => {
    const updatedHeadlines = [...headlines];
    updatedHeadlines.splice(index, 1);
    await updateStoredHeadlines(updatedHeadlines);
    setHeadlines(updatedHeadlines);
  };

  const pinItem = async (index: number) => {
    const item = headlines[index];
    const isPinned = item.pinned;
    const updatedItem = {...item, pinned: !isPinned};
    const updatedHeadlines = headlines.map((h: any, i: number) =>
      i === index ? updatedItem : h,
    );
    await updateStoredHeadlines(updatedHeadlines);
    setHeadlines(updatedHeadlines);
  };

  useEffect(() => {
    fetchHeadlines();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const sortedHeadlines = useMemo(() => {
    const pinned = headlines.filter((h: {pinned: any}) => h.pinned);
    const unpinned = headlines.filter((h: {pinned: any}) => !h.pinned);
    return [...pinned, ...unpinned];
  }, [headlines, refreshing]);

  return {
    sortedHeadlines,
    refreshing,
    countdown,
    onRefresh,
    deleteItem,
    pinItem,
  };
};

export default useHomeScreen;
