export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator?.userAgent || '')
}
export const isTabletViewport = () => {
  return window.matchMedia('screen and (max-width: 1200px) and (min-width: 750px)').matches
}
export const isMobileViewport = () => {
  return window.matchMedia('screen and (max-width: 750px)').matches
}
export const isMobileOrTabletViewport = () => {
  return isMobileViewport() || isTabletViewport()
}