const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "tablet-lg": {
          min: "1180px",
        },
        "tablet-md": {
          max: "1180px",
        },
        tablet: {
          max: "1180px",
          min: "640px",
        },
      },
      spacing: {
        12.5: "12.5rem",
      },
      fontFamily: {
        sans: ["Filson Soft", ...defaultTheme.fontFamily.sans],
        roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      dropShadow: {
        hug: "-20px 0px 30px rgba(157, 232, 123, 1)",
        kiss: "-20px 0px 30px rgba(99, 211, 226, 1)",
        "high-five": "-20px 0px 30px rgba(255, 229, 129, 1)",
        wave: "-20px 0px 30px rgba(248, 166, 99, 1)",
        stranger: "-20px 0px 30px rgba(255, 126, 104, 1)",
      },
      boxShadow: {
        "primary-1": "0px 8px 0px #270E65",
        "orbit-primary-1": "inset 0px -4px 0px #270E65",
        "orbit-primary-1-hovered": "inset 0px -8px 0px #270E65",
        "orbit-primary-3": "inset 0px -4px 0px #621376",
        "button-primary-1": "inset 0px -4px 0px rgba(0, 0, 0, 0.25)",
        "button-primary-1-hovered": "inset 0px -8px 0px rgba(0, 0, 0, 0.25)",
        "button-primary-2-hovered": "inset 0px -6px 0px rgba(0, 0, 0, 0.25)",
        "white-1": "inset 0px -4px 0px rgba(0, 0, 0, 0.25)",
        "feeling-primary": "inset 0px -4px 0px #0A184F",
        "custom-error-1": "inset 0px -4px 0px #DB3418",
        "success-2": "inset 0px -4px 0px #86C96E",
      },
      backgroundImage: {
        "gradient-error-1":
          "linear-gradient(0deg, rgba(254, 99, 73, 0.5), rgba(254, 99, 73, 0.5))",
        "gradient-primary": "linear-gradient(180deg, #270E65 0%, #621376 100%)",
        "circle-kiss":
          "radial-gradient(transparent 0%, rgba(99, 211, 226, 0.6) 100%)",
        "circle-hug":
          "radial-gradient(transparent 0%, rgba(157, 232, 123, 0.6) 100%)",
        "circle-high-five":
          "radial-gradient(transparent 0%, rgba(255, 229, 129, 0.6) 100%)",
        "circle-wave":
          "radial-gradient(transparent 0%, rgba(248, 166, 99, 0.6) 100%)",
        "circle-stranger":
          "radial-gradient(transparent 0%, rgba(255, 126, 104, 0.6) 100%)",
      },
      colors: {
        "white-0": "#fff",
        "white-1": "#EFEFEF",
        "orbit-primary": "#513295",
        "orbit-primary-1": "#270E65",
        "orbit-primary-2": "#EFE9FF",
        "info-1": "#579FF4",
        "game1-secondary": "#FFE581",
        "orbit-pink": "#C904A2",
        "feeling-primary": "#0A184F",
        "feeling-primary-1": "#00C2FF",
        "error-1": "#FE6349",
        "error-2": "#DB3418",
        "success-1": "#AAF490",
        "success-2": "#86C96E",
        "success-3": "#B0ED93",
      },
    },
  },
  plugins: [],
};
