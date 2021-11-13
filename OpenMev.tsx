            {OPENMEV_RELAY_ENABLED && OPENMEV_SUPPORTED_NETWORKS.includes(chainId) && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Typography variant="sm" className="text-primary">
                    {i18n._(t`OpenMEV Gas Refunder`)}
                  </Typography>
                  <QuestionHelper text={i18n._(t`OpenMEV refunds up to 95% of transaction costs in 35 blocks`)} />
                </div>
                <Toggle
                  id="toggle-use-openmev"
                  isActive={library?.provider.isMetaMask && userUseOpenMev}
                  toggle={() => {
                    if (userUseArcher) setUserUseArcher(false)
                    setUserUseOpenMev(!userUseOpenMev)
                  }}
                />
              </div>
            )}
          </div>
