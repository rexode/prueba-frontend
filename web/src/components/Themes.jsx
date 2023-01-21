import { createTheme } from "@mui/material";
import { Paper, Typography,Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { styled } from "@mui/material";

    export const themeDark = createTheme({
        palette: {
            primary: {
              main: "#FFFFFF",
            },
            secondary: {
              main: "#D0F688",
            },
          },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundImage: `linear-gradient(180deg, #00063C 0%, #0013BC 32.29%, #2A01A0 73.96%, #CC00FF 100%)`,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              // Name of the slot
              root: {
                color: "#f5efff",
                background: "linear-gradient(149.45deg, #7400b8 0%, #5e60ce 50%, #4ea8de 73%, #64dfdf  100%)",
                borderRadius: 50,
                border: "3px solid",
                marginLeft: "40px"
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                color: "#f5efff",
                backgroundImage: `linear-gradient(180deg, #00063C 0%, #0013BC 32.29%, #2A01A0 73.96%, #CC00FF 100%)`
              }
            }
          }
        },
      })
      
      export const themeLight=createTheme({
        palette: {
            primary: {
              main: "#F688F4",
            },
            secondary: {
              main: "#a594f9",
            },
            
          },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundImage: `linear-gradient(180deg, #8A88F6 0%, #1BAEDC 47.4%, #B7E4FE 94.27%)`,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              // Name of the slot
              root: {
                color: "#f5efff",
                background: "linear-gradient(149.45deg, #F688F4 13.77%, #F59F87 95.01%, #F688F4 95.01%)",
                borderRadius: 50,
                border: "3px solid",
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                color: "#f5efff",
                backgroundImage: `linear-gradient(180deg, #8A88F6 0%, #1BAEDC 47.4%, #B7E4FE 94.27%)`
              }
            }
          }
      
      
      
        },
      }) 

      export const BotonPersonalizado = styled(Button)({
        color: "#f5efff",
        background: "linear-gradient(149.45deg, #F688F4 13.77%, #F59F87 95.01%, #F688F4 95.01%)",
        borderRadius: 50,
        border: "3px solid",
        marginLeft: "40px"
      });
      
