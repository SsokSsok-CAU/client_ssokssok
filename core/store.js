import { proxy } from 'valtio';

export const state = proxy({
  strokeColor: 'black',
  strokeWidth: 8,
  imageTitle: '',
  svg: '',
});

export const user = proxy({
  id: '',
  displayName: '',
  token: '',
});

export const image = proxy({
  title: '',
  originalUrl: '',
  convertUrl: '',
  svgUrl: '',
  converting: true,
});

export const images = proxy({
  list: [],
});
