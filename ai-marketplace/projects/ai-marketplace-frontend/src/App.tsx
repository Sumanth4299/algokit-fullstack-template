import React, { useState } from 'react'

const agentsList = [
  { id: 1, name: "Nexus-Alpha", role: "Market Analyst", score: 98, price: "5 ALGO", color: "#38bdf8", model: "Llama-3-70B", result: "Analysis: BULLISH (0.84 confidence)" },
  { id: 2, name: "Vision-Sigma", role: "Image Auditor", score: 95, price: "3 ALGO", color: "#4ade80", model: "ViT-Huge", result: "Detection: 0 Threats found (Cleared)" },
  { id: 3, name: "Lexi-Flow", role: "NLP Engine", score: 99, price: "2 ALGO", color: "#fbbf24", model: "GPT-4o", result: "Translation: 'Task Success' -> 'Karya Safal'" },
  { id: 4, name: "Secure-Node", role: "Contract Auditor", score: 92, price: "15 ALGO", color: "#f472b6", model: "Symbolic-AI", result: "Audit: 0 Critical Vulnerabilities." }
]

export default function App() {
  const [stage, setStage] = useState('info') 
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [taskRegistry, setTaskRegistry] = useState({}) 

  const runTask = (id) => {
    setTaskRegistry(prev => ({ ...prev, [id]: 'Processing' }))
    setTimeout(() => { setTaskRegistry(prev => ({ ...prev, [id]: 'Completed' })) }, 3500)
  }

  const resetAgent = (id) => { setTaskRegistry(prev => ({ ...prev, [id]: 'Idle' })) }
  const getStatus = (id) => taskRegistry[id] || 'Idle'

  return (
    <div style={{ background: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* HEADER NAV */}
      <nav style={{ padding: '15px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', background: '#0f172a', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setStage('info')}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', borderRadius: '8px' }}></div>
          <span style={{ fontSize: '1.3rem', fontWeight: '800' }}>AI-NEXUS <span style={{fontSize: '0.6rem', color: '#38bdf8', border: '1px solid #38bdf8', padding: '2px 5px', borderRadius: '4px', marginLeft: '5px'}}>PRO</span></span>
        </div>
        <div style={{ display: 'flex', gap: '30px', color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500' }}>
          {['info', 'marketplace', 'register', 'docs'].map(s => (
            <span key={s} onClick={() => {setStage(s); setSelectedAgent(null);}} style={{ cursor: 'pointer', color: stage === s ? '#38bdf8' : '', textTransform: 'uppercase' }}>{s}</span>
          ))}
        </div>
        <button style={{ padding: '8px 20px', borderRadius: '20px', border: '1px solid #38bdf8', background: 'transparent', color: '#38bdf8', fontWeight: 'bold' }}>Connect Wallet</button>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* INFO SECTION (RESTORED ICONS & GRID) */}
        {stage === 'info' && (
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <span style={{ color: '#38bdf8', background: '#38bdf811', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #38bdf844' }}>
               ENGINEERING THE FUTURE OF M2M COMMERCE
            </span>
            <h1 style={{ fontSize: '4rem', fontWeight: '900', lineHeight: '1.1', margin: '25px 0' }}>The Next-Gen <span style={{ color: '#38bdf8' }}>Decentralized AI</span> Marketplace.</h1>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem', margin: '0 auto 50px', maxWidth: '750px' }}>A high-performance protocol enabling autonomous AI agents to offer specialized services, interact with users, and settle payments through Algorand Smart Contracts.</p>
            <button onClick={() => setStage('marketplace')} style={primaryBtn}>Launch Dashboard</button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '80px', textAlign: 'left' }}>
              <div style={featureBox}>
                 <div style={{fontSize: '2rem', marginBottom: '15px'}}>🛡️</div>
                 <h3 style={{marginBottom: '10px'}}>Secure Escrow</h3>
                 <p style={{fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.5'}}>Funds are cryptographically locked until the AI agent submits a verifiable output hash back to the mainnet.</p>
              </div>
              <div style={featureBox}>
                 <div style={{fontSize: '2rem', marginBottom: '15px'}}>⚡</div>
                 <h3 style={{marginBottom: '10px'}}>3.3s Finality</h3>
                 <p style={{fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.5'}}>Experience immediate machine-to-machine settlement powered by the Algorand PURE Proof-of-Stake network.</p>
              </div>
              <div style={featureBox}>
                 <div style={{fontSize: '2rem', marginBottom: '15px'}}>🔍</div>
                 <h3 style={{marginBottom: '10px'}}>Verified Output</h3>
                 <p style={{fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.5'}}>Every computational task is recorded on-chain, ensuring high reputation and reliability across the node network.</p>
              </div>
            </div>
          </div>
        )}

        {/* MARKETPLACE SECTION */}
        {stage === 'marketplace' && !selectedAgent && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            {agentsList.map(agent => (
              <div key={agent.id} onClick={() => setSelectedAgent(agent)} style={agentCard(getStatus(agent.id) === 'Completed')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: agent.color, fontSize: '0.7rem', fontWeight: 'bold' }}>{agent.model}</span><span style={{ color: getStatus(agent.id) === 'Completed' ? '#4ade80' : '#94a3b8', fontSize: '0.7rem' }}>● {getStatus(agent.id)}</span></div>
                <h3 style={{ margin: '15px 0 5px' }}>{agent.name}</h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{agent.role}</p>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 'bold' }}>{agent.price}</span><span style={{ color: '#38bdf8', fontSize: '0.8rem' }}>DEPLOY NODE →</span></div>
              </div>
            ))}
          </div>
        )}

        {/* EXECUTION VIEW */}
        {stage === 'marketplace' && selectedAgent && (
          <div style={{ maxWidth: '600px', margin: '0 auto', background: '#0f172a', padding: '40px', borderRadius: '24px', border: `1px solid ${selectedAgent.color}` }}>
            <button onClick={() => setSelectedAgent(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
            <h2 style={{ marginBottom: '25px' }}>{selectedAgent.name} Status</h2>
            <div style={{ padding: '25px', background: '#020617', borderRadius: '15px', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span>Status:</span><span style={{ color: selectedAgent.color, fontWeight: 'bold' }}>{getStatus(selectedAgent.id)}</span></div>
              <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: getStatus(selectedAgent.id) === 'Processing' ? '100%' : (getStatus(selectedAgent.id) === 'Completed' ? '100%' : '0%'), height: '100%', background: selectedAgent.color, transition: 'width 3.5s linear' }}></div></div>
            </div>
            {getStatus(selectedAgent.id) === 'Idle' && <button onClick={() => runTask(selectedAgent.id)} style={{ ...primaryBtn, width: '100%', marginTop: '20px' }}>Initiate Escrow & Run Task</button>}
            {getStatus(selectedAgent.id) === 'Completed' && <div style={{ marginTop: '20px' }}><div style={{ padding: '20px', background: '#065f4633', borderRadius: '12px', border: '1px solid #34d399', color: '#34d399' }}><p><b>OUTPUT:</b> {selectedAgent.result}</p></div><button onClick={() => resetAgent(selectedAgent.id)} style={{ width: '100%', marginTop: '15px', background: 'transparent', border: '1px solid #334155', color: '#94a3b8', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>♻ Clear Cache & Reset Agent</button></div>}
          </div>
        )}

        {/* REGISTRATION & DOCS */}
        {stage === 'register' && (
          <div style={{ maxWidth: '600px', margin: '0 auto', background: '#0f172a', padding: '40px', borderRadius: '20px', border: '1px solid #1e293b' }}>
            <h2 style={{ color: '#38bdf8', marginBottom: '10px' }}>Register AI Node</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '30px' }}>To prevent network spam, registering a node requires a <b>10 ALGO Stake</b> into the protocol escrow.</p>
            <div style={{ marginBottom: '20px' }}><label style={labelStyle}>Node Wallet Address</label><input placeholder="Algorand Address..." style={inputStyle} /></div>
            <div style={{ marginBottom: '20px' }}><label style={labelStyle}>Service Category</label><select style={inputStyle}><option>LLM / NLP Service</option><option>Computer Vision</option><option>Predictive Modeling</option></select></div>
            <button style={{ ...primaryBtn, width: '100%' }} onClick={() => alert("Staking initiated...")}>Authorize & Stake 10 ALGO</button>
          </div>
        )}

        {stage === 'docs' && (
          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ width: '220px', color: '#94a3b8', fontSize: '0.85rem', borderRight: '1px solid #1e293b' }}>
              <p style={{ color: '#38bdf8', fontWeight: 'bold' }}>CORE CONCEPTS</p>
              <p style={{ marginTop: '12px' }}>Smart Contract Escrow</p><p>M2M Settlement</p>
              <p style={{ marginTop: '30px', color: '#38bdf8', fontWeight: 'bold' }}>DEVELOPER API</p>
              <p style={{ marginTop: '12px' }}>Python Agent SDK</p><p>Output Verification</p>
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ color: '#38bdf8', marginBottom: '20px' }}>Technical Architecture</h2>
              <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '20px' }}>The AI-Nexus Protocol operates as a Layer-2 solution on Algorand. It utilizes Stateful Smart Contracts to verify task completion before releasing service fees.</p>
              <div style={{ background: '#020617', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b', fontFamily: 'monospace', color: '#38bdf8', fontSize: '0.8rem' }}>
                // release_escrow(agent_id, task_hash) <br/>
                byte "verified_hash" <br/>
                app_global_get <br/>
                == // Check if hash matches agent submission <br/>
                assert <br/>
                itxn_begin // Release payment
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

const primaryBtn = { background: '#38bdf8', color: '#020617', padding: '15px 35px', borderRadius: '12px', border: 'none', fontWeight: '800', cursor: 'pointer' }
const featureBox = { background: '#0f172a', padding: '30px', borderRadius: '16px', border: '1px solid #1e293b' }
const labelStyle = { display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px' }
const inputStyle = { width: '100%', padding: '12px', background: '#020617', border: '1px solid #334155', borderRadius: '10px', color: 'white' }
const agentCard = (done) => ({ background: '#0f172a', padding: '25px', borderRadius: '20px', cursor: 'pointer', border: done ? '1px solid #4ade80' : '1px solid #1e293b' })
