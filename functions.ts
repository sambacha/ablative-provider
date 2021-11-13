    swapETHForExactTokens(
      amountOut: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "swapETHForExactTokens(uint256,address[],address,uint256)"(
      amountOut: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    swapExactETHForTokens(
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "swapExactETHForTokens(uint256,address[],address,uint256)"(
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;
