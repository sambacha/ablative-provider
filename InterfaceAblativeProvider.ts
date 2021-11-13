interface AblativeProvider {
    getContract(abi: ContractInterface, contractAddress: string): TGeneratedTypedContext;
    network(): providers.Network;
    provider(): providers.BaseProvider;
    balanceOf(ethereumAddress: string): Promise<string>;
  }
