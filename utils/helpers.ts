import { ethers } from 'ethers';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

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

export const uint256ToDate = (ts: BigNumber) => {
    return new Date(ts.toNumber() * 1000);
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
  return btoa(JSON.stringify(data));
}

export function decodeBase64(base64: string) {
    JSON.parse(atob(base64))
}