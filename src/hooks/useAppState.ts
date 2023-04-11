import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppState(onChange: (status: AppStateStatus) => void) {
  useEffect(() => {
    const sub = AppState.addEventListener('change', onChange);
    return () => {
      sub.remove();
    };
  }, [onChange]);
}
