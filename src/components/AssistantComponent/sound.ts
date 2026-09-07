// Lightweight notification sounds generated with the Web Audio API — no audio
// asset files, so nothing to host and no CSP media-src concerns. All calls are
// guarded: if the browser blocks audio (autoplay policy before any user gesture,
// unsupported context, etc.) the call is a silent no-op.

type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AudioCtor =
        window.AudioContext ||
        (window as WindowWithWebkitAudio).webkitAudioContext;
      if (!AudioCtor) return null;
      ctx = new AudioCtor();
    }
    return ctx;
  } catch {
    return null;
  }
}

/**
 * Create/resume the audio context from within a user gesture (click/tap).
 * Browsers keep the context "suspended" until a gesture, so notification
 * sounds fired later (e.g. when an answer arrives) stay silent unless we
 * unlock it here first.
 */
export function unlockAudio(): void {
  const audio = getContext();
  if (audio && audio.state === "suspended") {
    audio.resume().catch(() => {});
  }
}

/**
 * Play a short, soft chime.
 * - "notify": a two-note rise, used when an answer is ready.
 * - "soft": a single gentle note, used for the attention teaser.
 */
export function playChime(kind: "notify" | "soft" = "notify"): void {
  const audio = getContext();
  if (!audio) return;

  try {
    if (audio.state === "suspended") {
      audio.resume().catch(() => {});
    }

    const now = audio.currentTime;
    const notes = kind === "notify" ? [880, 1174.66] : [740];

    notes.forEach((freq, index) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;

      const start = now + index * 0.11;
      const duration = 0.2;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.1, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      osc.connect(gain).connect(audio.destination);
      osc.start(start);
      osc.stop(start + duration);
    });
  } catch {
    // Ignore — audio is a nice-to-have, never critical.
  }
}
