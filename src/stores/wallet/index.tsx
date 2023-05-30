import { createSlice, PayloadAction, Store } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface RawWallet {
  chainId: string | number;
  account: string;
  alias?: string;
  publicKey: string;
  secretKey: string;
  connectedSites: string[];
}
interface Wallet {
  chainId: string | number;
  balance: number;
  account: string;
  alias: string;
  publicKey: string;
  secretKey: string;
  wallets: RawWallet[];
  connectedSites: string[];
}

let customStore: Store | undefined;

export const setStoreWallet = (store: Store) => {
  customStore = store;
};

const initialState: Wallet = {
  chainId: '0',
  balance: 0,
  account: '',
  alias: '',
  publicKey: '',
  secretKey: '',
  wallets: [],
  connectedSites: [],
};

const storeWallet = createSlice({
  name: 'storeWallet',
  initialState,
  reducers: {
    setCurrentWallet: (state, action: PayloadAction<any>) => ({
      ...state,
      chainId: action.payload.chainId,
      account: action.payload.account,
      alias: action.payload.alias,
      publicKey: action.payload.publicKey,
      secretKey: action.payload.secretKey,
      connectedSites: action.payload.connectedSites,
    }),
    setWallets: (state, action: PayloadAction<any>) => ({
      ...state,
      wallets: action.payload,
    }),
    setBalance: (state, action: PayloadAction<any>) => ({
      ...state,
      balance: action.payload,
    }),
  },
});

export const setCurrentWallet = (wallet: any) => {
  customStore && customStore.dispatch(storeWallet.actions.setCurrentWallet(wallet));
};
export const setWallets = (wallets: any) => {
  customStore && customStore.dispatch(storeWallet.actions.setWallets(wallets));
};
export const setBalance = (balance: any) => {
  customStore && customStore.dispatch(storeWallet.actions.setBalance(balance));
};

export const getCurrentWallet = (state: RootState) => state.wallet.wallets.find(
  (wallet) => wallet.account === state.wallet.account,
);
export const getWallets = (state: RootState) => state.wallet.wallets;

export { storeWallet };
