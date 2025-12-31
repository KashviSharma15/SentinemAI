#  SentinelAI: Agentic Deepfake Defense for Smart Home IoT Security

<div align="center">

**An autonomous AI-powered security system that detects deepfake attacks on IoT devices and defends using intelligent deception.**


</div>

---

## Problem Statement

Smart home IoT devices are vulnerable to **deepfake voice/video attacks** where attackers impersonate legitimate users to gain unauthorized access. Traditional security systems simply block suspicious requests, but this approach:
-  Provides no intelligence on attacker methods
-  Alerts attackers that they've been detected
-  Fails to adapt to evolving attack patterns

##  Solution

**SentinelAI** introduces a **multi-agent AI system** with **deception-based defense**:
-  Autonomous detection, decision-making, and defense
-  Honeypot mechanism that deceives attackers
-  Gathers attack intelligence while protecting real devices
-  Explainable AI with real-time decision logging

---

##  System Architecture

```
┌─────────────┐
│   User/     │
│  Attacker   │
└──────┬──────┘
       │ Audio/Video Command
       ▼
┌─────────────────────────────────────────┐
│           DETECTION AGENT               │
│  • Analyzes biometric patterns          │
│  • Generates confidence score (0-100%)  │
└──────┬──────────────────────────────────┘
       │ Confidence Score
       ▼
┌─────────────────────────────────────────┐
│           DECISION AGENT                │
│  • Classifies: Authentic/Suspicious/Fake│
│  • Determines threat level              │
└──────┬──────────────────────────────────┘
       │ Action Strategy
       ▼
┌─────────────────────────────────────────┐
│           DEFENSE AGENT                 │
│  • Allow / Restrict / Deceive           │
│  • Activates honeypot if fake detected  │
└──────┬──────────────────────────────────┘
       │
       ├─→ Real IoT Device (if authentic)
       └─→ Honeypot System (if fake)
```

---

##  Core Features

### 1️ **Multi-Agent Intelligence**

| Agent | Role | Output |
|-------|------|--------|
| **Detection** | Analyzes audio/video fingerprints | Confidence score + biometric markers |
| **Decision** | Evaluates threat level | Classification + response strategy |
| **Defense** | Executes autonomous action | Allow / Restrict / Deceive |

### 2️ **Three-Tier Classification**

| Classification | Confidence | Threat Level | Action |
|---------------|-----------|--------------|--------|
| **Authentic** | 70-100% |  Low |  Grant IoT access |
| **Suspicious** | 40-69% |  Medium |  Require 2FA verification |
| **Deepfake** | 0-39% |  High |  Activate deception mode |

### 3️ **Deception-Based Defense**

When a deepfake is detected, the system:
1. **Sends fake "success" response** to the attacker
2. **Blocks real IoT device access** (stays secure)
3. **Redirects to honeypot environment** (simulated device)
4. **Logs attack silently** for forensic analysis
5. **Studies attacker behavior** to improve future detection

### 4️ **Real-Time Transparency**

- Live agent logs showing decision-making process
- Confidence score visualization
- Threat level indicators
- Defense action tracking

---

##  How It Works

### Detection Algorithm

```python
# Simplified logic (actual implementation uses ML models)
def detect_deepfake(audio_file):
    # 1. Extract features
    biometric_markers = extract_voice_fingerprint(audio_file)
    spectral_patterns = analyze_frequency_spectrum(audio_file)
    
    # 2. Compare with baseline
    authenticity_score = compare_with_user_profile(biometric_markers)
    
    # 3. Generate confidence
    confidence = calculate_confidence(authenticity_score, spectral_patterns)
    
    return confidence  # 0-100%
```

### Decision Logic

```python
def make_decision(confidence):
    if confidence >= 70:
        return "AUTHENTIC", "allow"
    elif confidence >= 40:
        return "SUSPICIOUS", "restrict"
    else:
        return "FAKE", "deceive"
```

### Defense Actions

| Action | Implementation | User Experience |
|--------|---------------|-----------------|
| **Allow** | Send command to real IoT device | Door unlocks normally |
| **Restrict** | Trigger 2FA authentication | "Please verify identity" prompt |
| **Deceive** | Route to honeypot, log attack | Attacker sees fake "Door unlocked" |

---



##  Technical Details

### Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18.x, Tailwind CSS |
| **Icons** | Lucide React |
| **State Management** | React Hooks (useState) |
| **Animations** | CSS3 Keyframes |
| **File Handling** | Web File API |

### Current Limitations

| Limitation | Status | Future Plan |
|-----------|--------|-------------|
| Detection Model | Simulated scoring | Integrate trained ML model (CNN/RNN) |
| Data Persistence | Browser memory only | Add backend with database |
| Real IoT Integration | Demo simulation | Connect to actual smart home APIs |
| Attack Logging | Console only | Implement SIEM integration |

---

##  Use Cases

### 1. **Smart Home Security**
Protect voice-activated locks, cameras, and thermostats from deepfake impersonation attacks.

### 2. **Enterprise IoT**
Secure industrial IoT devices in manufacturing, healthcare, and logistics environments.

### 3. **Financial Services**
Verify voice authentication for banking transactions and account access.

### 4. **Security Research**
Study attacker behavior patterns in controlled honeypot environment.

---

##  Why This Matters

### Traditional Approach 
```
Attacker → Deepfake Command → System Blocks → Attacker Knows Detection → Evolves Attack
```

### SentinelAI Approach 
```
Attacker → Deepfake Command → System Deceives → Attacker Thinks Success → 
System Learns Attack Pattern → Improves Future Detection
```

### Key Benefits

| Benefit | Impact |
|---------|--------|
| **Autonomous Operation** | No human intervention required |
| **Intelligence Gathering** | Learn from every attack attempt |
| **Attack Deterrence** | Wastes attacker time and resources |
| **Zero Trust Architecture** | Verify every command regardless of source |
| **Regulatory Compliance** | Explainable AI decisions for audit trails |

---

## Future Roadmap

- [ ] Integrate real deepfake detection ML model (WaveLM, Wav2Vec2)
- [ ] Add backend API with PostgreSQL database
- [ ] Implement actual IoT device integration (Home Assistant, SmartThings)
- [ ] Deploy production honeypot environment
- [ ] Add user management and authentication
- [ ] Mobile app for real-time security alerts
- [ ] Multi-language support
- [ ] Cloud deployment (AWS/Azure)

---

##  Contributing

We welcome contributions! This project was built for a hackathon but is designed for real-world deployment.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---



## Team

Built with ❤️ for the [StackOverflowers] 

---

##  Contact


**Demo Video**: [YouTube Link]

**Pitch Deck**: [Slides Link]

---

