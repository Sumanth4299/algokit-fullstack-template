import * as algosdk from 'algosdk'
import { useWallet } from '@txnlab/use-wallet'
import { AiMarketplaceClient } from '../contracts/AiMarketplace' // This is the client you built earlier
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoConfigViteEnvironment'

const AppCalls = () => {
  const { activeAddress, signer } = useWallet() // This gets the user's wallet address

  // This is the function that runs when the button is clicked
  const postTask = async () => {
    if (!activeAddress) {
      alert("Please connect your wallet first!")
      return
    }

    // 1. Setup the connection to the Algorand Network
    const algodConfig = getAlgodConfigFromViteEnvironment()
    const algodClient = new algosdk.Algodv2(algodConfig.token, algodConfig.server, algodConfig.port)

    // 2. Setup the "Bridge" to your Smart Contract
    const marketplaceClient = new AiMarketplaceClient(
      {
        resolveBy: 'id',
        appId: 0, // IMPORTANT: You will update this with your App ID after you deploy
      },
      algodClient,
    )

    try {
      // 3. Prepare the 1 ALGO Payment (The Escrow)
      const suggestedParams = await algodClient.getTransactionParams().do()
      const payment = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: algosdk.getApplicationAddress(marketplaceClient.appId), // Send money to the contract address
        amount: 1000000, // 1,000,000 microAlgos = 1 ALGO
        suggestedParams,
      })

      // 4. Send the command to the blockchain
      await marketplaceClient.postTask({ payment }, { signer })

      alert("Success! 1 ALGO is now locked in the Smart Contract. The AI Agent is being notified.")
    } catch (e) {
      console.error("Payment failed", e)
      alert("Transaction failed. Check the console for details.")
    }
  }

  // This is what the user actually SEES on the screen
  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-slate-800">
      <h2 className="text-xl font-bold">AI Agent Marketplace</h2>
      <p>Click below to lock 1 ALGO and request an AI Analysis.</p>

      <button
        className="px-6 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700"
        onClick={postTask}
      >
        Hire AI Agent (1 ALGO)
      </button>
    </div>
  )
}

export default AppCalls