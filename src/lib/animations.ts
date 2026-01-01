export const ANIMATIONS_STORAGE_KEY = "titan:animations-disabled";
export const ANIMATIONS_CLASS = "animations-disabled";
export const ANIMATIONS_EVENT = "titan-animations-toggle";

export const getAnimationsDisabled = (): boolean => {
  if (typeof window === "undefined") return false;
  const stored = window.localStorage.getItem(ANIMATIONS_STORAGE_KEY);
  if (stored === "true") return true;
  if (stored === "false") return false;
  return false;
};

export const applyAnimationsDisabled = (disabled: boolean) => {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle(ANIMATIONS_CLASS, disabled);
  window.localStorage.setItem(ANIMATIONS_STORAGE_KEY, disabled ? "true" : "false");
  window.dispatchEvent(
    new CustomEvent(ANIMATIONS_EVENT, {
      detail: { disabled },
    }),
  );
};
