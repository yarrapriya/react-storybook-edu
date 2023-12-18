export const pxToRem = (val: number) => (val / 16).toFixed(3) + 'rem';
export const pxTovW = (val: number, viewPort = 1920) => (val * 100 / viewPort).toFixed(3) + 'vw';
