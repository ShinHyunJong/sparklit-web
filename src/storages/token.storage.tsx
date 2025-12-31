export const ACCESS_TOKEN_KEY = '@vloom.accessToken';

export const tokenStorage = {
  getAccessToken: () => {
    if (typeof window === 'undefined') {
      return null;
    }
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token;
  },
  setAccessToken: (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  deleteAccessToken: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};
