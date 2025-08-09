import { ethers } from 'ethers';
import { Asset } from 'expo-asset';
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';
const vk = require('../assets/icons/vk.svg')

export const truncate = (str: string, max = 9) => str?.length > max ? `${str.slice(0, max-2)}…` : (str ? str: '');

export const onlySurname = (name: string, max = 9) => {
    const nameArray = name.split(" ")
    return nameArray[0][0] + ". " + truncate(nameArray[1], max)
}

export const truncateFullName = (name: string, max = 9) => {
    const nameArray = name.split(" ")
    return truncate(nameArray[0], max) + " " + truncate(nameArray[1], max)
}

export const dateToUint256 = (date: Date) => {
    return ethers.toBigInt(Math.floor(date.getTime() / 1000));
}

export const uint256ToDate = (ts: bigint) => {
    return new Date(Number(ts) * 1000);
}

export async function imageToBase64(uri: string, width: number, height: number): Promise<string> {
  // assetId = require('./badge.png')
  const asset = Asset.fromModule({ uri, width, height });
  await asset.downloadAsync();              // копирует в кэш
  const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return base64;
}

export function encodeBase64(data: object) {
  const utf8Str = unescape(encodeURIComponent
    (JSON.stringify(data)));
  return btoa(utf8Str);
}

export function decodeBase64<T>(base64: string) {
  return JSON.parse(decodeURIComponent(escape(atob(base64)))) as T
}

export const iconFromLink = (link: string) => {
  const url = link.toLowerCase().trim();

  if (url.includes('vk.com'))                return vk;
  if (url.includes('t.me'))                  return vk;
  if (url.includes('instagram.com'))         return vk;
  if (url.includes('facebook.com'))          return vk;
  if (url.includes('twitter.com'))           return vk;
  if (url.includes('youtube.com'))           return vk;
  if (url.includes('tiktok.com'))            return vk;

  return "";
};

export const strMatch = (str: string, focusStr: string) => {
  return new RegExp(`^${str}`, "gi").test(focusStr)
}

export async function copyText(text: string) {
  await Clipboard.setStringAsync(text);
  Toast.show({
      type: "success",
      text1: 'Скопировано!'
  });
}

export function getTime(time: bigint) {
  const timeNum = Number(time)
  const min = Math.floor((timeNum % 3600) / 60)
  return `${ Math.floor(timeNum / 3600)}:${min === 0 ? "00" : min}`
}