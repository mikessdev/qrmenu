import { type ThemeDefinition } from 'vuetify';
import 'vuetify/styles';

export const light: ThemeDefinition = {
  colors: {
    primary: '#f75c3b',
    secondary: '#f8f8f8',
    accent: '#75ba75',
    error: '#ff0000',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00'
  },
  dark: false
};

export const dark: ThemeDefinition = {
  colors: {},
  dark: true
};
