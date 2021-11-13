export enum SafeChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42
  }

/**
 * MAX_SAFE_CHAIN_ID
 * @constant MAX_SAFE_CHAIN_ID
 * @returns {4503599627370476}
 */

export const MAX_SAFE_CHAIN_ID = 4503599627370476

/**
 * @constant MAX_SAFE_CHAIN_ID_HEX
 * @returns {0xFFFFFFFFFFFEC}
 */

export const MAX_SAFE_CHAIN_ID_HEX = 0xFFFFFFFFFFFEC

/**
 * isSafeChainId
 * @function isSafeChainId
 * @param {number} chainId
 * @returns {any}
 *
 */

 export function isSafeChainId(chainId: number) {
     return (
         Number.isSafeInteger(chainId) && chainId > 0 && chainId <= MAX_SAFE_CHAIN_ID);
}

export function normalizeChainId(chainId: string | number): number {
    if (typeof chainId === 'string') {
        const parsedChainId = Number.parseInt(
            chainId,
            chainId.trim().substring(0, 2) === '0x' ? 16 : 10,   );
        if (Number.isNaN(parsedChainId))
            throw new Error(`!safeChainId ${chainId} is not an integer`);
        return parsedChainId;
    } else {
        if (!Number.isInteger(chainId))
            throw new Error(`!safeChainId ${chainId} is not an integer`);
        return chainId;
    }
}
