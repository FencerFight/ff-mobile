import { contractType } from '@/constants';
import { ethers } from 'ethers';
import useSWR from 'swr';

export type EventLog<T = any> = {
  blockNumber: number;
  transactionHash: string;
  args: T;
};

export function useEvents<T = any>(
  type: keyof typeof contractType,
  eventName: string,
  filterArgs: any[] = [],
  latestBlocks = 10000
) {
  const RPC_URL = 'http://192.168.0.9:8545';
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  // stable key for SWR
  const key = contractType[type].address && eventName
    ? [contractType[type].address, eventName, filterArgs, latestBlocks]
    : null;

  const fetcher = async ([addr, evt, filtr, blocks]: readonly [
    string,
    string,
    string,
    number
  ]) => {
    const contract = new ethers.Contract(addr, contractType[type].abi, provider);
    const latest   = await provider.getBlockNumber();
    const from     = Math.max(latest - blocks, 0);

    const filter   = contract.filters[evt](...filtr);
    const rawLogs  = await contract.queryFilter(filter, from, latest);

    return rawLogs
      .map(l => ({
        blockNumber: l.blockNumber,
        transactionHash: l.transactionHash,
        args: l.args as T,
      }))
      .sort((a, b) => b.blockNumber - a.blockNumber)
      .slice(0, 10);
  };

  const { data, error, isValidating, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshInterval: 0, // disable auto-polling; change if needed
  });

  return {
    logs: data ?? [],
    loading: !data && !error,
    error,
    isValidating,
    mutate
  };
}