/**
 * Procedural SFX via Web Audio — no binary assets, no network.
 * All sounds are synthesised each time.
 */
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;

  init(): void {
    if (this.ctx) return;
    const AudioCtor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    this.ctx = new AudioCtor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.5;
    this.master.connect(this.ctx.destination);
  }

  resume(): void {
    this.ctx?.resume().catch(() => void 0);
  }

  private noise(duration: number, volume: number, filterHz?: number): void {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const env = Math.pow(1 - i / bufferSize, 2);
      data[i] = (Math.random() * 2 - 1) * env;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = volume;
    if (filterHz) {
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = filterHz;
      src.connect(filter).connect(gain).connect(master);
    } else {
      src.connect(gain).connect(master);
    }
    src.start(now);
  }

  private tone(
    freq: number,
    duration: number,
    type: OscillatorType,
    volume: number,
    freqEnd?: number
  ): void {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (freqEnd !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), now + duration);
    }
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain).connect(master);
    osc.start(now);
    osc.stop(now + duration);
  }

  gunshot(): void {
    this.noise(0.18, 0.6, 3500);
    this.tone(160, 0.15, 'sine', 0.5, 40);
    this.tone(80, 0.25, 'triangle', 0.3, 30);
  }

  enemyHit(): void {
    this.noise(0.08, 0.35, 1800);
    this.tone(320, 0.08, 'square', 0.2, 160);
  }

  hurt(): void {
    this.tone(220, 0.22, 'sawtooth', 0.35, 90);
    this.noise(0.1, 0.2, 800);
  }

  enemyDeath(): void {
    this.tone(140, 0.45, 'sawtooth', 0.4, 40);
    this.noise(0.3, 0.3, 1200);
  }

  emptyClick(): void {
    this.tone(800, 0.04, 'square', 0.2);
    this.tone(400, 0.04, 'square', 0.15);
  }
}
