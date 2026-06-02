/** Full-page background: base page color + noise grain + soft desaturated gradients. */
export function ShaderBackground() {
  return (
    <div className="page-background" aria-hidden="true">
      <div className="page-background__noise" />
      <div className="page-background__gradients" />
    </div>
  );
}
