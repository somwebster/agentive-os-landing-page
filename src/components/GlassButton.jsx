function GlassButton({ children, onClick, className }) {
  return (
    <button
      type="button"
      className={`glass-btn${className ? ` ${className}` : ''}`}
      onClick={onClick}
    >
      <span className="glass-btn__gradient" aria-hidden="true" />
      <span className="glass-btn__glass" aria-hidden="true" />
      <span className="glass-btn__label">{children}</span>
    </button>
  );
}

export default GlassButton;
