export const isMobile = () => {
  const userAgent = navigator.userAgent;
  const mobileAgent = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
  ];
  return mobileAgent.some(item => userAgent.includes(item));
};
