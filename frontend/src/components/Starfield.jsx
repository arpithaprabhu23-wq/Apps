export default function Starfield() {
  return (
    <>
      <div className="starfield" data-testid="starfield-bg" />
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 15% 20%, rgba(126, 91, 255, 0.14) 0%, transparent 40%), radial-gradient(circle at 85% 70%, rgba(0, 229, 255, 0.12) 0%, transparent 45%), radial-gradient(circle at 50% 100%, rgba(255, 215, 0, 0.08) 0%, transparent 55%)",
        }}
      />
    </>
  );
}
