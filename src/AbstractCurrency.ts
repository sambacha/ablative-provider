import { NativeCurrency } from './NativeCurrency'
import invariant from 'tiny-invariant'

/**
 * Ether is the main usage of a 'native' currency, i.e. for Ethereum mainnet and all testnets
 */
export class Ether extends NativeCurrency {
  chainId: any;
  protected constructor(chainId: number) {
    // @ts-ignore
    super(chainId, 18, 'ETH', 'Ether');
  }


  private static _etherCache: { [chainId: number]: Ether } = {}

  public static onChain(chainId: number): Ether {
    return this._etherCache[chainId] ?? (this._etherCache[chainId] = new Ether(chainId))
  }
}

export default Ether
