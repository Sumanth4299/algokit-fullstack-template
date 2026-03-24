import * as algosdk from 'algosdk'
import { useWallet } from '@txnlab/use-wallet-react'

const AppCalls = () => {
  const { activeAddress, signer } = useWallet()
  const algodClient = new algosdk.Algodv2('', 'http://localhost', '4001')

  const hireAgent = async () => {
    if (!activeAddress) {
      alert("Please connect your wallet first!")
      return
    }
    alert("Transaction Initiated: Sending 1 ALGO to Escrow...")
    // This is where your marketplaceClient.postTask logic goes
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={hireAgent}
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          border: 'none'
        }}
      >
        Hire AI Agent (1 ALGO)
      </button>
    </div>
  )
}

export default AppCalls