import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from './ChainId'
import RPC from './rpc'

export const OPENMEV_RELAY_ENABLED = false

export const OPENMEV_SUPPORTED_NETWORKS = [ChainId.MAINNET]


export const OPENMEV_URI = `https://api.sushirelay.com/v1`


export enum OPENMEV_METAMASK_CHAIN_ID {
  MAINNET = '0x1111100000',
}

export const OPENMEV_METAMASK_SUPPORTED_NETWORKS = [OPENMEV_METAMASK_CHAIN_ID.MAINNET]

export const OPENMEV_NETWORK_TO_METAMASK_CHAIN_ID: { ChainId?: OPENMEV_METAMASK_CHAIN_ID } = {
  [ChainId.MAINNET]: OPENMEV_METAMASK_CHAIN_ID.MAINNET,
}

export const OPENMEV_METAMASK_CHAIN_ID_TO_NETWORK: { [id in OPENMEV_METAMASK_CHAIN_ID]?: ChainId } = {
  [OPENMEV_METAMASK_CHAIN_ID.MAINNET]: ChainId.MAINNET,
}

export const OPENMEV_METAMASK_NETWORKS: {
   ChainId?: {
    chainId: (string | number)
    chainName: string
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
    }
    rpcUrls: string;
    blockExplorerUrls?: string[]
    iconUrls?: string[]
  }
} = {
  [ChainId.MAINNET]: {
    chainName: 'OpenMEV / Ethereum Mainnet',
    chainId: OPENMEV_METAMASK_CHAIN_ID.MAINNET,
    rpcUrls: [OPENMEV_URI[ChainId.MAINNET]],
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://etherscan.io'],
  },
}
