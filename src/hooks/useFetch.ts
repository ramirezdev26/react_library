import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    let active = true;
    setIsLoading(true);
    setError(null);
    fetch(url)
      .then(res => res.json())
      .then(d => { if (active) setData(d); })
      .catch(() => { if (active) setError('Error al cargar datos'); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
