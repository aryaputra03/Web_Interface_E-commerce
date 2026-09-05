"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("offline", onStoreChange);
  window.addEventListener("online", onStoreChange);

  return () => {
    window.removeEventListener("offline", onStoreChange);
    window.removeEventListener("online", onStoreChange);
  };
}

function getIsOffline() {
  return !navigator.onLine;
}

function getServerIsOffline() {
  return false;
}

export function OfflineBanner() {
  const isOffline = useSyncExternalStore(
    subscribe,
    getIsOffline,
    getServerIsOffline,
  );

  if (!isOffline) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-brick px-4 py-2 text-center text-sm text-paper">
      Koneksi internet terputus — beberapa fitur mungkin tidak berfungsi sampai
      koneksi pulih.
    </div>
  );
}
