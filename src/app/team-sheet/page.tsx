export const metadata = { title: "GreenTensor — Team 08 Display Sheet" };

export default function TeamSheetPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { background: #050A0E !important; }
        .sheet {
          width: 210mm; min-height: 297mm;
          background: #050A0E; color: #F8FAFC;
          font-family: 'Inter', sans-serif;
          padding: 12mm 14mm;
          margin: 0 auto;
        }
        .header { display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #1E2D3D; padding-bottom:8mm; margin-bottom:8mm; }
        .logo-mark { display:flex; align-items:center; gap:10px; }
        .logo-box { width:44px; height:44px; background:#0F1923; border:1px solid #1E2D3D; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:800; }
        .logo-g { color:#22C55E; } .logo-t { color:#3B82F6; }
        .brand-name { font-size:22px; font-weight:700; color:#F8FAFC; }
        .team-badge { background:#0F1923; border:1px solid #22C55E; border-radius:8px; padding:6px 16px; font-family:'JetBrains Mono',monospace; font-size:13px; color:#22C55E; font-weight:700; }
        .title-block { text-align:center; margin-bottom:8mm; }
        .section-label { font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:#22C55E; margin-bottom:6px; }
        .project-title { font-size:28px; font-weight:800; line-height:1.15; margin-bottom:6px; }
        .project-title .green { color:#22C55E; } .project-title .blue { color:#3B82F6; }
        .tagline { font-size:13px; color:#94A3B8; max-width:420px; margin:0 auto; line-height:1.5; }
        .info-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:6mm; margin-bottom:8mm; }
        .info-card { background:#0F1923; border:1px solid #1E2D3D; border-radius:12px; padding:5mm 6mm; }
        .info-card .label { font-size:9px; text-transform:uppercase; letter-spacing:0.12em; color:#94A3B8; margin-bottom:4px; font-family:'JetBrains Mono',monospace; }
        .info-card .value { font-size:14px; font-weight:700; color:#F8FAFC; }
        .info-card .value.green { color:#22C55E; } .info-card .value.blue { color:#3B82F6; }
        .pillars-heading { font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#94A3B8; font-family:'JetBrains Mono',monospace; margin-bottom:5mm; text-align:center; }
        .pillars { display:grid; grid-template-columns:repeat(4,1fr); gap:5mm; margin-bottom:8mm; }
        .pillar { background:#0F1923; border-radius:12px; padding:5mm; text-align:center; }
        .pillar.green { border:1px solid rgba(34,197,94,0.35); } .pillar.blue { border:1px solid rgba(59,130,246,0.35); } .pillar.aqua { border:1px solid rgba(147,197,253,0.35); } .pillar.cyan { border:1px solid rgba(6,182,212,0.35); }
        .pillar-icon { font-size:22px; margin-bottom:4px; }
        .pillar-title { font-size:11px; font-weight:700; margin-bottom:3px; }
        .pillar.green .pillar-title { color:#22C55E; } .pillar.blue .pillar-title { color:#3B82F6; } .pillar.aqua .pillar-title { color:#93C5FD; } .pillar.cyan .pillar-title { color:#06B6D4; }
        .pillar-desc { font-size:9px; color:#94A3B8; line-height:1.4; }
        .pillar-metric { font-size:18px; font-weight:800; margin-top:5px; }
        .pillar.green .pillar-metric { color:#22C55E; } .pillar.blue .pillar-metric { color:#3B82F6; } .pillar.aqua .pillar-metric { color:#93C5FD; } .pillar.cyan .pillar-metric { color:#06B6D4; }
        .report-block { background:#0F1923; border:1px solid #1E2D3D; border-radius:12px; padding:5mm 6mm; margin-bottom:8mm; font-family:'JetBrains Mono',monospace; font-size:10px; line-height:1.7; }
        .report-title { color:#22C55E; font-weight:700; font-size:11px; }
        .report-border { color:#1E2D3D; }
        .report-data { color:#F8FAFC; }
        .report-savings { color:#22C55E; font-weight:700; }
        .report-section { color:#94A3B8; }
        .aqua-positive { color:#93C5FD; font-weight:700; }
        .aqua-data { color:#93C5FD; }
        .bottom-row { display:flex; align-items:center; justify-content:space-between; gap:6mm; border-top:1px solid #1E2D3D; padding-top:6mm; }
        .install-cmd { background:#050A0E; border:1px solid rgba(34,197,94,0.3); border-radius:8px; padding:8px 14px; font-family:'JetBrains Mono',monospace; font-size:13px; color:#22C55E; display:inline-block; margin-bottom:6px; }
        .dollar { color:#94A3B8; }
        .install-sub { font-size:10px; color:#94A3B8; font-family:'JetBrains Mono',monospace; }
        .links-block { text-align:right; }
        .link-item { font-size:10px; color:#94A3B8; margin-bottom:4px; font-family:'JetBrains Mono',monospace; }
        .link-item a { color:#22C55E; text-decoration:none; }
        .badge-row { display:flex; gap:6px; justify-content:flex-end; margin-top:6px; }
        .badge { padding:3px 8px; border-radius:5px; font-size:9px; font-family:'JetBrains Mono',monospace; font-weight:700; }
        .badge.green { background:rgba(34,197,94,0.12); border:1px solid rgba(34,197,94,0.3); color:#22C55E; }
        .badge.blue  { background:rgba(59,130,246,0.12); border:1px solid rgba(59,130,246,0.3); color:#3B82F6; }
        .badge.cyan  { background:rgba(6,182,212,0.12);  border:1px solid rgba(6,182,212,0.3);  color:#06B6D4; }
        @media print { .sheet { margin:0; } @page { size:A4; margin:0; } }
      `}</style>

      <div className="sheet">
        <div className="header">
          <div className="logo-mark">
            <div className="logo-box"><span className="logo-g">G</span><span className="logo-t">T</span></div>
            <span className="brand-name">GreenTensor</span>
          </div>
          <div className="team-badge">TEAM 08</div>
        </div>

        <div className="title-block">
          <div className="section-label">{"// PROJECT SHOWCASE"}</div>
          <div className="project-title">
            <span className="green">Green</span><span className="blue">Tensor</span> — Sustainable &amp; Secure AI
          </div>
          <div className="tagline">
            Open-source Python middleware for real-time AI carbon tracking, water intelligence,
            anomaly detection, and automated ESG reporting — with one line of code.
          </div>
        </div>

        <div className="info-row">
          <div className="info-card"><div className="label">Team Number</div><div className="value green">Team 08</div></div>
          <div className="info-card"><div className="label">Team Member</div><div className="value">Dhivya Balakumar</div></div>
          <div className="info-card"><div className="label">Guide</div><div className="value blue">Dr. Santosh Kumar J</div></div>
        </div>

        <div className="pillars-heading">{"// THE FOUR PILLARS"}</div>
        <div className="pillars">
          <div className="pillar green"><div className="pillar-icon">🌿</div><div className="pillar-title">Carbon Tracking</div><div className="pillar-desc">Real-time CO₂ monitoring per model run</div><div className="pillar-metric">29%</div><div className="pillar-desc">energy saved</div></div>
          <div className="pillar aqua"><div className="pillar-icon">💧</div><div className="pillar-title">AquaTensor</div><div className="pillar-desc">Water intelligence via membrane distillation</div><div className="pillar-metric">NET+</div><div className="pillar-desc">water positive</div></div>
          <div className="pillar blue"><div className="pillar-icon">🛡️</div><div className="pillar-title">Anomaly Detection</div><div className="pillar-desc">Carbon-signature threat detection</div><div className="pillar-metric">CLEAN</div><div className="pillar-desc">real-time status</div></div>
          <div className="pillar cyan"><div className="pillar-icon">📊</div><div className="pillar-title">ESG Reporting</div><div className="pillar-desc">GRI, TCFD, CDP auto-generated reports</div><div className="pillar-metric">90%</div><div className="pillar-desc">time saved</div></div>
        </div>

        <div className="report-block">
          <span className="report-border">+======================================+</span><br/>
          <span className="report-title">|   GreenTensor Report  v0.6.0         |</span><br/>
          <span className="report-border">+======================================+</span><br/>
          <span className="report-data">Runtime          : 45.23 s</span><br/>
          <span className="report-data">Energy Used      : 0.000412 kWh</span><br/>
          <span className="report-data">CO2 Emissions    : 0.000096 kg</span><br/>
          <span className="report-savings">Energy Saved     : 29.0% vs baseline</span><br/>
          <span className="report-section">-- AquaTensor Water Intelligence ----</span><br/>
          <span className="aqua-data">Water Consumed   : 0.000202 L  (cooling)</span><br/>
          <span className="aqua-data">Water Produced   : 0.001474 L  (membrane distillation)</span><br/>
          <span className="aqua-positive">Net Water Impact : NET POSITIVE ✓</span><br/>
          <span className="report-section">-- Carbon Anomaly Detection ---------</span><br/>
          <span className="report-savings">Status           : CLEAN ✓</span><br/>
          <span className="report-border">+======================================+</span>
        </div>

        <div className="bottom-row">
          <div>
            <div className="install-cmd"><span className="dollar">$ </span>pip install greentensor</div><br/>
            <div className="install-sub">v0.6.0 · MIT License · Python 3.9+ · Available on PyPI</div>
          </div>
          <div className="links-block">
            <div className="link-item">🌐 <a href="https://green-tensor-launch-d8km-98ccjvkuy-dhivyas-projects-e2b392aa.vercel.app">greentensor.vercel.app</a></div>
            <div className="link-item">📦 <a href="https://pypi.org/project/greentensor/">pypi.org/project/greentensor</a></div>
            <div className="link-item">💼 <a href="https://linkedin.com/in/dhivyabalakumar04">linkedin.com/in/dhivyabalakumar04</a></div>
            <div className="badge-row">
              <span className="badge green">Open Source</span>
              <span className="badge blue">PyPI Live</span>
              <span className="badge cyan">ESG Ready</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
