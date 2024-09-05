export const getStorageValue = (key: string) => {
  const savedValue = localStorage.getItem(key);
  if (!savedValue) return null;

  try {
    return JSON.parse(savedValue);
  } catch (e) {
    console.error(e);
    return savedValue;
  }
};

export const setStorageValue = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
