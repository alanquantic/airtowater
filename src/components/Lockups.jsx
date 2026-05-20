// Wordmark lockups for airtowater.mx

import React from 'react';

const Wordmark = ({ color = "#1d3a5f", accent = "#b8954a", size = 56, weight = 400, tracking = "0.04em" }) => (
  <div style={{ display: "inline-flex", alignItems: "baseline", gap: "0.04em", fontFamily: "Marcellus, serif", fontWeight: weight, color, fontSize: size, letterSpacing: tracking, lineHeight: 1 }}>
    <span>airtowater</span>
    <span style={{ color: accent, fontSize: size * 0.55, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>.mx</span>
  </div>
);

const HorizontalLockup = ({ Mark, color, accent, water, air, bg = "transparent", textColor }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 28, padding: "8px 0", background: bg }}>
    <Mark size={120} stroke={color} accent={accent} water={water || color} air={air || "#a9c4d4"} mid={water} />
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Wordmark color={textColor || color} accent={accent} size={42} />
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.32em", color: textColor || color, opacity: 0.6, textTransform: "uppercase" }}>
        air · flow · water · transcendence
      </div>
    </div>
  </div>
);

const StackedLockup = ({ Mark, color, accent, water, air, bg, textColor }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: "16px 24px", background: bg || "transparent" }}>
    <Mark size={160} stroke={color} accent={accent} water={water || color} air={air || "#a9c4d4"} mid={water} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <Wordmark color={textColor || color} accent={accent} size={36} />
      <div style={{ display: "flex", gap: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, letterSpacing: "0.3em", color: textColor || color, opacity: 0.55, textTransform: "uppercase", marginTop: 2 }}>
        <span>137</span><span>·</span><span>432</span><span>·</span><span>9</span>
      </div>
    </div>
  </div>
);

export { Wordmark, HorizontalLockup, StackedLockup };
