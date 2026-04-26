// Web Audio API synthesized sci-fi sounds for preloader — LOUDER + BEATS
let audioCtx = null;

function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

// Deep cinematic drone with layered harmonics
export function playDrone() {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime;

    // Layer 1: deep sub bass
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(45, t);
    sub.frequency.exponentialRampToValueAtTime(90, t + 3);
    subGain.gain.setValueAtTime(0, t);
    subGain.gain.linearRampToValueAtTime(0.35, t + 0.8);
    subGain.gain.linearRampToValueAtTime(0.4, t + 2.5);
    subGain.gain.linearRampToValueAtTime(0, t + 3.5);
    sub.connect(subGain).connect(ctx.destination);
    sub.start(); sub.stop(t + 3.5);

    // Layer 2: mid harmonic
    const mid = ctx.createOscillator();
    const midGain = ctx.createGain();
    mid.type = 'triangle';
    mid.frequency.setValueAtTime(90, t);
    mid.frequency.exponentialRampToValueAtTime(180, t + 3);
    midGain.gain.setValueAtTime(0, t);
    midGain.gain.linearRampToValueAtTime(0.15, t + 1);
    midGain.gain.linearRampToValueAtTime(0.2, t + 2.5);
    midGain.gain.linearRampToValueAtTime(0, t + 3.5);
    mid.connect(midGain).connect(ctx.destination);
    mid.start(); mid.stop(t + 3.5);

    // Layer 3: high shimmer
    const hi = ctx.createOscillator();
    const hiGain = ctx.createGain();
    hi.type = 'sine';
    hi.frequency.setValueAtTime(440, t);
    hi.frequency.exponentialRampToValueAtTime(880, t + 3);
    hiGain.gain.setValueAtTime(0, t);
    hiGain.gain.linearRampToValueAtTime(0.06, t + 1.5);
    hiGain.gain.linearRampToValueAtTime(0, t + 3.5);
    hi.connect(hiGain).connect(ctx.destination);
    hi.start(); hi.stop(t + 3.5);

    // Rhythmic pulse beats during drone
    for (let i = 0; i < 7; i++) {
      const beat = ctx.createOscillator();
      const beatGain = ctx.createGain();
      beat.type = 'sine';
      beat.frequency.setValueAtTime(55 + i * 8, t + i * 0.45);
      beatGain.gain.setValueAtTime(0.3, t + i * 0.45);
      beatGain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.45 + 0.15);
      beat.connect(beatGain).connect(ctx.destination);
      beat.start(t + i * 0.45);
      beat.stop(t + i * 0.45 + 0.2);
    }
  } catch(e) {}
}

// Pulsing beat pattern during orbit phase
export function playOrbitPulse() {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime;

    // 4 rhythmic kicks
    for (let i = 0; i < 4; i++) {
      const kick = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kick.type = 'sine';
      kick.frequency.setValueAtTime(120, t + i * 0.35);
      kick.frequency.exponentialRampToValueAtTime(40, t + i * 0.35 + 0.12);
      kickGain.gain.setValueAtTime(0.4, t + i * 0.35);
      kickGain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.35 + 0.15);
      kick.connect(kickGain).connect(ctx.destination);
      kick.start(t + i * 0.35);
      kick.stop(t + i * 0.35 + 0.2);

      // Hi-hat noise between kicks
      if (i < 3) {
        const bufSize = ctx.sampleRate * 0.05;
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let j = 0; j < bufSize; j++) d[j] = (Math.random() * 2 - 1) * Math.exp(-j / (ctx.sampleRate * 0.01));
        const hat = ctx.createBufferSource();
        hat.buffer = buf;
        const hatGain = ctx.createGain();
        const hatFilter = ctx.createBiquadFilter();
        hatFilter.type = 'highpass';
        hatFilter.frequency.setValueAtTime(8000, t);
        hatGain.gain.setValueAtTime(0.12, t + i * 0.35 + 0.18);
        hatGain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.35 + 0.25);
        hat.connect(hatFilter).connect(hatGain).connect(ctx.destination);
        hat.start(t + i * 0.35 + 0.18);
      }
    }

    // Rising tone
    const rise = ctx.createOscillator();
    const riseGain = ctx.createGain();
    rise.type = 'sawtooth';
    rise.frequency.setValueAtTime(200, t);
    rise.frequency.exponentialRampToValueAtTime(600, t + 1.4);
    riseGain.gain.setValueAtTime(0.05, t);
    riseGain.gain.linearRampToValueAtTime(0.15, t + 1.2);
    riseGain.gain.linearRampToValueAtTime(0, t + 1.5);
    const riseFilter = ctx.createBiquadFilter();
    riseFilter.type = 'lowpass';
    riseFilter.frequency.setValueAtTime(400, t);
    riseFilter.frequency.exponentialRampToValueAtTime(2000, t + 1.4);
    rise.connect(riseFilter).connect(riseGain).connect(ctx.destination);
    rise.start(); rise.stop(t + 1.5);
  } catch(e) {}
}

// Dramatic suction implosion
export function playImplosion() {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.5);
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.5);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, t);
    filter.frequency.exponentialRampToValueAtTime(80, t + 0.5);
    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(); osc.stop(t + 0.6);

    // Reverse cymbal sweep
    const bufSize = ctx.sampleRate * 0.5;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * (i / bufSize) * 0.5;
    const rev = ctx.createBufferSource();
    rev.buffer = buf;
    const revGain = ctx.createGain();
    revGain.gain.setValueAtTime(0.25, t);
    revGain.gain.linearRampToValueAtTime(0, t + 0.4);
    rev.connect(revGain).connect(ctx.destination);
    rev.start();
  } catch(e) {}
}

// Massive explosion with layered impact
export function playExplosion() {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime;

    // Layer 1: White noise burst
    const bufferSize = ctx.sampleRate * 1.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.25));
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(4000, t);
    noiseFilter.frequency.exponentialRampToValueAtTime(60, t + 1.2);
    noiseGain.gain.setValueAtTime(0.45, t);
    noiseGain.gain.linearRampToValueAtTime(0, t + 1.2);
    noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
    noise.start();

    // Layer 2: Massive sub boom
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(80, t);
    sub.frequency.exponentialRampToValueAtTime(15, t + 1);
    subGain.gain.setValueAtTime(0.6, t);
    subGain.gain.linearRampToValueAtTime(0, t + 1);
    sub.connect(subGain).connect(ctx.destination);
    sub.start(); sub.stop(t + 1);

    // Layer 3: Mid-range impact
    const mid = ctx.createOscillator();
    const midGain = ctx.createGain();
    mid.type = 'square';
    mid.frequency.setValueAtTime(200, t);
    mid.frequency.exponentialRampToValueAtTime(50, t + 0.3);
    midGain.gain.setValueAtTime(0.2, t);
    midGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    const midFilter = ctx.createBiquadFilter();
    midFilter.type = 'lowpass';
    midFilter.frequency.setValueAtTime(800, t);
    mid.connect(midFilter).connect(midGain).connect(ctx.destination);
    mid.start(); mid.stop(t + 0.4);

    // Layer 4: Cinematic tail reverb shimmer
    const tail = ctx.createOscillator();
    const tailGain = ctx.createGain();
    tail.type = 'sine';
    tail.frequency.setValueAtTime(300, t + 0.1);
    tail.frequency.exponentialRampToValueAtTime(150, t + 2);
    tailGain.gain.setValueAtTime(0, t);
    tailGain.gain.linearRampToValueAtTime(0.08, t + 0.2);
    tailGain.gain.linearRampToValueAtTime(0, t + 2);
    tail.connect(tailGain).connect(ctx.destination);
    tail.start(); tail.stop(t + 2);
  } catch(e) {}
}

// Louder crystalline chimes with harmonic
export function playChime(index) {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime;
    const notes = [523, 587, 659, 784, 880, 988, 1047];
    const freq = notes[index % notes.length];

    // Main chime
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start(); osc.stop(t + 0.6);

    // Harmonic overtone
    const h = ctx.createOscillator();
    const hg = ctx.createGain();
    h.type = 'sine';
    h.frequency.setValueAtTime(freq * 2, t);
    hg.gain.setValueAtTime(0.08, t);
    hg.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    h.connect(hg).connect(ctx.destination);
    h.start(); h.stop(t + 0.4);
  } catch(e) {}
}

export function resumeAudio() {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
  } catch(e) {}
}
