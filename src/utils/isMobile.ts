export const isMobile = () => {
  // 获取屏幕宽度
  const screenWidth =
    window.innerWidth ||
    window.screen.width ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const userAgent = navigator.userAgent;
  const mobileAgent = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
  ];
  return (
    mobileAgent.some(item => userAgent.includes(item)) || screenWidth < 768
  );
};
