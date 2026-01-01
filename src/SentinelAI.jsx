import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Upload, Activity, Lock, Unlock, Eye, BarChart3, Settings, Zap, Bell, TrendingUp } from 'lucide-react';

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
  const [stats, setStats] = useState({ blocked: 127, rate: 98.7, devices: 23, uptime: 99.9 });
  const [threatActivity, setThreatActivity] = useState([]);
  const [selectedAttack, setSelectedAttack] = useState('Legitimate Owner');

  const iotDevices = [
    { name: 'Smart Camera', status: 'online', threats: 0 },
    { name: 'Thermostat', status: 'online', threats: 0 },
    { name: 'Smart Lock', status: 'online', threats: 2 },
    { name: 'Smart Light', status: 'online', threats: 0 },
    { name: 'Speaker', status: 'online', threats: 1 },
    { name: 'Doorbell', status: 'online', threats: 0 }
  ];

  useEffect(() => {
    const times = [];
    const now = new Date();
    for (let i = 10; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60000);
      times.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        threat: Math.random() > 0.7 ? 1 : 0
      });
    }
    setThreatActivity(times);
  }, []);

  const addLog = (agent, message) => {
    setAgentLogs(prev => [...prev, { agent, message, time: Date.now() }]);
  };

  const quickAttack = async (scenario) => {
    let baseConfidence;
    let variance;
    
    if (scenario === 'Legitimate Owner') {
      baseConfidence = 88;
      variance = 8;
    } else if (scenario === 'Suspicious Voice') {
      baseConfidence = 58;
      variance = 12;
    } else if (scenario === 'Deepfake Attack') {
      baseConfidence = 22;
      variance = 10;
    } else {
      baseConfidence = 48;
      variance = 15;
    }
    
    const riskAdjustment = (3 - riskLevel) * 5;
    const finalConfidence = Math.max(5, Math.min(98, 
      Math.round(baseConfidence + (Math.random() - 0.5) * variance + riskAdjustment)
    ));
    
    setAnalyzing(true);
    setAgentLogs([]);
    
    const detectionTime = 600 + Math.random() * 400;
    const decisionTime = 500 + Math.random() * 300;
    const defenseTime = 400 + Math.random() * 200;
    
    await new Promise(r => setTimeout(r, 800));
    
    addLog('detection', 'Analyzing ' + scenario + '...');
    addLog('detection', 'Risk sensitivity level: ' + riskLevel + '/5');
    await new Promise(r => setTimeout(r, detectionTime));
    
    const biometricMarkers = Math.floor(Math.random() * 25 + 12);
    const anomaliesDetected = Math.floor((100 - finalConfidence) / 8 + Math.random() * 3);
    
    addLog('detection', 'Confidence score: ' + finalConfidence + '%');
    addLog('detection', 'Biometric markers analyzed: ' + biometricMarkers);
    addLog('detection', 'Anomalies detected: ' + anomaliesDetected);
    
    await new Promise(r => setTimeout(r, decisionTime));
    
    let classification, threat, action;
    const threshold = 70 - (riskLevel - 3) * 5;
    const lowThreshold = 40 - (riskLevel - 3) * 5;
    
    if (finalConfidence >= threshold) {
      classification = 'Authentic';
      threat = 'low';
      action = 'allow';
      addLog('decision', 'Classification: AUTHENTIC - Low threat detected');
      addLog('decision', 'User verification: PASSED');
    } else if (finalConfidence >= lowThreshold) {
      classification = 'Suspicious';
      threat = 'medium';
      action = 'restrict';
      addLog('decision', 'Classification: SUSPICIOUS - Medium threat');
      addLog('decision', 'Additional verification required');
    } else {
      classification = 'Fake';
      threat = 'high';
      action = 'deceive';
      addLog('decision', 'Classification: DEEPFAKE DETECTED - High threat');
      addLog('decision', 'Malicious intent confirmed');
    }
    
    await new Promise(r => setTimeout(r, defenseTime));
    
    addLog('defense', 'Initiating defense protocol...');
    await new Promise(r => setTimeout(r, 300));
    
    if (action === 'allow') {
      const devices = ['Smart Lock', 'Security Camera', 'Garage Door', 'Smart Light'];
      const device = devices[Math.floor(Math.random() * devices.length)];
      addLog('defense', 'Command authorized - IoT device accessed');
      addLog('defense', 'Action: ' + device + ' activated successfully');
      addLog('defense', 'Session logged and authenticated');
    } else if (action === 'restrict') {
      addLog('defense', 'Access restricted - Enhanced security enabled');
      addLog('defense', '2FA authentication triggered');
      addLog('defense', 'User notification sent to mobile device');
    } else {
      addLog('defense', 'DECEPTION MODE ACTIVATED');
      addLog('defense', 'Redirecting to honeypot environment...');
      await new Promise(r => setTimeout(r, 400));
      addLog('defense', 'Fake success response sent to attacker');
      addLog('defense', 'IP: ' + (Math.floor(Math.random() * 255) + 1) + '.' + (Math.floor(Math.random() * 255)) + '.' + (Math.floor(Math.random() * 255)) + '.' + (Math.floor(Math.random() * 255)) + ' logged');
      addLog('defense', 'Real IoT devices remain secure');
      setStats(prev => ({ ...prev, blocked: prev.blocked + 1 }));
    }
    
    const newResult = {
      confidence: finalConfidence,
      classification,
      threat,
      action,
      fileName: scenario,
      timestamp: new Date().toLocaleTimeString(),
      features: {
        'MFCC Variance': (Math.random() * 50 + 10).toFixed(2),
        'Chroma Correlation': (Math.random() * 1.1 - 0.2).toFixed(2),
        'Spectral Rolloff': (Math.random() * 0.8 + 0.1).toFixed(2),
        'Zero Crossing Rate': (Math.random() * 0.15 + 0.05).toFixed(3),
        'Pitch Deviation': (Math.random() * 100).toFixed(1) + ' Hz',
        'Voice Jitter': (Math.random() * 5).toFixed(2) + '%',
        'Harmonic Ratio': (Math.random() * 0.5 + 0.5).toFixed(2)
      }
    };
    
    setResult(newResult);
    setAttackHistory(prev => [newResult, ...prev].slice(0, 10));
    
    setThreatActivity(prev => [...prev.slice(1), {
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      threat: threat === 'high' ? 1 : threat === 'medium' ? 0.5 : 0
    }]);
    
    setAnalyzing(false);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setResult(null);
      
      const fileName = uploadedFile.name.toLowerCase();
      let scenario = 'Legitimate Owner';
      
      if (fileName.includes('fake') || fileName.includes('deep')) {
        scenario = 'Deepfake Attack';
      } else if (fileName.includes('sus') || fileName.includes('test')) {
        scenario = 'Suspicious Voice';
      }
      
      setSelectedAttack(scenario);
      quickAttack(scenario);
    }
  };

  const resetDemo = () => {
    setFile(null);
    setResult(null);
    setAgentLogs([]);
    setAttackHistory([]);
    setShowFeatures(false);
    setStats({ blocked: 127, rate: 98.7, devices: 23, uptime: 99.9 });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-blue-400" />
          <div>
            <h2 className="text-white font-bold text-lg">SentinelAI</h2>
            <p className="text-slate-500 text-xs">Pro</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-purple-400" />
            <h3 className="text-white font-semibold text-sm">DEMO CONTROLS</h3>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Demo Mode</span>
            <button
              onClick={() => setDemoMode(!demoMode)}
              className={'w-12 h-6 rounded-full transition-colors relative ' + (demoMode ? 'bg-blue-600' : 'bg-slate-700')}
            >
              <div className={'w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ' + (demoMode ? 'left-6' : 'left-0.5')} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-orange-400" />
            <h3 className="text-white font-semibold text-sm">RISK LEVEL</h3>
          </div>
          <div className="mb-2">
            <span className="text-slate-400 text-xs">Sensitivity</span>
            <div className="flex items-center gap-2 mt-2">
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={riskLevel} 
                onChange={(e) => setRiskLevel(Number(e.target.value))} 
                className="flex-1"
              />
              <span className="text-white font-bold w-6 text-center">{riskLevel}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Lenient</span>
              <span>Strict</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-green-400" />
            <h3 className="text-white font-semibold text-sm">QUICK STATS</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-slate-400 text-xs mb-1">Attacks Blocked</p>
              <p className="text-white text-2xl font-bold">{stats.blocked}</p>
              <p className="text-green-400 text-xs">↑ 12</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-1">Detection Rate</p>
              <p className="text-white text-2xl font-bold">{stats.rate}%</p>
              <p className="text-green-400 text-xs">↑ 0.2%</p>
            </div>
          </div>
        </div>

        <button 
          onClick={resetDemo}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Activity className="w-4 h-4" />
          RESET SYSTEM
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">SentinelAI Pro</h1>
            <p className="text-slate-400">Agentic Deepfake Defense for Smart Home IoT Security</p>
          </div>

          <div className="flex gap-2 mb-6 border-b border-slate-800">
            <button onClick={() => setActiveTab('demo')} className={'flex items-center gap-2 px-6 py-3 font-semibold border-b-2 transition-colors ' + (activeTab === 'demo' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white')}>
              <Zap className="w-4 h-4" /> LIVE DEMO
            </button>
            <button onClick={() => setActiveTab('dashboard')} className={'flex items-center gap-2 px-6 py-3 font-semibold border-b-2 transition-colors ' + (activeTab === 'dashboard' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white')}>
              <BarChart3 className="w-4 h-4" /> DASHBOARD
            </button>
            <button onClick={() => setActiveTab('devices')} className={'flex items-center gap-2 px-6 py-3 font-semibold border-b-2 transition-colors ' + (activeTab === 'devices' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white')}>
              <Bell className="w-4 h-4" /> DEVICES
            </button>
            <button onClick={() => setActiveTab('analytics')} className={'flex items-center gap-2 px-6 py-3 font-semibold border-b-2 transition-colors ' + (activeTab === 'analytics' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white')}>
              <TrendingUp className="w-4 h-4" /> ANALYTICS
            </button>
            <button onClick={() => setActiveTab('settings')} className={'flex items-center gap-2 px-6 py-3 font-semibold border-b-2 transition-colors ' + (activeTab === 'settings' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white')}>
              <Settings className="w-4 h-4" /> SETTINGS
            </button>
          </div>

          {activeTab === 'demo' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5" /> Upload Voice/Video
                  </h2>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-500 rounded-lg cursor-pointer hover:border-blue-400 bg-blue-500/10">
                    <Upload className="w-10 h-10 text-blue-400 mb-3" />
                    <p className="text-sm text-blue-200"><span className="font-semibold">Click to upload</span></p>
                    <input type="file" className="hidden" accept="audio/*,video/*" onChange={handleFileUpload} />
                  </label>
                  {file && <div className="mt-4 p-3 bg-blue-500/20 rounded-lg"><p className="text-sm text-blue-200"><span className="font-semibold">File:</span> {file.name}</p></div>}
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-orange-400" />
                    <h2 className="text-xl font-semibold text-white">QUICK ATTACK SIMULATOR</h2>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-slate-400 text-sm mb-2 block">Choose attack:</label>
                    <select 
                      value={selectedAttack}
                      onChange={(e) => setSelectedAttack(e.target.value)}
                      className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600"
                    >
                      <option>Legitimate Owner</option>
                      <option>Suspicious Voice</option>
                      <option>Deepfake Attack</option>
                      <option>Video Command</option>
                    </select>
                  </div>

                  <button
                    onClick={() => quickAttack(selectedAttack)}
                    disabled={analyzing}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 text-lg"
                  >
                    <Zap className="w-5 h-5" />
                    LAUNCH {selectedAttack.split(' ')[0]}
                  </button>
                </div>

                {result && (
                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h2 className="text-xl font-semibold text-white mb-4">Detection Results</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Classification</p>
                        <p className={'text-3xl font-bold ' + (result.classification === 'Authentic' ? 'text-green-400' : result.classification === 'Suspicious' ? 'text-yellow-400' : 'text-red-400')}>
                          {result.classification.toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">Confidence</span>
                          <span className="text-white font-semibold">{result.confidence}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-4">
                          <div className={'h-full rounded-full transition-all duration-1000 ' + (result.confidence >= 70 ? 'bg-green-500' : result.confidence >= 40 ? 'bg-yellow-500' : 'bg-red-500')} style={{ width: result.confidence + '%' }} />
                        </div>
                      </div>
                      <button onClick={() => setShowFeatures(!showFeatures)} className="w-full bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 py-2 rounded-lg">
                        {showFeatures ? 'Hide' : 'Show'} Features
                      </button>
                      {showFeatures && (
                        <div className="bg-slate-900/50 rounded-lg p-4">
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
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" /> Agent Logs
                </h2>
                <div className="space-y-3 max-h-[800px] overflow-y-auto">
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
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">REALTIME DASHBOARD</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <p className="text-blue-400 text-sm mb-2 flex items-center gap-2"><Shield className="w-4 h-4" /> Devices Protected</p>
                  <p className="text-4xl font-bold text-white">{stats.devices}</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <p className="text-red-400 text-sm mb-2 flex items-center gap-2"><XCircle className="w-4 h-4" /> Threats Blocked</p>
                  <p className="text-4xl font-bold text-white">{attackHistory.filter(h => h.action === 'deceive').length}</p>
                  <p className="text-green-400 text-sm mt-1">↑ 3</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <p className="text-yellow-400 text-sm mb-2 flex items-center gap-2"><Eye className="w-4 h-4" /> Honeypots Active</p>
                  <p className="text-4xl font-bold text-white">{attackHistory.filter(h => h.action === 'deceive').length}</p>
                  <p className="text-green-400 text-sm mt-1">↑ 1</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <p className="text-green-400 text-sm mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Uptime</p>
                  <p className="text-4xl font-bold text-white">{stats.uptime}%</p>
                  <p className="text-green-400 text-sm mt-1">↑ 0.1%</p>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Threat Activity (Last 10min)</h3>
                <div className="relative h-64">
                  <svg width="100%" height="100%" viewBox="0 0 800 200" className="overflow-visible">
                    {[0, 0.2, 0.4, 0.6, 0.8, 1].map((val, idx) => (
                      <text key={idx} x="10" y={200 - val * 180} fill="#94a3b8" fontSize="12">{val.toFixed(1)}</text>
                    ))}
                    
                    {[0, 0.2, 0.4, 0.6, 0.8, 1].map((val, idx) => (
                      <line key={idx} x1="40" y1={200 - val * 180} x2="780" y2={200 - val * 180} stroke="#334155" strokeWidth="1" />
                    ))}
                    
                    <polyline
                      points={threatActivity.map((d, i) => `${60 + i * 65},${200 - d.threat * 180}`).join(' ')}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                    />
                    
                    {threatActivity.map((d, i) => (
                      <circle key={i} cx={60 + i * 65} cy={200 - d.threat * 180} r="4" fill="#3b82f6" />
                    ))}
                    
                    {threatActivity.map((d, i) => (
                      i % 2 === 0 && (
                        <text key={i} x={60 + i * 65} y="220" fill="#94a3b8" fontSize="10" textAnchor="middle">{d.time}</text>
                      )
                    ))}
                    
                    <text x="15" y="20" fill="#94a3b8" fontSize="12" transform="rotate(-90 15 100)">Threat</text>
                    <text x="400" y="245" fill="#94a3b8" fontSize="12" textAnchor="middle">Time</text>
                  </svg>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">LIVE ATTACK LOG</h3>
                {attackHistory.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">No attacks yet</p>
                ) : (
                  <div className="space-y-2">
                    {attackHistory.map((attack, idx) => (
                      <div key={idx} className="bg-slate-900/50 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={'w-3 h-3 rounded-full ' + (attack.threat === 'high' ? 'bg-red-500' : attack.threat === 'medium' ? 'bg-yellow-500' : 'bg-green-500')} />
                          <div>
                            <p className="text-white font-semibold">{attack.fileName}</p>
                            <p className="text-slate-400 text-sm">{attack.timestamp}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={'font-bold text-lg ' + (attack.classification === 'Authentic' ? 'text-green-400' : attack.classification === 'Suspicious' ? 'text-yellow-400' : 'text-red-400')}>
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
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">IOT DEVICE MONITOR</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {iotDevices.map((device, idx) => (
                  <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-white font-bold text-lg">{device.name}</h3>
                      <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm font-semibold">ONLINE</span>
                      </div>
                      </div>
                      <div className="flex justify-between items-center">
                      <span className="text-slate-400">Status</span>
                      <span className="text-white font-bold text-xl">SECURE</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                      <span className="text-slate-400 text-sm">Threats</span>
                      <span className={'font-bold ' + (device.threats > 0 ? 'text-red-400' : 'text-green-400')}>
                      {device.threats > 0 ? '↑ ' + device.threats + ' threats' : '↑ 0 threats'}
                      </span>
                      </div>
                      </div>
                      ))}
                      </div>
                      </div>
                      )}

                      {activeTab === 'analytics' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">SECURITY ANALYTICS</h2>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-6">Detection Accuracy</h3>
            <div className="relative h-96">
              <svg width="100%" height="100%" viewBox="0 0 800 300">
                {[0, 20, 40, 60, 80, 100].map((val, idx) => (
                  <g key={idx}>
                    <text x="25" y={280 - val * 2.5} fill="#94a3b8" fontSize="14">{val}</text>
                    <line x1="60" y1={280 - val * 2.5} x2="750" y2={280 - val * 2.5} stroke="#334155" strokeWidth="1" />
                  </g>
                ))}
                
                <rect x="150" y="50" width="120" height="230" fill="#22c55e" />
                <text x="210" y="295" fill="#94a3b8" fontSize="14" textAnchor="middle">Authentic</text>
                <text x="210" y="40" fill="#22c55e" fontSize="16" fontWeight="bold" textAnchor="middle">92%</text>
                
                <rect x="340" y="112" width="120" height="168" fill="#f59e0b" />
                <text x="400" y="295" fill="#94a3b8" fontSize="14" textAnchor="middle">Suspicious</text>
                <text x="400" y="102" fill="#f59e0b" fontSize="16" fontWeight="bold" textAnchor="middle">67%</text>
                
                <rect x="530" y="30" width="120" height="250" fill="#ef4444" />
                <text x="590" y="295" fill="#94a3b8" fontSize="14" textAnchor="middle">Deepfake</text>
                <text x="590" y="20" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle">98%</text>
                
                <text x="400" y="320" fill="#94a3b8" fontSize="14" textAnchor="middle">Detected</text>
              </svg>
            </div>
            
            <div className="flex justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded" />
                <span className="text-slate-300">Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded" />
                <span className="text-slate-300">Suspicious</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded" />
                <span className="text-slate-300">Deepfake</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">SYSTEM CONFIGURATION</h2>
          </div>
          <div className="space-y-4">
            {[
              ['Detection Engine', 'Heuristic ML v2.1'],
              ['Active Agents', '3 (Detection, Decision, Defense)'],
              ['Honeypot Status', 'ACTIVE'],
              ['Risk Threshold', '50%'],
              ['Auto-Defense', 'ENABLED']
            ].map(([key, value]) => (
              <div key={key} className="bg-slate-900/50 p-4 rounded-lg flex justify-between items-center">
                <p className="text-slate-400">{key}</p>
                <p className="text-white font-bold text-lg">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
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
