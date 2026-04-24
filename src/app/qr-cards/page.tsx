const BASE = "https://green-tensor-launch-d8km-98ccjvkuy-dhivyas-projects-e2b392aa.vercel.app";

export const metadata = { title: "GreenTensor — QR Cards" };

export default function QRCardsPage() {
  const cards = [
    {
      title: "Live Website",
      sub: "Interactive demo & carbon calculator",
      url: BASE,
      qrColor: "22C55E",
      badges: [{ label: "Live Site", cls: "g" }, { label: "Interactive Demo", cls: "b" }],
    },
    {
      title: "PyPI Package",
      sub: "pip install greentensor",
      url: "https://pypi.org/project/greentensor/",
      qrColor: "3B82F6",
      badges: [{ label: "PyPI Live", cls: "b" }, { label: "MIT License", cls: "g" }],
    },
    {
      title: "GitHub Repo",
      sub: "Full open-source code",
      url: "https://github.com/DhivyaBalakumar/GreenTensor-Carbon-Aware-MLOps",
      qrColor: "22C55E",
      badges: [{ label: "Open Source", cls: "g" }, { label: "Carbon-Aware MLOps", cls: "c" }],
    },
    {
      title: "LinkedIn",
      sub: "Dhivya Balakumar · Team 08",
      url: "https://www.linkedin.com/in/dhivyabalakumar04",
      qrColor: "06B6D4",
      badges: [{ label: "Dhivya Balakumar", cls: "c" }, { label: "Team 08", cls: "b" }],
    },
    {
      title: "Team Sheet",
      sub: "A4 display sheet — print ready",
      url: `${BASE}/team-sheet`,
      qrColor: "22C55E",
      badges: [{ label: "Team 08", cls: "g" }, { label: "Print Ready", cls: "b" }],
    },
    {
      title: "Pitch Poster",
      sub: "Full pitch — problem, solution, stats",
      url: `${BASE}/pitch-poster`,
      qrColor: "3B82F6",
      badges: [{ label: "Pitch Ready", cls: "b" }, { label: "Investor Grade", cls: "c" }],
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html, body { background:#fff !important; }
        .sheet { width:210mm; min-height:297mm; background:#fff; font-family:'Inter',sans-serif; padding:8mm; margin:0 auto; }
        .grid { display:grid; grid-template-columns:1fr 1fr; gap:6mm; }
        .card { background:#050A0E; border:1px solid #1E2D3D; border-radius:14px; padding:6mm; display:flex; flex-direction:column; align-items:center; gap:4mm; min-height:85mm; }
        .card-top { display:flex; align-items:center; gap:8px; width:100%; }
        .logo-box { width:32px; height:32px; background:#0F1923; border:1px solid #1E2D3D; border-radius:7px; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:800; flex-shrink:0; }
        .logo-g { color:#22C55E; } .logo-t { color:#3B82F6; }
        .card-brand { font-size:15px; font-weight:700; color:#F8FAFC; }
        .card-version { margin-left:auto; font-family:'JetBrains Mono',monospace; font-size:9px; color:#22C55E; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); border-radius:4px; padding:2px 6px; }
        .qr-img { width:90px; height:90px; border-radius:8px; border:2px solid rgba(34,197,94,0.3); }
        .card-url { font-family:'JetBrains Mono',monospace; font-size:8px; color:#22C55E; text-align:center; word-break:break-all; }
        .card-desc { font-size:10px; color:#94A3B8; text-align:center; line-height:1.4; }
        .badges { display:flex; gap:4px; flex-wrap:wrap; justify-content:center; }
        .badge { font-family:'JetBrains Mono',monospace; font-size:8px; padding:2px 6px; border-radius:4px; font-weight:600; }
        .badge.g { background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); color:#22C55E; }
        .badge.b { background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.3); color:#3B82F6; }
        .badge.c { background:rgba(6,182,212,0.1);  border:1px solid rgba(6,182,212,0.3);  color:#06B6D4; }
        .cut-line { text-align:center; font-size:9px; color:#ccc; margin:4mm 0; letter-spacing:0.1em; border-top:1px dashed #ddd; padding-top:3mm; }
        @media print { .sheet { margin:0; } @page { size:A4; margin:0; } }
      `}</style>

      <div className="sheet">
        <div className="grid">
          {cards.map((card) => (
            <div className="card" key={card.title}>
              <div className="card-top">
                <div className="logo-box"><span className="logo-g">G</span><span className="logo-t">T</span></div>
                <span className="card-brand">{card.title}</span>
                <span className="card-version">v0.6.0</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="qr-img"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(card.url)}&bgcolor=050A0E&color=${card.qrColor}&qzone=1`}
                alt={`QR code for ${card.title}`}
                width={90}
                height={90}
              />
              <div className="card-url">{card.url.replace("https://", "")}</div>
              <div className="card-desc">{card.sub}</div>
              <div className="badges">
                {card.badges.map((b) => (
                  <span key={b.label} className={`badge ${b.cls}`}>{b.label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="cut-line">✂ — cut along dotted lines — ✂</div>
      </div>
    </>
  );
}
