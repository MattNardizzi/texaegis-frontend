export default function VerdictBanner({ decision }) {
  const normalizedDecision = normalizeDecision(decision);
  const config = getDecisionConfig(normalizedDecision);

  return (
    <div
      style={{
        ...styles.wrapper,
        border: `1px solid ${config.border}`,
        boxShadow: `0 0 0 1px ${config.borderInset} inset, 0 0 34px ${config.glow}`,
        background: config.background,
      }}
    >
      <div style={styles.backgroundGlow(config.glowSoft)} />
      <div style={styles.gridOverlay} />

      <div style={styles.content}>
        <div style={styles.topRow}>
          <div>
            <div style={styles.label}>TEX DECISION</div>
            <div style={styles.subLabel}>{config.subLabel}</div>
          </div>

          <div style={styles.statusWrap}>
            <div
              style={{
                ...styles.statusDot,
                background: config.color,
                boxShadow: `0 0 18px ${config.glowStrong}`,
              }}
            />
            <span
              style={{
                ...styles.statusText,
                color: config.color,
              }}
            >
              {normalizedDecision}
            </span>
          </div>
        </div>

        <div
          style={{
            ...styles.decision,
            color: config.color,
            textShadow: `0 0 24px ${config.glowSoft}`,
          }}
        >
          {normalizedDecision}
        </div>

        <div style={styles.metaRow}>
          <div style={styles.metaItem}>
            <span style={styles.metaLabel}>Route</span>
            <span style={styles.metaValue}>{config.routeLabel}</span>
          </div>

          <div style={styles.metaItem}>
            <span style={styles.metaLabel}>State</span>
            <span style={{ ...styles.metaValue, color: config.color }}>
              {config.stateLabel}
            </span>
          </div>
        </div>

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

function normalizeDecision(decision) {
  const value =
    typeof decision === "string" ? decision.trim().toUpperCase() : "";

  if (value === "PERMIT" || value === "FORBID" || value === "ABSTAIN") {
    return value;
  }

  return "UNKNOWN";
}

function getDecisionConfig(decision) {
  switch (decision) {
    case "PERMIT":
      return {
        color: "#00e19a",
        border: "rgba(0, 225, 154, 0.22)",
        borderInset: "rgba(0, 225, 154, 0.08)",
        glow: "rgba(0, 225, 154, 0.18)",
        glowSoft: "rgba(0, 225, 154, 0.14)",
        glowStrong: "rgba(0, 225, 154, 0.8)",
        background:
          "linear-gradient(180deg, rgba(0,225,154,0.09) 0%, rgba(10,13,21,0.96) 52%, rgba(7,9,15,1) 100%)",
        line: "linear-gradient(90deg, rgba(0,225,154,0) 0%, rgba(0,225,154,1) 50%, rgba(0,225,154,0) 100%)",
        subLabel: "Action permitted under current governance conditions",
        routeLabel: "Allowed to proceed",
        stateLabel: "Clear",
      };

    case "FORBID":
      return {
        color: "#ff4d5a",
        border: "rgba(255, 77, 90, 0.22)",
        borderInset: "rgba(255, 77, 90, 0.08)",
        glow: "rgba(255, 77, 90, 0.18)",
        glowSoft: "rgba(255, 77, 90, 0.14)",
        glowStrong: "rgba(255, 77, 90, 0.8)",
        background:
          "linear-gradient(180deg, rgba(255,77,90,0.10) 0%, rgba(10,13,21,0.96) 52%, rgba(7,9,15,1) 100%)",
        line: "linear-gradient(90deg, rgba(255,77,90,0) 0%, rgba(255,77,90,1) 50%, rgba(255,77,90,0) 100%)",
        subLabel: "Action blocked by Tex governance enforcement",
        routeLabel: "Blocked from release",
        stateLabel: "Denied",
      };

    case "ABSTAIN":
      return {
        color: "#e8a817",
        border: "rgba(232, 168, 23, 0.22)",
        borderInset: "rgba(232, 168, 23, 0.08)",
        glow: "rgba(232, 168, 23, 0.18)",
        glowSoft: "rgba(232, 168, 23, 0.14)",
        glowStrong: "rgba(232, 168, 23, 0.8)",
        background:
          "linear-gradient(180deg, rgba(232,168,23,0.10) 0%, rgba(10,13,21,0.96) 52%, rgba(7,9,15,1) 100%)",
        line: "linear-gradient(90deg, rgba(232,168,23,0) 0%, rgba(232,168,23,1) 50%, rgba(232,168,23,0) 100%)",
        subLabel: "Action requires escalation or additional review",
        routeLabel: "Escalate for review",
        stateLabel: "Held",
      };

    default:
      return {
        color: "#8ea0b8",
        border: "rgba(142, 160, 184, 0.18)",
        borderInset: "rgba(142, 160, 184, 0.06)",
        glow: "rgba(142, 160, 184, 0.14)",
        glowSoft: "rgba(142, 160, 184, 0.10)",
        glowStrong: "rgba(142, 160, 184, 0.6)",
        background:
          "linear-gradient(180deg, rgba(142,160,184,0.08) 0%, rgba(10,13,21,0.96) 52%, rgba(7,9,15,1) 100%)",
        line: "linear-gradient(90deg, rgba(142,160,184,0) 0%, rgba(142,160,184,0.9) 50%, rgba(142,160,184,0) 100%)",
        subLabel: "Tex returned an unrecognized decision state",
        routeLabel: "Unknown route",
        stateLabel: "Unknown",
      };
  }
}

const styles = {
  wrapper: {
    position: "relative",
    borderRadius: 18,
    padding: 0,
    overflow: "hidden",
    backdropFilter: "blur(10px)",
  },

  backgroundGlow: (glowSoft) => ({
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: `radial-gradient(circle at top right, ${glowSoft} 0%, rgba(0,0,0,0) 42%)`,
  }),

  gridOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.08,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
  },

  content: {
    position: "relative",
    zIndex: 1,
    padding: "20px 20px 18px",
  },

  topRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 16,
    flexWrap: "wrap",
  },

  label: {
    fontSize: 10,
    letterSpacing: 2.2,
    color: "#677086",
    fontWeight: 800,
    textTransform: "uppercase",
    marginBottom: 6,
  },

  subLabel: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "#97a2b5",
    maxWidth: 360,
  },

  statusWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    whiteSpace: "nowrap",
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    flexShrink: 0,
  },

  statusText: {
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 800,
    textTransform: "uppercase",
  },

  decision: {
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 900,
    letterSpacing: 2.8,
    lineHeight: 1,
    marginBottom: 16,
    textTransform: "uppercase",
  },

  metaRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 14,
  },

  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 10px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.05)",
  },

  metaLabel: {
    fontSize: 10,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: "#6e7890",
    fontWeight: 800,
  },

  metaValue: {
    fontSize: 12,
    color: "#d5deea",
    fontWeight: 700,
  },

  accentLine: {
    height: 2,
    width: "100%",
    borderRadius: 999,
  },
};