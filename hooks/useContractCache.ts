import { contractType } from '@/constants';
import { userDataAtom } from '@/store';
import { ethers } from 'ethers';
import { useAtomValue } from 'jotai';
import useSWR, { mutate } from 'swr';

export function useContractCache(type: keyof typeof contractType) {
  const userData = useAtomValue(userDataAtom)
  const RPC_URL = "http://192.168.0.9:8545"
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(userData.privateKey, provider);
  const contract = new ethers.Contract(contractType[type].address, contractType[type].abi, signer);
  const fetcher = async (method: string, ...args: any[]) => {
    try {
      const result = await contract[method](...args);

      if (method === 'getUser') {
        const [name, rating, cityId, countryId, clubId] = result;
        return { name, rating, cityId, countryId, clubId };
      } else if (method === "getTournaments") {
        const [tournaments, ids] = result;
        return { tournaments, ids }
      } else if (method === "getRatings") {
        const [users, ratings] = result;
        return { users, ratings }
      } else if (method === "getAdmins") {
        const [addresses, names] = result;
        return { addresses, names }
      }

      return result;
    } catch (error) {
      console.error(`Error in ${method}:`, error);
      throw error;
    }
  };

  const useContractQuery = <T = any>(
    method: string,
    args?: any[],
    options?: {
      refreshInterval?: number;
      shouldFetch?: boolean;
    }
  ) => {
    return useSWR<T>(
      [method, args],
      () => fetcher(method, ...(args || [])),
      {
        revalidateOnFocus: false,
        refreshInterval: options?.refreshInterval,
        isPaused: () => options?.shouldFetch === false,
      }
    );
  };

  const mutateData = async (
    method: string,
    args: any[],
    invalidateKeys?: string | string[]
  ) => {
    try {
      const result = await contract[method](...args);

      if (invalidateKeys) {
        const keys = Array.isArray(invalidateKeys)
          ? invalidateKeys
          : [invalidateKeys];

        await Promise.all(keys.map(key => mutate(key)));
      }

      return result;
    } catch (error) {
      console.error(`Mutation error (${method}):`, error);
      throw error;
    }
  };

  return {
    useContractQuery,
    mutateData,
    contract,
    address: signer.address,
  }
}