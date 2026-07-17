function GlassesOverlay({ frame }) {
  if (!frame) return null;

  return (
    <img
      src={frame.image}
      alt={frame.name}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "320px",
        transform: "translate(-50%, -50%)",
        border: "2px solid red",
        zIndex: 9999,
      }}
    />
  );
}

export default GlassesOverlay;