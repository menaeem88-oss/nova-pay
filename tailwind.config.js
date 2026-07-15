/**
 * NovaKit Lite — design tokens.
 * These are the shared vocabulary every screen should build from.
 *
 * Extended for the salary-advance case study — see docs/DESIGN_SYSTEM.md
 * for the full token/component change-log and rationale for each addition.
 * Every token here has a same-named counterpart documented for Figma variables.
 */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand — indigo. Ramp completed (300/500/600/700/900 were missing);
        // `pressed` kept as a semantic alias onto 800, not a gap.
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          DEFAULT: "#4F46E5", // = brand-600
          700: "#4338CA",
          800: "#312E81",
          pressed: "#312E81", // = brand-800, alias for active/pressed states
          900: "#312E81",
        },
        // Accent — warm amber, for highlights and expressive moments only.
        // Never used for error/warning meaning — see `danger` / `warning` below.
        accent: {
          50: "#FFF7E6",
          100: "#FDECC8",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          DEFAULT: "#F59E0B", // = accent-500
          600: "#B45309",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        // Neutral — ramp completed (400/600/800 were missing).
        neutral: {
          50: "#FAFAFA",
          100: "#F2F2F2",
          200: "#ECECEC",
          300: "#D9D9D9",
          400: "#A6A6A6",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
        },

        // --- Semantic status colors (new) ---------------------------------
        // The single biggest gap for a lending app: before this, only
        // `success` existed as a flat value, so decline / over-limit /
        // haircut / late states had no correct color and risked the amber
        // `accent` being misused for error meaning. Full ramps let banners,
        // tints, borders and text all resolve from the same semantic family.
        success: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#1E9E5A",
          DEFAULT: "#1E9E5A", // kept identical to the original flat value
          600: "#15803D",
          700: "#0F6A32",
          800: "#065F46",
          900: "#064E3B",
        },
        danger: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          DEFAULT: "#DC2626", // = danger-600
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        warning: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          DEFAULT: "#EA580C", // = warning-600
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
        info: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          DEFAULT: "#2563EB", // = info-600
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },

        // --- Border / divider (new) ---------------------------------------
        // Previously three off-token hairline grays existed: Card's
        // `#E6E6E6`, ListRow's `#DADADA`, and raw `neutral-300` (`#D9D9D9`)
        // used interchangeably. Collapsed to one token with a `strong`
        // variant; both the old hex values and `neutral-300` now route here.
        divider: {
          DEFAULT: "#E6E6E6",
          strong: "#DADADA",
        },

        // --- Focus (new) ----------------------------------------------------
        // No dedicated focus-ring token existed; TextField hard-coded
        // `focus:border-brand focus:ring-brand/30` inline. Centralising it
        // means every interactive component (Button, Chip, icon buttons)
        // can share one focus-visible treatment.
        focus: {
          DEFAULT: "#4F46E5", // = brand-600
        },
      },

      // --- Radius --------------------------------------------------------
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        // New: a distinct radius for full-height sheets vs. resting cards,
        // per the HIG note that sheets should read as a different surface.
        sheet: "24px",
        // New: the device-chrome radius for the phone frame itself — was a
        // raw `rounded-[28px]` arbitrary value in App.jsx, the only radius
        // in the app not expressed as a token. Named distinctly from `sheet`
        // (24px) since it's a different surface (viewport bezel, not content).
        frame: "28px",
      },

      // --- Elevation (new scale) ------------------------------------------
      // Previously only `shadow-card` existed, so modals/toasts shared a
      // resting card's shadow. Added a scale so overlays read as "above"
      // sheets, which read as "above" cards.
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.08)",
        sheet: "0 -8px 30px rgba(0, 0, 0, 0.18)",
        overlay: "0 10px 40px rgba(0, 0, 0, 0.24)",
      },

      // --- Spacing (documented semantic scale) ----------------------------
      // Tailwind's default numeric spacing scale already exists; spacing
      // was ad-hoc in components because there was no *named* scale to
      // reach for. These aliases sit on top of the default scale so
      // component code reads with intent (`gap-sm` vs. a bare `gap-2`).
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },

      // --- Typography ------------------------------------------------------
      // Weight decoupled from size: previously `title` baked in 600 and
      // `display` baked in 700, which fights Dynamic Type / accessibility
      // text-size scaling and made a 400-weight title impossible. Sizes now
      // only carry size + line-height; weight is applied per-use via
      // `font-semibold` / `font-bold`, or overridden by the caller.
      fontSize: {
        display: ["28px", { lineHeight: "34px" }],
        title: ["20px", { lineHeight: "26px" }],
        body: ["15px", { lineHeight: "22px" }],
        caption: ["13px", { lineHeight: "18px" }],
      },
      fontWeight: {
        // Explicit tokens so weight is a first-class, named choice —
        // resolves to Tailwind's standard 400/500/600/700 scale.
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
};
