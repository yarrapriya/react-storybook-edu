import { keyframes } from '@mui/system';

export const hidebox = keyframes`
0% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`;

export const showBox = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

export const changeBgColor = keyframes`
0% {
  background-color: #fff;
}
100% {
  background-color: #e2ffed;
}
`;

export const changeBgColorReverse = keyframes`
0% {
  background-color: #e2ffed;
}
100% {
  background-color: #fff;
}
`;

export const moveForward = keyframes`
to {
  top: 70px;
  left: 50px;
}
`;

export const easeIn = keyframes`
0% {
  height: 0;
  opacity: 0;
}
100% {
  height: 100%;
  opacity: 1;
}
`;
