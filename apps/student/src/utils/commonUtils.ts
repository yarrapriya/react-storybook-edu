import { useLocation } from 'react-router-dom';

function useLocationKey(key: string): string | undefined;
function useLocationKey(key: string, type: 'number'): number | undefined;
function useLocationKey(key: string, type: 'bigint'): bigint | undefined;
function useLocationKey(key: string, type?: 'number' | 'bigint'): string | number | bigint | undefined {
  const location = useLocation();
  const val = (new URLSearchParams(location.search)).get(key);

  if (!val) return undefined;

  switch (type) {
    case 'number':
      return parseFloat(val);
    case 'bigint':
      return BigInt(val);
    default:
      return val;
  }
}

export { useLocationKey };
