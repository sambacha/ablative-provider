import { Contract, ContractInterface } from 'ethers';
import * as providers from '@ethersproject/providers';
import { ErrorCodes } from './common/errors/error-codes';
import { SushiswapError } from './common/errors/sushiswap-error';

import { ChainId, ChainNames } from './enums/chain-id';
import { keccak256 } from '@ethersproject/keccak256';
export function id(text: string): string {
  return keccak256(toUtf8Bytes(text));
}
import { toUtf8Bytes } from '@ethersproject/strings';


export class EthersProvider {
  private _ethersProvider: providers.BaseProvider;
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    if (providerUrl) {
      const chainName = ChainNames.get(chainId);
      if (!chainName) {
        throw new SushiswapError(
          `Can not find chain name for ${chainId}`,
          ErrorCodes.canNotFindChainId,
        );
      }

      this._ethersProvider = new providers.StaticJsonRpcProvider(providerUrl, {
        name: chainName,
        chainId,
      });
      return;
    }

    this._ethersProvider = new providers.InfuraProvider(chainId);
  }

  /**
   * Creates a contract instance
   * @param abi The abi
   * @param contractAddress The contract address
   */
  public getContract<TGeneratedTypedContext>(
    abi: ContractInterface,
    contractAddress: string,
  ): TGeneratedTypedContext {
    const contract = new Contract(contractAddress, abi, this._ethersProvider);

    return (contract as unknown) as TGeneratedTypedContext;
  }

  /**
   * Get the network
   * @network
   */
  public network(): providers.Network {
    return this._ethersProvider.network;
  }

  /**
   * Get the ethers provider
   * @EthersProvider
   */
  public get provider(): providers.BaseProvider {
    return this._ethersProvider;
  }

  /**
   * Get eth amount
   * @param ethereumAddress The ethereum address
   */
  public async balanceOf(ethereumAddress: string): Promise<string> {
    return (
      await this._ethersProvider.getBalance(ethereumAddress)
    ).toHexString();
  }
}
