export function ViewportFrame() {
  return (
    <div className="viewport-frame" aria-hidden="true">
      <span className="viewport-frame__corner viewport-frame__corner--top-left" />
      <span className="viewport-frame__corner viewport-frame__corner--top-right" />
      <span className="viewport-frame__corner viewport-frame__corner--bottom-right" />
      <span className="viewport-frame__corner viewport-frame__corner--bottom-left" />

      {/* Precision engineering corner crosshairs */}
      <span className="absolute top-[18px] left-[18px] text-[10px] font-mono text-[var(--text-secondary)] opacity-30 select-none pointer-events-none">
        +
      </span>
      <span className="absolute top-[18px] right-[18px] text-[10px] font-mono text-[var(--text-secondary)] opacity-30 select-none pointer-events-none">
        +
      </span>
      <span className="absolute bottom-[18px] right-[18px] text-[10px] font-mono text-[var(--text-secondary)] opacity-30 select-none pointer-events-none">
        +
      </span>
      <span className="absolute bottom-[18px] left-[18px] text-[10px] font-mono text-[var(--text-secondary)] opacity-30 select-none pointer-events-none">
        +
      </span>
    </div>
  );
}
