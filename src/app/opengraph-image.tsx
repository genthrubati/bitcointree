import { ImageResponse } from "next/og";

// Social share card — what appears when bitcointree.org is shared anywhere.
export const alt =
  "BitcoinTree — a promise that cannot be broken, planted in public, growing for everyone.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf9f6",
          padding: "80px",
        }}
      >
        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#8a8a84",
            fontSize: "22px",
            letterSpacing: "8px",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", width: "10px", height: "10px", borderRadius: "10px", backgroundColor: "#f7931a" }} />
          A public monument to long-term thinking
        </div>

        {/* wordmark — the T is the single ember coal */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginTop: "44px",
            fontSize: "150px",
            fontWeight: 600,
            letterSpacing: "-3px",
            color: "#0d0d0c",
          }}
        >
          <span style={{ display: "flex" }}>Bitcoin</span>
          <span style={{ display: "flex", color: "#f7931a" }}>T</span>
          <span style={{ display: "flex" }}>ree</span>
        </div>

        {/* creed */}
        <div
          style={{
            display: "flex",
            marginTop: "40px",
            fontSize: "44px",
            color: "#0d0d0c",
          }}
        >
          A promise that cannot be broken.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            fontSize: "30px",
            color: "#6b6a64",
          }}
        >
          Planted in public. Grown for everyone.
        </div>

        {/* url */}
        <div
          style={{
            display: "flex",
            marginTop: "64px",
            fontSize: "22px",
            letterSpacing: "4px",
            color: "#8a8a84",
            textTransform: "uppercase",
          }}
        >
          bitcointree.org
        </div>
      </div>
    ),
    { ...size }
  );
}
