const cache = {
  getItem(key: string) {
    const data = localStorage.getItem(key);
    return !!data ? JSON.parse(data) : "";
  },
  setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
  removeAll() {
    localStorage.clear();
  },
};

export default cache;
