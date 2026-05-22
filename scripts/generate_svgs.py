import os

out_dir = r"C:\Users\Magicbook\Desktop\monter\public\assets\images\blog"
os.makedirs(out_dir, exist_ok=True)

# SVG 1: Cover
cover_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#F4F4F0"/>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAEAE5" stroke-width="1"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)"/>
  
  <g transform="translate(100, 0)">
      <rect x="200" y="150" width="120" height="480" fill="#1A1A1A"/>
      <rect x="240" y="100" width="40" height="530" fill="#8A9A86"/>
      <rect x="320" y="250" width="40" height="380" fill="#D94F33"/>
      
      <rect x="550" y="350" width="300" height="280" fill="#1A1A1A"/>
      <rect x="500" y="450" width="400" height="180" fill="#8A9A86"/>
      <rect x="750" y="300" width="150" height="330" fill="#D94F33"/>
  </g>
  
  <text x="60" y="100" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="52" font-weight="bold" fill="#1A1A1A" letter-spacing="-1">DUBAI VS MOHALI</text>
  <text x="62" y="140" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="18" font-weight="normal" fill="#1A1A1A" letter-spacing="4">A MARKET ASSESSMENT / 2026</text>
</svg>"""

# SVG 2: Payment Plan
payment_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#F4F4F0"/>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAEAE5" stroke-width="1"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)"/>
  
  <text x="60" y="100" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="52" font-weight="bold" fill="#1A1A1A" letter-spacing="-1">THE 1% ILLUSION</text>
  <text x="62" y="140" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="18" font-weight="normal" fill="#1A1A1A" letter-spacing="4">STRUCTURE / RISK / REALITY</text>
  
  <g transform="translate(600, 115)">
"""
for i in range(10):
    for j in range(10):
        x = j * 40
        y = i * 40
        color = "#D94F33" if (i == 0 and j == 0) else "#8A9A86"
        if i >= 6: color = "#1A1A1A" # Representing locked equity / risk
        payment_svg += f'    <rect x="{x}" y="{y}" width="35" height="35" fill="{color}"/>\n'

payment_svg += """  </g>
  <rect x="60" y="475" width="20" height="20" fill="#D94F33"/>
  <text x="95" y="490" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="14" fill="#1A1A1A">THE 1% MONTHLY PROMISE</text>
  <rect x="60" y="515" width="20" height="20" fill="#8A9A86"/>
  <text x="95" y="530" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="14" fill="#1A1A1A">ACCUMULATED EQUITY</text>
  <rect x="60" y="555" width="20" height="20" fill="#1A1A1A"/>
  <text x="95" y="570" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="14" fill="#1A1A1A">LOCKED MINIMUM RESALE THRESHOLD / FORFEITURE RISK</text>
</svg>"""

# SVG 3: FEMA
fema_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#F4F4F0"/>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAEAE5" stroke-width="1"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)"/>
  
  <text x="60" y="100" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="52" font-weight="bold" fill="#1A1A1A" letter-spacing="-1">CAPITAL BORDERS</text>
  <text x="62" y="140" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="18" font-weight="normal" fill="#1A1A1A" letter-spacing="4">FEMA / REPATRIATION / TAX RESIDENCY</text>
  
  <g transform="translate(150, 315)">
      <line x1="-150" y1="0" x2="1050" y2="0" stroke="#1A1A1A" stroke-width="4" stroke-dasharray="20 10"/>
      <path d="M 0 0 Q 150 -300 300 0 T 600 0 T 900 0" fill="none" stroke="#D94F33" stroke-width="8"/>
      <path d="M 0 0 Q 150 200 300 0 T 600 0 T 900 0" fill="none" stroke="#8A9A86" stroke-width="8"/>
      
      <!-- Nodes -->
      <circle cx="0" cy="0" r="15" fill="#1A1A1A"/>
      <circle cx="300" cy="0" r="15" fill="#1A1A1A"/>
      <circle cx="600" cy="0" r="15" fill="#1A1A1A"/>
      <circle cx="900" cy="0" r="15" fill="#1A1A1A"/>
  </g>
</svg>"""

# SVG 4: Due Diligence
due_diligence_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#F4F4F0"/>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAEAE5" stroke-width="1"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)"/>
  
  <text x="60" y="100" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="52" font-weight="bold" fill="#1A1A1A" letter-spacing="-1">THE INVESTOR SPLIT</text>
  <text x="62" y="140" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="18" font-weight="normal" fill="#1A1A1A" letter-spacing="4">WHO SHOULD INVEST WHERE / 2026</text>
  
  <g transform="translate(600, 315)">
"""
for i in range(10, 0, -1):
    r = i * 25
    color = "#1A1A1A" if i % 2 == 0 else "#F4F4F0"
    if i == 2: color = "#8A9A86"
    if i == 1: color = "#D94F33"
    due_diligence_svg += f'    <circle cx="0" cy="0" r="{r}" fill="{color}"/>\n'

due_diligence_svg += """  </g>
</svg>"""

with open(os.path.join(out_dir, "dubai-mohali-cover.svg"), "w") as f: f.write(cover_svg)
with open(os.path.join(out_dir, "payment-plan-analysis.svg"), "w") as f: f.write(payment_svg)
with open(os.path.join(out_dir, "fema-repatriation.svg"), "w") as f: f.write(fema_svg)
with open(os.path.join(out_dir, "nri-due-diligence.svg"), "w") as f: f.write(due_diligence_svg)

print("Generated all SVGs successfully.")
