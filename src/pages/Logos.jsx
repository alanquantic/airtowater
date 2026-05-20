import React from 'react';
import { DesignCanvas, DCSection, DCArtboard } from '../components/DesignCanvas.jsx';
import {
  UnityGlyph,
  SpiralMark,
  IcosahedronMark,
  HexapentakisMark,
  FlowDropMark,
  MonolineMark,
} from '../components/Marks.jsx';
import { Wordmark, HorizontalLockup, StackedLockup } from '../components/Lockups.jsx';
import '../styles/logos.css';

const PAPER = '#f5f1e8';
const PAPER_COOL = '#eef2f5';
const DEEP = '#0e2238';
const OCEAN = '#1d3a5f';
const MIST = '#a9c4d4';
const WATER = '#3a6a8a';
const MINT = '#4a8c7a';
const GOLD = '#b8954a';
const SILVER = '#c9cdd2';

const Meta = ({ children }) => <div className="label-meta">{children}</div>;

const CardBg = ({ bg, children, accent }) => (
  <div className="card" style={{ background: bg, position: 'relative' }}>
    {children}
    {accent && <Meta>{accent}</Meta>}
  </div>
);

function Logos() {
  return (
    <div className="page-logos">
      <DesignCanvas
        title="airtowater.mx — logo exploration"
        subtitle="9 marks across sacred-geometry concepts, lockups, and color treatments"
      >
        {/* ---------- INTRO / SYSTEM ---------- */}
        <DCSection id="system" title="System">
          <DCArtboard id="intro" label="Design rationale" width={560} height={420}>
            <div className="legend-block">
              <h3>airtowater.mx</h3>
              <p>
                A sacred-geometry mark tracing the journey of <em>air → water</em>. Light, airy lines descend into
                flowing curves through a phi spiral, anchored by a circle/square/triangle unity at the center.
              </p>
              <p style={{ marginTop: 14 }}>
                <strong style={{ fontWeight: 500 }}>Geometry rules</strong>
              </p>
              <div>· phi spiral, <span className="mono-num">1.37</span> turns</div>
              <div>· <span className="mono-num">9</span>-fold radial symmetry</div>
              <div>· golden angle <span className="mono-num">137.5°</span> between spokes</div>
              <div>· proportional ratios echo <span className="mono-num">432</span></div>
              <div>· icosahedron (water) + pentakis (flow) as alt marks</div>
            </div>
          </DCArtboard>

          <DCArtboard id="palette" label="Palette" width={560} height={420}>
            <div className="legend-block">
              <h3>Palette</h3>
              <p style={{ fontSize: 10, opacity: 0.6 }}>
                blues + greens + whites for air/water; gold &amp; silver for transcendence.
              </p>
              <div className="row"><div className="swatch" style={{ background: DEEP }} /><span>#0e2238 — deep ocean</span></div>
              <div className="row"><div className="swatch" style={{ background: OCEAN }} /><span>#1d3a5f — ocean</span></div>
              <div className="row"><div className="swatch" style={{ background: WATER }} /><span>#3a6a8a — water</span></div>
              <div className="row"><div className="swatch" style={{ background: MIST }} /><span>#a9c4d4 — mist / air</span></div>
              <div className="row"><div className="swatch" style={{ background: MINT }} /><span>#4a8c7a — mint flow</span></div>
              <div className="row"><div className="swatch" style={{ background: GOLD }} /><span>#b8954a — gold (transcendence)</span></div>
              <div className="row"><div className="swatch" style={{ background: SILVER }} /><span>#c9cdd2 — silver (transcendence)</span></div>
              <div className="row"><div className="swatch" style={{ background: PAPER, border: '1px solid #ddd' }} /><span>#f5f1e8 — paper warm</span></div>
            </div>
          </DCArtboard>
        </DCSection>

        {/* ---------- PRIMARY MARKS ---------- */}
        <DCSection id="marks" title="Primary marks">
          <DCArtboard id="spiral-light" label="01 — Spiral genesis (light)" width={360} height={360}>
            <CardBg bg={PAPER} accent="phi · 9 · 137.5°">
              <SpiralMark size={260} air={MIST} water={OCEAN} accent={GOLD} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="spiral-dark" label="02 — Spiral genesis (deep)" width={360} height={360}>
            <CardBg bg={DEEP} accent="gold accent · deep">
              <SpiralMark size={260} air={MIST} water={PAPER} accent={GOLD} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="icosahedron" label="03 — Icosahedron (water)" width={360} height={360}>
            <CardBg bg={PAPER_COOL} accent="20 faces · platonic water">
              <IcosahedronMark size={260} stroke={OCEAN} inner={WATER} accent={GOLD} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="hexapentakis" label="04 — Hexapentakis mandala" width={360} height={360}>
            <CardBg bg={PAPER} accent="60-fold harmonic flow">
              <HexapentakisMark size={260} stroke={OCEAN} mid={MINT} accent={GOLD} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="flowdrop" label="05 — Flow drop" width={360} height={360}>
            <CardBg bg={PAPER_COOL} accent="drop · spiral · unity">
              <FlowDropMark size={260} stroke={OCEAN} water={WATER} accent={GOLD} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="monoline" label="06 — Monoline minimal" width={360} height={360}>
            <CardBg bg={PAPER} accent="single weight · favicon-safe">
              <MonolineMark size={260} stroke={OCEAN} accent={GOLD} />
            </CardBg>
          </DCArtboard>
        </DCSection>

        {/* ---------- LOCKUPS ---------- */}
        <DCSection id="lockups" title="Wordmark lockups">
          <DCArtboard id="lockup-horiz-light" label="Horizontal · light" width={640} height={220}>
            <CardBg bg={PAPER}>
              <HorizontalLockup Mark={SpiralMark} color={OCEAN} accent={GOLD} water={OCEAN} air={MIST} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="lockup-horiz-dark" label="Horizontal · deep" width={640} height={220}>
            <CardBg bg={DEEP}>
              <HorizontalLockup Mark={SpiralMark} color={PAPER} accent={GOLD} water={MIST} air={WATER} textColor={PAPER} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="lockup-stacked" label="Stacked · numerology rail" width={420} height={340}>
            <CardBg bg={PAPER}>
              <StackedLockup Mark={SpiralMark} color={OCEAN} accent={GOLD} water={OCEAN} air={MIST} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="lockup-stacked-ico" label="Stacked · icosahedron" width={420} height={340}>
            <CardBg bg={PAPER_COOL}>
              <StackedLockup Mark={IcosahedronMark} color={OCEAN} accent={GOLD} water={WATER} air={MIST} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="lockup-stacked-hex" label="Stacked · hexapentakis" width={420} height={340}>
            <CardBg bg={PAPER}>
              <StackedLockup Mark={HexapentakisMark} color={OCEAN} accent={GOLD} water={MINT} air={MIST} />
            </CardBg>
          </DCArtboard>
        </DCSection>

        {/* ---------- COLOR TREATMENTS ---------- */}
        <DCSection id="treatments" title="Color treatments">
          <DCArtboard id="treat-gold-deep" label="Gold on deep ocean" width={360} height={360}>
            <CardBg bg={DEEP} accent="transcendence">
              <SpiralMark size={260} air="rgba(184,149,74,0.35)" water={GOLD} accent={PAPER} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="treat-silver-deep" label="Silver on deep ocean" width={360} height={360}>
            <CardBg bg={DEEP} accent="transcendence">
              <SpiralMark size={260} air="rgba(201,205,210,0.4)" water={SILVER} accent={GOLD} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="treat-mint" label="Mint flow · paper" width={360} height={360}>
            <CardBg bg={PAPER} accent="green / harmony">
              <SpiralMark size={260} air={MIST} water={MINT} accent={GOLD} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="treat-mono-blue" label="Mono ocean" width={360} height={360}>
            <CardBg bg={PAPER_COOL} accent="single-color print">
              <MonolineMark size={260} stroke={OCEAN} accent={OCEAN} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="treat-mono-deep" label="Reverse · paper on deep" width={360} height={360}>
            <CardBg bg={DEEP} accent="reverse mono">
              <MonolineMark size={260} stroke={PAPER} accent={GOLD} />
            </CardBg>
          </DCArtboard>

          <DCArtboard id="treat-unity" label="Unity glyph · favicon" width={360} height={360}>
            <CardBg bg={PAPER} accent="micro mark · 16–32px">
              <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
                <UnityGlyph size={48} stroke={OCEAN} sw={1.2} />
                <UnityGlyph size={96} stroke={OCEAN} sw={1} />
                <UnityGlyph size={160} stroke={OCEAN} sw={0.8} />
              </div>
            </CardBg>
          </DCArtboard>
        </DCSection>

        {/* ---------- APPLICATIONS ---------- */}
        <DCSection id="applications" title="In use">
          <DCArtboard id="business-card" label="Business card · 3.5×2 in" width={560} height={320}>
            <div
              style={{
                width: '100%',
                height: '100%',
                background: PAPER,
                position: 'relative',
                padding: 36,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <SpiralMark size={120} air={MIST} water={OCEAN} accent={GOLD} />
              <div>
                <Wordmark color={OCEAN} accent={GOLD} size={28} />
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    letterSpacing: '0.22em',
                    color: OCEAN,
                    opacity: 0.55,
                    marginTop: 10,
                    textTransform: 'uppercase',
                  }}
                >
                  agua del aire · sacred geometry · méxico
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 36,
                  right: 36,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  color: GOLD,
                  textAlign: 'right',
                  lineHeight: 1.8,
                }}
              >
                137<br />432<br />9
              </div>
            </div>
          </DCArtboard>

          <DCArtboard id="bottle-label" label="Bottle label" width={300} height={460}>
            <div
              style={{
                width: '100%',
                height: '100%',
                background: DEEP,
                position: 'relative',
                padding: 28,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 8.5,
                  letterSpacing: '0.4em',
                  color: GOLD,
                  textTransform: 'uppercase',
                }}
              >
                agua del aire
              </div>
              <SpiralMark size={200} air="rgba(184,149,74,0.3)" water={GOLD} accent={PAPER} />
              <div style={{ textAlign: 'center' }}>
                <Wordmark color={PAPER} accent={GOLD} size={22} />
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 8,
                    letterSpacing: '0.3em',
                    color: PAPER,
                    opacity: 0.55,
                    marginTop: 8,
                    textTransform: 'uppercase',
                  }}
                >
                  500 ml · ph 7.4
                </div>
              </div>
            </div>
          </DCArtboard>

          <DCArtboard id="favicon-set" label="Favicon set" width={560} height={200}>
            <div
              style={{
                display: 'flex',
                gap: 24,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                background: PAPER,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: DEEP,
                  borderRadius: 3,
                }}
              >
                <UnityGlyph size={11} stroke={GOLD} sw={1.5} />
              </div>
              <div
                style={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: DEEP,
                  borderRadius: 5,
                }}
              >
                <UnityGlyph size={22} stroke={GOLD} sw={1.2} />
              </div>
              <div
                style={{
                  width: 64,
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: DEEP,
                  borderRadius: 10,
                }}
              >
                <UnityGlyph size={44} stroke={GOLD} sw={1} />
              </div>
              <div
                style={{
                  width: 128,
                  height: 128,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: DEEP,
                  borderRadius: 20,
                }}
              >
                <SpiralMark size={108} air="rgba(184,149,74,0.3)" water={GOLD} accent={PAPER} />
              </div>
            </div>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>
    </div>
  );
}

export default Logos;
