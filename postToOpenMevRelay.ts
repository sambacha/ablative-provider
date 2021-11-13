    const postToOpenMevRelay = async (signedTx: string, isMetamask: boolean) => {
            const relayURI = chainId ? OPENMEV_URI[chainId] : undefined
            if (!relayURI) throw new Error('Could not determine relay URI for this network')

            const body = JSON.stringify({
              jsonrpc: '2.0',
              id: new Date().getTime(),
              method: 'eth_sendRawTransaction',
              params: [signedTx],
            })

            console.group(`postToOpenMevRelay`)
            console.log(`Sending to URI: ${relayURI}`)
            console.log(`Body:`, body)
            console.groupEnd()

            return fetch(relayURI, {
              method: 'POST',
              body,
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(async (res) => {
              // Handle specific error cases
              if (res.status === 200) {
                const json = await res.json()
                if (json.error) throw Error(`${json.error.message}`)
              }

              // Generic error
              if (res.status !== 200) throw Error(res.statusText)
            })
          }
