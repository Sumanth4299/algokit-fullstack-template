import React from 'react'
import { WalletProvider, useInitializeProviders, useWallet } from '@txnlab/use-wallet-react'

// --- THE DASHBOARD COMPONENT ---
const MarketplaceDashboard = () => {
  const { activeAddress } = useWallet()

  const handleHire = () => {
    if (!activeAddress) {
      alert("Connect your wallet using the button in the top right (if visible) or check LocalNet!")
      return
    }
    alert("🚀 Task Escrowed! Sending 1 ALGO to the Smart Contract...")
  }

  return (
    <div style={{ textAlign: 'center', padding: '40px', background: '#1e293b', borderRadius: '20px', border: '1px solid #334155' }}>
      <h2 style={{ color: '#38bdf8' }}>AI Agent Marketplace</h2>
      <p style={{ color: '#94a3b8' }}>Secure Escrow & Autonomous Task Management</p>
      <hr style={{ borderColor: '#334155', margin: '20px 0' }} />
      <button
        onClick={handleHire}
        style={{ backgroundColor: '#3b82f6', color: 'white', padding: '15px 30px', borderRadius: '10px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
      >
        Hire AI Agent (1 ALGO)
      </button>
    </div>
  )
}

// --- THE MAIN APP ---
export default function App() {
  const walletProviders = useInitializeProviders({
    providers: [],
    nodeConfig: { network: 'localnet', nodeServer: 'http://localhost', nodePort: '4001', nodeToken: '' },
  })

  return (
    <WalletProvider value={walletProviders}>
      <div style={{ backgroundColor: '#0f172a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: 'white' }}>
        <MarketplaceDashboard />
      </div>
    </WalletProvider>
  )
}