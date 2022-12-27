import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Readex Pro", "sans-serif"].join(","),
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 900,
    },
    fontWeightBold: "bolder",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#5379FF",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        backgroundColor: "#f00",
        backgroundImage:
          "linear-gradient(20deg, rebeccapurple, transparent), url(https://grainy-gradients.vercel.app/noise.svg)",
      },
    },
    MuiContainer: {
      defaultProps: {
        fixed: true,
        maxWidth: "xl",
      },
    },
    MuiStack: {
      defaultProps: {
        direction: "row",
      },
    },
  },
});

export default theme;
