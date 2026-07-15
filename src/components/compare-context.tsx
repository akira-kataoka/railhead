"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "railhead.compare";
export const MAX_COMPARE = 4;

const EMPTY: string[] = [];

/**
 * localStorage は React の外部ストアなので、useEffect + setState ではなく
 * useSyncExternalStore で購読する。別タブでの変更にも追従する。
 */
const listeners = new Set<() => void>();

/** getSnapshot は同じ内容なら同じ参照を返す必要があるため、パース結果をキャッシュする */
let cachedRaw: string | null = null;
let cachedIds: string[] = EMPTY;

const readIds = (): string[] => {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY;
  }

  if (raw === cachedRaw) return cachedIds;
  cachedRaw = raw;

  if (!raw) {
    cachedIds = EMPTY;
    return cachedIds;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    cachedIds = Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === "string").slice(0, MAX_COMPARE)
      : EMPTY;
  } catch {
    // 壊れた値が入っていても比較機能ごと落とさない
    cachedIds = EMPTY;
  }
  return cachedIds;
};

const writeIds = (ids: string[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // プライベートモード等で書けなくても、この操作自体は失敗させない
  }
  listeners.forEach((fn) => fn());
};

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  // 別タブでの更新を拾う
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
};

interface CompareContextValue {
  ids: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  isFull: boolean;
  /** ハイドレーション完了後に true。サーバー描画との差分によるちらつきを避けるために使う */
  ready: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const ids = useSyncExternalStore(subscribe, readIds, () => EMPTY);
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const toggle = useCallback((id: string) => {
    const current = readIds();
    if (current.includes(id)) writeIds(current.filter((v) => v !== id));
    else if (current.length < MAX_COMPARE) writeIds([...current, id]);
  }, []);

  const remove = useCallback((id: string) => {
    writeIds(readIds().filter((v) => v !== id));
  }, []);

  const clear = useCallback(() => writeIds([]), []);

  const value = useMemo<CompareContextValue>(
    () => ({
      ids,
      toggle,
      remove,
      clear,
      has: (id: string) => ids.includes(id),
      isFull: ids.length >= MAX_COMPARE,
      ready,
    }),
    [ids, toggle, remove, clear, ready],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare は CompareProvider の内側で使ってください");
  return ctx;
}
