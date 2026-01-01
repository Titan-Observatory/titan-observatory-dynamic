export const TEXT_SIZE_STORAGE_KEY = "titan:text-size";
export const TEXT_SIZE_CLASS = "text-size-large";
export const TEXT_SIZE_EVENT = "titan-text-size-toggle";

export type TextSizePreference = "normal" | "large";

export const getTextSizePreference = (): TextSizePreference => {
  if (typeof window === "undefined") return "normal";
  const stored = window.localStorage.getItem(TEXT_SIZE_STORAGE_KEY);
  if (stored === "large" || stored === "normal") return stored;
  return "normal";
};

export const applyTextSizePreference = (preference: TextSizePreference) => {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle(TEXT_SIZE_CLASS, preference === "large");
  window.localStorage.setItem(TEXT_SIZE_STORAGE_KEY, preference);
  window.dispatchEvent(
    new CustomEvent(TEXT_SIZE_EVENT, {
      detail: { preference },
    }),
  );
};
