import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Upload, Activity, Lock, Unlock, Eye } from 'lucide-react';

const SentinelAI = () => {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [agentLogs, setAgentLogs] = useState([]);

  // Simulated deepfake detection with realistic scoring
  const analyzeFile = async (file) => {
    setAnalyzing(true);
    setAgentLogs([]);
    
    // Simulate processing time
    await new Promise(r => setTimeout(r, 1000));
    
    // Detection Agent
    addLog('detection', 'Analyzing audio/video fingerprints...');
    await new Promise(r => setTimeout(r, 800));
    
    // Simulate detection based on filename patterns or random for demo
    const isDeepfake = file.name.toLowerCase().includes('fake') || 
                       file.name.toLowerCase().includes('deep') ||
                       Math.random() > 0.6;
    
    const baseConfidence = isDeepfake ? 
      Math.random() * 30 + 15 : // 15-45% for fakes
      Math.random() * 25 + 75;  // 75-100% for real
    
    const confidence = Math.round(baseConfidence);
    
    addLog('detection', `Confidence score: ${confidence}%`);
    addLog('detection', `Biometric markers analyzed: ${Math.floor(Math.random() * 20 + 15)}`);
    
    await new Promise(r => setTimeout(r, 600));
    
    // Decision Agent
    addLog('decision', 'Evaluating threat level...');
    
    let classification, threat, action;
    if (confidence >= 70) {
      classification = 'Authentic';
      threat = 'low';
      action = 'allow';
      addLog('decision', 'Classification: AUTHENTIC - Low threat');
    } else if (confidence >= 40) {
      classification = 'Suspicious';
      threat = 'medium';
      action = 'restrict';
      addLog('decision', 'Classification: SUSPICIOUS - Medium threat');
    } else {
      classification = 'Fake';
      threat = 'high';
      action = 'deceive';
      addLog('decision', 'Classification: DEEPFAKE DETECTED - High threat');
    }
    
    await new Promise(r => setTimeout(r, 700));
    
    // Defense Agent
    addLog('defense', 'Initiating defense protocol...');
    await new Promise(r => setTimeout(r, 500));
    
    if (action === 'allow') {
      addLog('defense', '✓ Command authorized - IoT device accessed');
      addLog('defense', 'Action: Door unlocked successfully');
    } else if (action === 'restrict') {
      addLog('defense', '⚠ Access restricted - User verification required');
      addLog('defense', 'Action: 2FA authentication triggered');
    } else {
      addLog('defense', '🎭 DECEPTION MODE ACTIVATED');
      addLog('defense', 'Redirecting to honeypot environment...');
      await new Promise(r => setTimeout(r, 400));
      addLog('defense', '→ Fake success response sent to attacker');
      addLog('defense', '→ Attack logged silently');
      addLog('defense', '→ Real IoT devices remain secure');
    }
    
    setResult({
      confidence,
      classification,
      threat,
      action,
      fileName: file.name,
      fileType: file.type.includes('audio') ? 'audio' : 'video',
      timestamp: new Date().toLocaleTimeString()
    });
    
    setAnalyzing(false);
  };

  const addLog = (agent, message) => {
    setAgentLogs(prev => [...prev, { agent, message, time: Date.now() }]);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setResult(null);
      analyzeFile(uploadedFile);
    }
  };

  const resetDemo = () => {
    setFile(null);
    setResult(null);
    setAgentLogs([]);
  };

  const getStatusIcon = () => {
    if (!result) return <Shield className="w-6 h-6" />;
    if (result.classification === 'Authentic') return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (result.classification === 'Suspicious') return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    return <XCircle className="w-6 h-6 text-red-500" />;
  };

  const getActionBadge = () => {
    if (!result) return null;
    
    const badges = {
      allow: { bg: 'bg-green-100', text: 'text-green-800', icon: <Unlock className="w-4 h-4" />, label: 'ALLOWED' },
      restrict: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Lock className="w-4 h-4" />, label: 'RESTRICTED' },
      deceive: { bg: 'bg-red-100', text: 'text-red-800', icon: <Eye className="w-4 h-4" />, label: 'DECEPTION MODE' }
    };
    
    const badge = badges[result.action];
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badge.bg} ${badge.text} font-semibold`}>
        {badge.icon}
        {badge.label}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">SentinelAI</h1>
          </div>
          <p className="text-blue-200 text-lg">Agentic Deepfake Defense for Smart Home IoT Security</p>
          <p className="text-slate-400 mt-2">Multi-Agent AI System with Autonomous Deception-Based Defense</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Upload & Results */}
          <div className="space-y-6">
            {/* Upload Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Voice/Video Command
              </h2>
              
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:border-blue-300 transition-colors bg-blue-500/10">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 text-blue-400 mb-3" />
                  <p className="text-sm text-blue-200">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Audio or Video file</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="audio/*,video/*"
                  onChange={handleFileUpload}
                />
              </label>

              {file && (
                <div className="mt-4 p-3 bg-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-200">
                    <span className="font-semibold">File:</span> {file.name}
                  </p>
                </div>
              )}
            </div>

            {/* Results Card */}
            {result && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  {getStatusIcon()}
                  Detection Results
                </h2>

                <div className="space-y-4">
                  {/* Classification */}
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Classification</p>
                    <p className={`text-2xl font-bold ${
                      result.classification === 'Authentic' ? 'text-green-400' :
                      result.classification === 'Suspicious' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {result.classification.toUpperCase()}
                    </p>
                  </div>

                  {/* Confidence Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Authenticity Confidence</span>
                      <span className="text-white font-semibold">{result.confidence}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          result.confidence >= 70 ? 'bg-green-500' :
                          result.confidence >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Taken */}
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Defense Action</p>
                    {getActionBadge()}
                  </div>

                  {/* Threat Level */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className={`p-3 rounded-lg ${result.threat === 'low' ? 'bg-green-500/20 border border-green-500' : 'bg-slate-700/50'}`}>
                      <p className="text-xs text-slate-400">Threat</p>
                      <p className="text-sm font-semibold text-white">Low</p>
                    </div>
                    <div className={`p-3 rounded-lg ${result.threat === 'medium' ? 'bg-yellow-500/20 border border-yellow-500' : 'bg-slate-700/50'}`}>
                      <p className="text-xs text-slate-400">Threat</p>
                      <p className="text-sm font-semibold text-white">Medium</p>
                    </div>
                    <div className={`p-3 rounded-lg ${result.threat === 'high' ? 'bg-red-500/20 border border-red-500' : 'bg-slate-700/50'}`}>
                      <p className="text-xs text-slate-400">Threat</p>
                      <p className="text-sm font-semibold text-white">High</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {result && (
              <button 
                onClick={resetDemo}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Reset Demo
              </button>
            )}
          </div>

          {/* Right Panel - Agent Logs */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Multi-Agent System Logs
            </h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {analyzing && agentLogs.length === 0 && (
                <div className="text-center py-8">
                  <div className="animate-spin w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-slate-400">Initializing agents...</p>
                </div>
              )}

              {agentLogs.map((log, idx) => {
                const agentColors = {
                  detection: { bg: 'bg-blue-500/20', border: 'border-blue-500', icon: '🔍' },
                  decision: { bg: 'bg-purple-500/20', border: 'border-purple-500', icon: '🧠' },
                  defense: { bg: 'bg-red-500/20', border: 'border-red-500', icon: '🛡️' }
                };
                
                const style = agentColors[log.agent];
                
                return (
                  <div 
                    key={idx}
                    className={`p-4 rounded-lg border-l-4 ${style.bg} ${style.border} animate-fade-in`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{style.icon}</span>
                      <div className="flex-1">
                        <p className="text-xs text-slate-400 uppercase font-semibold mb-1">
                          {log.agent} Agent
                        </p>
                        <p className="text-sm text-white">{log.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {!analyzing && agentLogs.length === 0 && (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Upload a file to begin analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
            <h3 className="text-blue-300 font-semibold mb-2">🔍 Detection Agent</h3>
            <p className="text-sm text-slate-300">Analyzes biometric patterns and audio/video fingerprints to detect deepfakes</p>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
            <h3 className="text-purple-300 font-semibold mb-2">🧠 Decision Agent</h3>
            <p className="text-sm text-slate-300">Evaluates threat levels and determines appropriate security response</p>
          </div>
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
            <h3 className="text-red-300 font-semibold mb-2">🛡️ Defense Agent</h3>
            <p className="text-sm text-slate-300">Executes autonomous defense with deception-based honeypot for attackers</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default SentinelAI;