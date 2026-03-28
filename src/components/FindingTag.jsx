export default function FindingTag({ type, severity, message }) {
  const normalizedType = normalizeType(type);
  const normalizedSeverity = normalizeSeverity(severity);
  const safeMessage =
    typeof message === "string" && message.trim()
      ? message.trim()
      : "No finding message provided.";

  const config = getFindingConfig(normalizedSeverity);

  return (
    <div
      style={{
        ...styles.wrapper,
        border: `1px solid ${config.border}`,
        background: config.background,
        boxShadow: `0 0 0 1px ${config.borderInset} inset, 0 0 24px ${config.glow}`,
      }}
    >
      <div style={styles.backgroundGlow(config.glowSoft)} />

      <div style={styles.content}>
        <div style={styles.topRow}>
          <div style={styles.typeBlock}>
            <span style={{ ...styles.type, color: config.color }}>
              {normalizedType}
            </span>
            <span style={styles.typeHint}>{config.hint}</span>
          </div>

          <span
            style={{
              ...styles.severity,
              color: config.color,
              border: `1px solid ${config.badgeBorder}`,
              background: config.badgeBackground,
              boxShadow: `0 0 18px ${config.badgeGlow}`,
            }}
          >
            {normalizedSeverity}
          </span>
        </div>

        <div style={styles.message}>{safeMessage}</div>

        <div
          style={{
            ...styles.accentLine,
            background: config.line,
          }}
        />
      </div>
    </div>
  );
}

function normalizeType(type) {
  if (typeof type !== "string" || !type.trim()) {
    return "Finding";
  }

  return type.trim();
}

function normalizeSeverity(severity) {
  const value =
    typeof severity === "string" ? severity.trim().toUpperCase() : "";

  if (["CRITICAL", "ELEVATED", "CLEAR", "INFO"].includes(value)) {
    return value;
  }

  return "INFO";
}

function getFindingConfig(severity) {
  switch (severity) {
    case "CRITICAL":
      return {
        color: "#ff6673",
        border: "rgba(255, 102, 115, 0.24)",
        borderInset: "rgba(255, 102, 115, 0.07)",
        background:
          "linear-gradient(180deg, rgba(255,102,115,0.08) 0%, rgba(20,10,14,0.92) 100%)",
        badgeBackground: "rgba(255, 102, 115, 0.12)",
        badgeBorder: "rgba(255, 102, 115, 0.20)",
        glow: "rgba(255, 102, 115, 0.10)",
        glowSoft: "rgba(255, 102, 115, 0.08)",
        badgeGlow: "rgba(255, 102, 115, 0.10)",
        line: "linear-gradient(90deg, rgba(255,102,115,0) 0%, rgba(255,102,115,1) 50%, rgba(255,102,115,0) 100%)",
        hint: "Immediate policy concern",
      };

    case "ELEVATED":
      return {
        color: "#e8a817",
        border: "rgba(232, 168, 23, 0.24)",
        borderInset: "rgba(232, 168, 23, 0.07)",
        background:
          "linear-gradient(180deg, rgba(232,168,23,0.08) 0%, rgba(19,15,8,0.92) 100%)",
        badgeBackground: "rgba(232, 168, 23, 0.12)",
        badgeBorder: "rgba(232, 168, 23, 0.20)",
        glow: "rgba(232, 168, 23, 0.10)",
        glowSoft: "rgba(232, 168, 23, 0.08)",
        badgeGlow: "rgba(232, 168, 23, 0.10)",
        line: "linear-gradient(90deg, rgba(232,168,23,0) 0%, rgba(232,168,23,1) 50%, rgba(232,168,23,0) 100%)",
        hint: "Requires closer review",
      };

    case "CLEAR":
      return {
        color: "#00e19a",
        border: "rgba(0, 225, 154, 0.22)",
        borderInset: "rgba(0, 225, 154, 0.06)",
        background:
          "linear-gradient(180deg, rgba(0,225,154,0.08) 0%, rgba(8,18,14,0.92) 100%)",
        badgeBackground: "rgba(0, 225, 154, 0.12)",
        badgeBorder: "rgba(0, 225, 154, 0.18)",
        glow: "rgba(0, 225, 154, 0.10)",
        glowSoft: "rgba(0, 225, 154, 0.08)",
        badgeGlow: "rgba(0, 225, 154, 0.08)",
        line: "linear-gradient(90deg, rgba(0,225,154,0) 0%, rgba(0,225,154,1) 50%, rgba(0,225,154,0) 100%)",
        hint: "No immediate rule conflict",
      };

    default:
      return {
        color: "#7cf0ff",
        border: "rgba(124, 240, 255, 0.22)",
        borderInset: "rgba(124, 240, 255, 0.06)",
        background:
          "linear-gradient(180deg, rgba(124,240,255,0.08) 0%, rgba(8,13,20,0.92) 100%)",
        badgeBackground: "rgba(124, 240, 255, 0.12)",
        badgeBorder: "rgba(124, 240, 255, 0.18)",
        glow: "rgba(124, 240, 255, 0.10)",
        glowSoft: "rgba(124, 240, 255, 0.08)",
        badgeGlow: "rgba(124, 240, 255, 0.08)",
        line: "linear-gradient(90deg, rgba(124,240,255,0) 0%, rgba(124,240,255,1) 50%, rgba(124,240,255,0) 100%)",
        hint: "Informational finding",
      };
  }
}

const styles = {
  wrapper: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    backdropFilter: "blur(8px)",
  },

  backgroundGlow: (glowSoft) => ({
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: `radial-gradient(circle at top right, ${glowSoft} 0%, rgba(0,0,0,0) 46%)`,
  }),

  content: {
    position: "relative",
    zIndex: 1,
    padding: 14,
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
    flexWrap: "wrap",
  },

  typeBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },

  type: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  typeHint: {
    fontSize: 11,
    lineHeight: 1.45,
    color: "#8f98aa",
  },

  severity: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    padding: "5px 9px",
    borderRadius: 999,
    whiteSpace: "nowrap",
  },

  message: {
    fontSize: 13,
    lineHeight: 1.65,
    color: "#d6dde8",
  },

  accentLine: {
    marginTop: 12,
    height: 2,
    width: "100%",
    borderRadius: 999,
  },
};