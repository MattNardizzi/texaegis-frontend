export default function ScoreRow({ label, score, finding, evidence }) {
  const normalizedLabel = normalizeLabel(label);
  const normalizedScore = normalizeScore(score);
  const percentage = Math.round(normalizedScore * 100);
  const safeFinding = safeText(finding, "");
  const safeEvidence = safeText(evidence, "");
  const config = getScoreConfig(normalizedScore);

  return (
    <div
      style={{
        ...styles.wrapper,
        border: `1px solid ${config.border}`,
        boxShadow: `0 0 0 1px ${config.borderInset} inset, 0 0 22px ${config.glowSoft}`,
        background: config.cardBackground,
      }}
    >
      <div style={styles.backgroundGlow(config.glowFade)} />

      <div style={styles.content}>
        <div style={styles.topRow}>
          <div style={styles.labelBlock}>
            <div style={styles.label}>{normalizedLabel}</div>
            <div style={styles.labelHint}>Semantic risk dimension</div>
          </div>

          <div style={styles.rightMeta}>
            <span style={{ ...styles.score, color: config.color }}>
              {percentage}%
            </span>

            <span
              style={{
                ...styles.statusPill,
                color: config.color,
                border: `1px solid ${config.badgeBorder}`,
                background: config.badgeBackground,
                boxShadow: `0 0 18px ${config.glowSoft}`,
              }}
            >
              {config.label}
            </span>
          </div>
        </div>

        <div style={styles.trackShell}>
          <div style={styles.track}>
            <div
              style={{
                ...styles.fill,
                width: `${percentage}%`,
                background: config.fill,
                boxShadow: `0 0 24px ${config.glowStrong}`,
              }}
            />
          </div>
        </div>

        {safeFinding && <div style={styles.finding}>{safeFinding}</div>}

        {safeEvidence && (
          <div
            style={{
              ...styles.evidence,
              borderLeft: `2px solid ${config.evidenceBorder}`,
            }}
          >
            {safeEvidence}
          </div>
        )}
      </div>
    </div>
  );
}

function normalizeScore(score) {
  if (typeof score !== "number" || Number.isNaN(score)) {
    return 0;
  }

  if (score < 0) return 0;
  if (score > 1) return 1;

  return score;
}

function normalizeLabel(label) {
  if (typeof label !== "string" || !label.trim()) {
    return "Unknown Dimension";
  }

  return label.trim();
}

function safeText(value, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function getScoreConfig(score) {
  if (score >= 0.7) {
    return {
      label: "CRITICAL",
      color: "#ff6673",
      border: "rgba(255, 102, 115, 0.24)",
      borderInset: "rgba(255, 102, 115, 0.07)",
      badgeBorder: "rgba(255, 102, 115, 0.20)",
      badgeBackground: "rgba(255, 102, 115, 0.12)",
      cardBackground:
        "linear-gradient(180deg, rgba(255,102,115,0.08) 0%, rgba(15,10,14,0.94) 100%)",
      fill: "linear-gradient(90deg, #ff7c87 0%, #ff4d5a 100%)",
      glowSoft: "rgba(255, 102, 115, 0.10)",
      glowStrong: "rgba(255, 102, 115, 0.28)",
      glowFade: "rgba(255, 102, 115, 0.08)",
      evidenceBorder: "rgba(255, 102, 115, 0.28)",
    };
  }

  if (score >= 0.4) {
    return {
      label: "ELEVATED",
      color: "#e8a817",
      border: "rgba(232, 168, 23, 0.24)",
      borderInset: "rgba(232, 168, 23, 0.07)",
      badgeBorder: "rgba(232, 168, 23, 0.20)",
      badgeBackground: "rgba(232, 168, 23, 0.12)",
      cardBackground:
        "linear-gradient(180deg, rgba(232,168,23,0.08) 0%, rgba(18,14,8,0.94) 100%)",
      fill: "linear-gradient(90deg, #f2c757 0%, #e8a817 100%)",
      glowSoft: "rgba(232, 168, 23, 0.10)",
      glowStrong: "rgba(232, 168, 23, 0.28)",
      glowFade: "rgba(232, 168, 23, 0.08)",
      evidenceBorder: "rgba(232, 168, 23, 0.28)",
    };
  }

  return {
    label: "CLEAR",
    color: "#7cf0ff",
    border: "rgba(124, 240, 255, 0.24)",
    borderInset: "rgba(124, 240, 255, 0.07)",
    badgeBorder: "rgba(124, 240, 255, 0.20)",
    badgeBackground: "rgba(124, 240, 255, 0.12)",
    cardBackground:
      "linear-gradient(180deg, rgba(124,240,255,0.08) 0%, rgba(9,13,20,0.94) 100%)",
    fill: "linear-gradient(90deg, #7cf0ff 0%, #9f84ff 100%)",
    glowSoft: "rgba(124, 240, 255, 0.10)",
    glowStrong: "rgba(124, 240, 255, 0.26)",
    glowFade: "rgba(124, 240, 255, 0.08)",
    evidenceBorder: "rgba(124, 240, 255, 0.26)",
  };
}

const styles = {
  wrapper: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
  },

  backgroundGlow: (glowFade) => ({
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: `radial-gradient(circle at top right, ${glowFade} 0%, rgba(0,0,0,0) 44%)`,
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
    marginBottom: 12,
    flexWrap: "wrap",
  },

  labelBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },

  label: {
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: "#d9e1ed",
    fontWeight: 800,
  },

  labelHint: {
    fontSize: 11,
    lineHeight: 1.45,
    color: "#8d97aa",
  },

  rightMeta: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },

  score: {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 1,
  },

  statusPill: {
    fontSize: 10,
    padding: "5px 9px",
    borderRadius: 999,
    fontWeight: 800,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },

  trackShell: {
    marginBottom: 12,
  },

  track: {
    height: 10,
    width: "100%",
    background: "rgba(7, 10, 16, 0.95)",
    borderRadius: 999,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.02)",
  },

  fill: {
    height: "100%",
    borderRadius: 999,
    transition: "width 0.45s ease",
  },

  finding: {
    fontSize: 13,
    lineHeight: 1.65,
    color: "#d2dae6",
  },

  evidence: {
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 12,
    lineHeight: 1.65,
    color: "#97a1b4",
  },
};