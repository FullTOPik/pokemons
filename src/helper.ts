import { chip } from './constaints';

export const findColor = (type: string) =>
  chip.find(el => el.name === type)?.color;

export const findVariant = (type: string) =>
  chip.find(el => el.name === type)?.variant;

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getFromLocale = (name: string): Array<number> =>
  JSON.parse(localStorage.getItem(name)!);

export const saveInLocal = <T>(name: string, date: T) =>
  localStorage.setItem(name, JSON.stringify(date));

export const clearLocal = (name: string) => localStorage.removeItem(name);
