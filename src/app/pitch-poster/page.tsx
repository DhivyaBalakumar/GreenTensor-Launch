export const metadata = { title: "GreenTensor — Pitch Poster" };

export default function PitchPosterPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html, body { background:#050A0E !important; }
        .sheet { width:210mm; min-height:297mm; background:#050A0E; color:#F8FAFC; font-family:'Inter',sans-serif; padding:10mm 12mm; margin:0 auto; }
        .topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:7mm; }
        .logo { display:flex; align-items:center; gap:8px; }
        .logo-box { width:40px; height:40px; background:#0F1923; border:1px solid #1E2D3D; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; }
        .logo-g { color:#22C55E; } .logo-t { color:#3B82F6; }
        .brand { font-size:20px; font-weight:700; }
        .version { font-family:'JetBrains Mono',monospace; font-size:10px; color:#22C55E; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); border-radius:6px; padding:3px 8px; }
        .hero { text-align:center; margin-bottom:7mm; padding:7mm; background:#0F1923; border:1px solid #1E2D3D; border-radius:14px; }
        .hero-label { font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:0.15em; text-transform:uppercase; color:#22C55E; margin-bottom:5px; }
        .hero-h1 { font-size:24px; font-weight:900; line-height:1.15; margin-bottom:5px; }
        .hero-h1 .g { color:#22C55E; } .hero-h1 .b { color:#3B82F6; }
        .hero-sub { font-size:11px; color:#94A3B8; max-width:380px; margin:0 auto; line-height:1.5; }
        .ps-row { display:grid; grid-template-columns:1fr 1fr; gap:5mm; margin-bottom:6mm; }
        .ps-card { background:#0F1923; border-radius:12px; padding:5mm; }
        .ps-card.problem { border:1px solid rgba(239,68,68,0.25); }
        .ps-card.solution { border:1px solid rgba(34,197,94,0.35); }
        .ps-label { font-size:9px; text-transform:uppercase; letter-spacing:0.12em; font-family:'JetBrains Mono',monospace; margin-bottom:5px; }
        .ps-card.problem .ps-label { color:#EF4444; } .ps-card.solution .ps-label { color:#22C55E; }
        .ps-item { display:flex; align-items:flex-start; gap:6px; font-size:10px; color:#94A3B8; margin-bottom:4px; line-height:1.4; }
        .dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; margin-top:4px; }
        .ps-card.problem .dot { background:#EF4444; } .ps-card.solution .dot { background:#22C55E; }
        .stats { display:grid; grid-template-columns:repeat(4,1fr); gap:4mm; margin-bottom:6mm; }
        .stat { background:#0F1923; border:1px solid #1E2D3D; border-radius:10px; padding:4mm; text-align:center; }
        .stat-num { font-size:22px; font-weight:800; font-family:'JetBrains Mono',monospace; }
        .stat-num.g { color:#22C55E; } .stat-num.b { color:#3B82F6; } .stat-num.a { color:#93C5FD; } .stat-num.c { color:#06B6D4; }
        .stat-label { font-size:9px; color:#94A3B8; margin-top:2px; line-height:1.3; }
        .hiw-label { font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:0.12em; text-transform:uppercase; color:#94A3B8; text-align:center; margin-bottom:4mm; }
        .steps { display:grid; grid-template-columns:repeat(4,1fr); gap:4mm; margin-bottom:6mm; }
        .step { background:#0F1923; border:1px solid #1E2D3D; border-radius:10px; padding:4mm; text-align:center; }
        .step-num { font-size:20px; font-weight:900; color:rgba(34,197,94,0.15); font-family:'JetBrains Mono',monospace; }
        .step-title { font-size:11px; font-weight:700; color:#F8FAFC; margin:3px 0; }
        .step-code { font-family:'JetBrains Mono',monospace; font-size:8px; color:#22C55E; background:#050A0E; border:1px solid #1E2D3D; border-radius:5px; padding:3px 5px; margin-top:3px; word-break:break-all; }
        .tech-row { display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-bottom:6mm; }
        .tech-badge { font-family:'JetBrains Mono',monospace; font-size:9px; padding:3px 8px; border-radius:5px; font-weight:600; }
        .tech-badge.g { background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); color:#22C55E; }
        .tech-badge.b { background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.3); color:#3B82F6; }
        .tech-badge.c { background:rgba(6,182,212,0.1);  border:1px solid rgba(6,182,212,0.3);  color:#06B6D4; }
        .tech-badge.a { background:rgba(147,197,253,0.1); border:1px solid rgba(147,197,253,0.3); color:#93C5FD; }
        .footer { border-top:1px solid #1E2D3D; padding-top:5mm; display:flex; align-items:center; justify-content:space-between; }
        .footer-left { font-size:10px; color:#94A3B8; line-height:1.6; }
        .footer-left strong { color:#F8FAFC; }
        .install-cmd { font-family:'JetBrains Mono',monospace; font-size:12px; color:#22C55E; background:#050A0E; border:1px solid rgba(34,197,94,0.3); border-radius:7px; padding:6px 12px; display:inline-block; margin-bottom:4px; }
        .dollar { color:#94A3B8; }
        .footer-links { font-size:9px; color:#94A3B8; font-family:'JetBrains Mono',monospace; }
        .footer-links a { color:#22C55E; text-decoration:none; }
        @media print { .sheet { margin:0; } @page { size:A4; margin:0; } }
      `}</style>

      <div className="sheet">
        <div className="topbar">
          <div className="logo">
            <div className="logo-box"><span className="logo-g">G</span><span className="logo-t">T</span></div>
            <span className="brand">GreenTensor</span>
          </div>
          <span className="version">v0.6.0 · Team 08 · Dhivya Balakumar · Guide: Dr. Santosh Kumar J</span>
        </div>

        <div className="hero">
          <div className="hero-label">// AI SUSTAINABILITY · WATER INTELLIGENCE · SECURITY · ESG</div>
          <div className="hero-h1">Make AI <span className="g">Sustainable</span>, <span className="b">Secure</span> &amp; Water-Positive</div>
          <div className="hero-sub">One Python SDK that tracks carbon, produces net-positive water output via AquaTensor, detects compute-anomaly threats, and automates ESG reporting — with one line of code.</div>
        </div>

        <div className="ps-row">
          <div className="ps-card problem">
            <div className="ps-label">❌ The Problem</div>
            <div className="ps-item"><span className="dot"></span>AI training emits as much CO₂ as 5 cars per run</div>
            <div className="ps-item"><span className="dot"></span>Data centres consume billions of litres of water for cooling</div>
            <div className="ps-item"><span className="dot"></span>73% of AI infrastructure attacks go undetected for 24h+</div>
            <div className="ps-item"><span className="dot"></span>ESG reports take 6 weeks to produce manually</div>
            <div className="ps-item"><span className="dot"></span>No standard tooling exists for ML teams</div>
          </div>
          <div className="ps-card solution">
            <div className="ps-label">✅ GreenTensor Solves It</div>
            <div className="ps-item"><span className="dot"></span>Real-time carbon tracking per model run — 29% energy savings</div>
            <div className="ps-item"><span className="dot"></span>AquaTensor: net-positive water output via membrane distillation</div>
            <div className="ps-item"><span className="dot"></span>Carbon-signature anomaly detection — CLEAN status in real time</div>
            <div className="ps-item"><span className="dot"></span>Auto-generates GRI, TCFD, CDP reports — 90% time saved</div>
            <div className="ps-item"><span className="dot"></span>Zero config — wraps existing PyTorch code in 1 line</div>
          </div>
        </div>

        <div className="stats">
          <div className="stat"><div className="stat-num g">29%</div><div className="stat-label">Energy Reduction vs Baseline</div></div>
          <div className="stat"><div className="stat-num a">NET+</div><div className="stat-label">Water Positive (AquaTensor)</div></div>
          <div className="stat"><div className="stat-num b">CLEAN</div><div className="stat-label">Carbon Anomaly Status</div></div>
          <div className="stat"><div className="stat-num c">90%</div><div className="stat-label">ESG Reporting Time Saved</div></div>
        </div>

        <div className="hiw-label">// HOW IT WORKS — 4 STEPS</div>
        <div className="steps">
          <div className="step"><div className="step-num">01</div><div className="step-title">Install</div><div className="step-code">pip install greentensor</div></div>
          <div className="step"><div className="step-num">02</div><div className="step-title">Wrap</div><div className="step-code">with GreenTensor() as gt:</div></div>
          <div className="step"><div className="step-num">03</div><div className="step-title">Train</div><div className="step-code">train() # unchanged</div></div>
          <div className="step"><div className="step-num">04</div><div className="step-title">Report</div><div className="step-code">CO₂: 0.000096 kg ✓</div></div>
        </div>

        <div className="tech-row">
          <span className="tech-badge g">Python 3.9+</span>
          <span className="tech-badge g">PyTorch</span>
          <span className="tech-badge g">CodeCarbon</span>
          <span className="tech-badge b">Mixed Precision</span>
          <span className="tech-badge b">cuDNN Benchmark</span>
          <span className="tech-badge a">AquaTensor</span>
          <span className="tech-badge a">Membrane Distillation</span>
          <span className="tech-badge c">GRI · TCFD · CDP</span>
          <span className="tech-badge c">ESG Reporting</span>
          <span className="tech-badge g">MIT License</span>
          <span className="tech-badge b">Open Source</span>
          <span className="tech-badge g">PyPI Published</span>
        </div>

        <div className="footer">
          <div className="footer-left">
            <strong>Team 08</strong> · Dhivya Balakumar<br/>
            Guide: <strong>Dr. Santosh Kumar J</strong><br/>
            Project: GreenTensor — Sustainable &amp; Secure AI by Default
          </div>
          <div style={{textAlign:"right"}}>
            <div className="install-cmd"><span className="dollar">$ </span>pip install greentensor</div><br/>
            <div className="footer-links">
              🌐 <a href="https://green-tensor-launch-d8km-98ccjvkuy-dhivyas-projects-e2b392aa.vercel.app">greentensor.vercel.app</a>
              &nbsp;·&nbsp;
              📦 <a href="https://pypi.org/project/greentensor/">pypi.org/project/greentensor</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
