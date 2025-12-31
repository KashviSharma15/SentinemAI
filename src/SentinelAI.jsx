import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Upload, Activity, Lock, Unlock, Eye, BarChart3, Settings, Zap } from 'lucide-react';

function SentinelAI() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [agentLogs, setAgentLogs] = useState([]);
  const [demoMode, setDemoMode] = useState(true);
  const [riskLevel, setRiskLevel] = useState(3);
  const [attackHistory, setAttackHistory] = useState([]);
  const [showFeatures, setShowFeatures] = useState(false);
  const [activeTab, setActiveTab] = useState('demo');
  const [stats, setStats] = useState({ blocked: 127, rate: 98.7 });

  const iotDevices = [
    { name: 'Smart Camera', status: 'online', threats: 0 },
    { name: 'Thermostat', status: 'online', threats: 0 },
    { name: 'Smart Lock', status: 'online', threats: 2 },
    { name: 'Smart Light', status: 'online', threats: 0 },
    { name: 'Speaker', status: 'online', threats: 1 },
    { name: 'Doorbell', status: 'online', threats: 0 }
  ];

  const addLog = (agent, message) => {
    setAgentLogs(prev => [...prev, { agent, message, time: Date.now() }]);
  };

  const quickAttack = async (scenario) => {
    const scenarios = {
      'Legitimate Owner': 92,
      'Suspicious Voice': 67,
      'Deepfake Attack': 23,
      'Video Command': 45
    };
    
    setAnalyzing(true);
    setAgentLogs([]);
    await new Promise(r => setTimeout(r, 800));
    
    addLog('detection', 'Analyzing ' + scenario);
    await new Promise(r => setTimeout(r, 600));
    
    const confidence = scenarios[scenario];
    addLog('detection', 'Confidence score: ' + confidence + '%');
    await new Promise(r => setTimeout(r, 600));
    
    let classification, threat, action;
    if (confidence >= 70) {
      classification = 'Authentic';
      threat = 'low';
      action = 'allow';
      addLog('decision', 'AUTHENTIC - Low threat');
    } else if (confidence >= 40) {
      classification = 'Suspicious';
      threat = 'medium';
      action = 'restrict';
      addLog('decision', 'SUSPICIOUS - Medium threat');
    } else {
      classification = 'Fake';
      threat = 'high';
      action = 'deceive';
      addLog('decision', 'DEEPFAKE DETECTED - High threat');
    }
    
    await new Promise(r => setTimeout(r, 700));
    addLog('defense', 'Initiating defense protocol');
    await new Promise(r => setTimeout(r, 500));
    
    if (action === 'allow') {
      addLog('defense', 'Command authorized - IoT device accessed');
    } else if (action === 'restrict') {
      addLog('defense', 'Access restricted - 2FA required');
    } else {
      addLog('defense', 'DECEPTION MODE ACTIVATED');
      await new Promise(r => setTimeout(r, 400));
      addLog('defense', 'Honeypot engaged - Attacker deceived');
      setStats(prev => ({ ...prev, blocked: prev.blocked + 1 }));
    }
    
    const newResult = {
      confidence,
      classification,
      threat,
      action,
      fileName: scenario,
      timestamp: new Date().toLocaleTimeString(),
      features: {
        'MFCC Variance': (Math.random() * 50 + 10).toFixed(2),
        'Chroma Correlation': (Math.random() * 1.1 - 0.2).toFixed(2),
        'Spectral Rolloff': (Math.random() * 0.8 + 0.1).toFixed(2),
        'Zero Crossing Rate': (Math.random() * 0.15 + 0.05).toFixed(3)
      }
    };
    
    setResult(newResult);
    setAttackHistory(prev => [newResult, ...prev].slice(0, 10));
    setAnalyzing(false);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setResult(null);
      quickAttack('Legitimate Owner');
    }
  };

  const resetDemo = () => {
    setFile(null);
    setResult(null);
    setAgentLogs([]);
    setAttackHistory([]);
    setShowFeatures(false);
    setStats({ blocked: 127, rate: 98.7 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">SentinelAI Pro</h1>
          </div>
          <p className="text-blue-200 text-lg">Agentic Deepfake Defense for Smart Home IoT Security</p>
          <p className="text-slate-400 mt-2">Multi-Agent AI System with Autonomous Deception-Based Defense</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6 border border-white/20">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => setDemoMode(!demoMode)}
                className={'px-4 py-2 rounded-lg font-semibold transition-colors ' + (demoMode ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300')}
              >
                Demo Mode: {demoMode ? 'ON' : 'OFF'}
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-white text-sm">Risk:</span>
                <input type="range" min="1" max="5" value={riskLevel} onChange={(e) => setRiskLevel(Number(e.target.value))} className="w-32" />
                <span className="text-white font-semibold">{riskLevel}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-red-500/20 px-4 py-2 rounded-lg border border-red-500">
                <span className="text-red-300 text-sm font-semibold">Blocked: {stats.blocked}</span>
              </div>
              <div className="bg-green-500/20 px-4 py-2 rounded-lg border border-green-500">
                <span className="text-green-300 text-sm font-semibold">Rate: {stats.rate}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button onClick={() => setActiveTab('demo')} className={'flex items-center gap-2 px-6 py-3 rounded-t-lg font-semibold ' + (activeTab === 'demo' ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400')}>
            <Zap className="w-4 h-4" /> Live Demo
          </button>
          <button onClick={() => setActiveTab('dashboard')} className={'flex items-center gap-2 px-6 py-3 rounded-t-lg font-semibold ' + (activeTab === 'dashboard' ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400')}>
            <BarChart3 className="w-4 h-4" /> Dashboard
          </button>
          <button onClick={() => setActiveTab('devices')} className={'flex items-center gap-2 px-6 py-3 rounded-t-lg font-semibold ' + (activeTab === 'devices' ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400')}>
            <Activity className="w-4 h-4" /> Devices
          </button>
          <button onClick={() => setActiveTab('settings')} className={'flex items-center gap-2 px-6 py-3 rounded-t-lg font-semibold ' + (activeTab === 'settings' ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400')}>
            <Settings className="w-4 h-4" /> Settings
          </button>
        </div>

        {activeTab === 'demo' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5" /> Upload Voice/Video
                </h2>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:border-blue-300 bg-blue-500/10">
                  <Upload className="w-10 h-10 text-blue-400 mb-3" />
                  <p className="text-sm text-blue-200"><span className="font-semibold">Click to upload</span></p>
                  <input type="file" className="hidden" accept="audio/*,video/*" onChange={handleFileUpload} />
                </label>
                {file && <div className="mt-4 p-3 bg-blue-500/20 rounded-lg"><p className="text-sm text-blue-200"><span className="font-semibold">File:</span> {file.name}</p></div>}
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-4">Quick Attack Simulator</h2>
                <div className="grid grid-cols-2 gap-3">
                  {['Legitimate Owner', 'Suspicious Voice', 'Deepfake Attack', 'Video Command'].map(scenario => (
                    <button key={scenario} onClick={() => quickAttack(scenario)} disabled={analyzing} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg">
                      {scenario}
                    </button>
                  ))}
                </div>
              </div>

              {result && (
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h2 className="text-xl font-semibold text-white mb-4">Detection Results</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Classification</p>
                      <p className={'text-2xl font-bold ' + (result.classification === 'Authentic' ? 'text-green-400' : result.classification === 'Suspicious' ? 'text-yellow-400' : 'text-red-400')}>
                        {result.classification.toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Confidence</span>
                        <span className="text-white font-semibold">{result.confidence}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div className={'h-full rounded-full ' + (result.confidence >= 70 ? 'bg-green-500' : result.confidence >= 40 ? 'bg-yellow-500' : 'bg-red-500')} style={{ width: result.confidence + '%' }} />
                      </div>
                    </div>
                    <button onClick={() => setShowFeatures(!showFeatures)} className="w-full bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 py-2 rounded-lg">
                      {showFeatures ? 'Hide' : 'Show'} Features
                    </button>
                    {showFeatures && (
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        {Object.entries(result.features).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b border-slate-700 last:border-0">
                            <span className="text-slate-300 text-sm">{key}</span>
                            <span className="text-white font-semibold text-sm">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {result && <button onClick={resetDemo} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg">Reset Demo</button>}
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" /> Agent Logs
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {analyzing && agentLogs.length === 0 && (
                  <div className="text-center py-8">
                    <div className="animate-spin w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-slate-400">Analyzing...</p>
                  </div>
                )}
                {agentLogs.map((log, idx) => {
                  const colors = { detection: 'bg-blue-500/20 border-blue-500', decision: 'bg-purple-500/20 border-purple-500', defense: 'bg-red-500/20 border-red-500' };
                  return (
                    <div key={idx} className={'p-4 rounded-lg border-l-4 ' + colors[log.agent]}>
                      <p className="text-xs text-slate-400 uppercase font-semibold mb-1">{log.agent}</p>
                      <p className="text-sm text-white">{log.message}</p>
                    </div>
                  );
                })}
                {!analyzing && agentLogs.length === 0 && (
                  <div className="text-center py-12">
                    <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Run attack to begin</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <p className="text-slate-400 text-sm">Devices</p>
                <p className="text-3xl font-bold text-white">23</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <p className="text-slate-400 text-sm">Blocked</p>
                <p className="text-3xl font-bold text-red-400">{stats.blocked}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <p className="text-slate-400 text-sm">Honeypots</p>
                <p className="text-3xl font-bold text-yellow-400">{attackHistory.filter(h => h.action === 'deceive').length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <p className="text-slate-400 text-sm">Rate</p>
                <p className="text-3xl font-bold text-green-400">{stats.rate}%</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">Attack History</h2>
              {attackHistory.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No attacks yet</p>
              ) : (
                <div className="space-y-2">
                  {attackHistory.map((attack, idx) => (
                    <div key={idx} className="bg-slate-800/50 p-4 rounded-lg flex justify-between">
                      <div>
                        <p className="text-white font-semibold">{attack.fileName}</p>
                        <p className="text-slate-400 text-sm">{attack.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <p className={'font-semibold ' + (attack.classification === 'Authentic' ? 'text-green-400' : attack.classification === 'Suspicious' ? 'text-yellow-400' : 'text-red-400')}>
                          {attack.classification}
                        </p>
                        <p className="text-slate-400 text-sm">{attack.confidence}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'devices' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">IoT Devices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {iotDevices.map((device, idx) => (
                <div key={idx} className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-white font-semibold">{device.name}</h3>
                    <span className="text-green-400 text-sm">ONLINE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Threats</span>
                    <span className={'font-semibold ' + (device.threats > 0 ? 'text-red-400' : 'text-green-400')}>{device.threats}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Configuration</h2>
            <div className="space-y-4">
              {[
                ['Detection Engine', 'Heuristic ML v2.1'],
                ['Active Agents', '3 (Detection, Decision, Defense)'],
                ['Honeypot Status', 'ACTIVE'],
                ['Risk Threshold', '50%'],
                ['Auto-Defense', 'ENABLED']
              ].map(([key, value]) => (
                <div key={key} className="bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">{key}</p>
                  <p className="text-white font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
      `}</style>
    </div>
  );
}

export default SentinelAI;
