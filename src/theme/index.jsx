import _ from "lodash";
import { colors, createTheme, responsiveFontSizes } from "@material-ui/core";
import { softShadows, strongShadows } from "./shadows";
import typography from "./typography";

const baseOptions = {
  direction: "ltr",
  typography,
  overrides: {
    MuiDialog: {
      paperWidthLg: {
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        // border: "1px solid #CBCBCB",
      },
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: "#1069C2",
      },
    },
    MuiSelect: {
      icon: {
        color: "#fff",
      },

      iconOutlined: {
        // color: "#fff",
        right: "10px",
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: "0px",
        "@media (min-width: 600px)": {
          minHeight: "0px !important",
        },
      },
    },

    MuiIconButton: {
      root: {
        flex: "0 0 auto",
        color: "#00B0ED !important",
        width: "40px",
        height: "40px",
        overflow: "visible",
        borderRadius: "50%",

        "@media (max-width: 767px)": {
          width: "40px",
          height: "40px",
        },
        "&.Mui-disabled": {
          "& .MuiSvgIcon-root": {
            color: "rgba(0, 0, 0, 0.26)",
          },
        },
      },
      edgeEnd: {
        marginRight: " 0px",
      },
    },
    // MuiTableRow: {
    //   root: {
    //     borderTop: "1px solid rgb(13 116 201 / 28%) !important",
    //     // border: "1px solid #3a96dd ",
    //   },
    // },
    MuiDialogActions: {
      root: {
        marginRight: "14px",
      },
    },
    MuiDialogContent: {
      root: {
        overflowY: "none",
      },
    },
    MuiMenu: {
      list: {
        padding: "10px ",
      },
    },
    MuiFormControl: {
      marginDense: {
        marginTop: "8px !important",
        marginBottom: "5px !important",
        /* height: 33px; */
      },
      root: {
        border: "0",
        width: "100%",
        margin: "0",
        display: "inline-flex",
        padding: "0",
        position: "relative",
        minWidth: "0",
        flexDirection: "column",
        verticalAlign: "top",
        marginTop: "8px",
      },
    },
    MuiCheckbox: {
      root: {
        width: "10px",
        height: "10px",
      },
    },
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: "hidden",
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
        color: "white",
      },
    },
    MuiList: {
      padding: {
        paddingTop: "0px",
        paddingBottom: "8px",
      },
    },
    MuiListItem: {
      root: {
        paddingBottom: "6px",
        paddingTop: "0x",
      },
      gutters: {
        paddingLeft: "0px",
        paddingRight: "0px",
      },
    },
    MuiChip: {
      root: {
        backgroundColor: "rgba(0,0,0,0.075)",
      },
    },
    MuiTableCell: {
      alignLeft: {
        textAlign: "left",
      },
      alignCenter: {
        textAlign: "center",
      },
      alignRight: {
        textAlign: "left",
      },
      root: {
        borderBottom: "none",
        padding: "12px 6px 14px 10px",
        textAlign: "left",
        fontSize: "13px",
      },
      body: {
        color: "#fff",
      },
      head: {
        color: "#fff",
        // backgroundColor: "#302f35",
        background:
          "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
        fontSize: "14px !important",
        fontWeight: "400 !important",
        textAlign: "center",
      },
    },
    MuiTypography: {
      colorPrimary: {
        color: "#000",
      },

      caption: {
        color: "#A7A1A1",
        fontSize: "12px",
      },
      subtitle2: {
        color: "#fff",
        lineHeight: "20px !important",
      },
      colorTextSecondary: {
        color: "white",
      },
    },
    MuiLink: {
      underlineHover: { color: "#747474" },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "10px",
      },
      input: {
        padding: "13.5px 14px !important",
      },
    },
    MuiTab: {
      textColorPrimary: {
        color: "#fff",
        "&.Mui-selected": {
          color: "#fff",
        },
      },
    },

    MuiButton: {
      root: {
        fontWeight: "500 !important",
        fontSize: "13px",
        color: "#fff",
        "&:hover": {
          backgroundColor: "none",
          color: "none",
        },
      },
      containedSecondary: {
        borderRadius: "30px",
        color: "#fff",
        fontSize: "14px",
        background: "#56CA00",
        padding: "11px 30px !important",
        "&:hover": {
          background: "#56CA00",
          color: "#fff",
        },
        "@media (max-width: 600px)": {
          padding: "7px 15px !important",
        },
      },

      outlinedPrimary: {
        color: "#848484",
        padding: "9px 30px !important",
        fontSize: "14px",
        border: "1px solid #1069C2",
        borderRadius: "4px",
        backgroundColor: "#fff",
        boxShadow: "0px 6px 13px rgb(0 0 0 / 25%)",
      },
      containedPrimary: {
        color: "#fff",
        padding: "9px 30px !important",
        fontSize: "14px",
        background:
          "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
        borderRadius: "4px",
        backgroundColor: "#fff",
        boxShadow: "0px 6px 13px rgb(0 0 0 / 25%)",
      },
      contained: {
        borderRadius: "5px",
        color: "#000",
        fontSize: "18px",
        fontWeight: "500",

        padding: "5px 19px",

        "&:hover": {
          backgroundColor:
            "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
          color: "#fff",
        },
      },
      outlinedSecondary: {
        borderRadius: "30px",
        color: "#848484",
        fontSize: "16px",
        filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.25))",
        fontWeight: 400,
        padding: "11px 30px !important",
        border: "1px solid #3a96dd",
        "&:hover": {
          background:
            "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
          color: "#fff",
          border: "1px solid #3a96dd",
        },
        "@media (max-width: 600px)": {
          padding: "7px 15px !important",
        },
      },
      outlinedSizeSmall: {
        padding: "6px 23px",
        fontSize: "16px",
        lineHeight: " 24px",
      },
      textPrimary: {
        color: "#848484",
      },
    },
    // MuiTableRow: {
    //   root: {
    //     borderTop: "1px solid rgb(13 116 201 / 28%) !important",
    //   },
    // },

    PrivateTabIndicator: {
      colorPrimary: {
        backgroundColor: "#FF2626",
      },
    },

    MuiDropzoneArea: {
      root: {
        backgroundColor: "transparent",
        border: "1px dashed #5d5656 !important",
        minHeight: "170px !important",
      },
    },

    MuiFormLabel: {
      root: {
        color: "#1D2D3F",
        marginTop: "0",
      },
    },
    MuiFormHelperText: {
      contained: {
        marginLeft: "0px",
        marginRight: "0px",
        fontSize: "12px !important",
      },
    },

    MuiInputBase: {
      input: {
        "&.Mui-disabled": {
          // border: "1px solid #312e2e",
          borderRadius: "4px",
        },
        input__webkit_autofill: {
          WebkitBackgroundClip: "text !important",
          WebkitTextFillColor: "red !important",
        },
        // "& ::-webkit-autofill": {
        //   color: "#000 !important",
        // },
      },
      root: {
        fontSize: "13px",
      },
    },
    MuiPopover: {
      paper: {
        marginTop: "44px",
      },
    },
    MuiPickersCalendarHeader: {
      iconButton: { backgroundColor: "transparent !important" },

      dayLabel: {
        color: "#fff",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#fff",
      },
      daySelected: {
        backgroundColor: "#000",
        // "& :hover": {
        //   backgroundColor: "#fff",
        // },
      },
      "& :hover": {
        backgroundColor: "#fff",
      },
    },
    //     .MuiPickersDay-daySelected:hover {
    //     background-color: #fff;
    // }
    MuiSvgIcon: {
      root: {
        color: "#848484",
      },
    },
    MuiAlert: {
      standardError: {
        color: "none",
        backgroundColor: "none",
      },
    },

    MuiPagination: {
      ul: {
        background: "none !important",
        height: "41px !important",
        width: "auto !important",
      },
    },
    MuiDrawer: {
      paper: {
        overflowY: "none",
      },
    },
    MuiInput: {
      underline: {
        "&::before": {
          display: "none",
        },
        "&::after": {
          display: "none",
        },
      },
    },

    MuiPickersToolbar: {
      toolbar: {
        background:
          "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      },
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        color: "none",
      },
      toolbarBtnSelected: {
        color: "none",
      },
    },
  },
};

const themesOptions = [
  {
    name: "LIGHT",
    overrides: {
      MuiSvgIcon: {
        root: {
          color: "#000",
        },
      },
      MuiInputBase: {
        root: {
          color: "#000 !important",
        },
        input: {
          color: "#000 !important",
        },
      },
      // MuiOutlinedInput: {
      //   root: {
      //     background: "#F3F5F6 !important",
      //   },
      // },
      // MuiTableRow: {
      //   root: {
      //     borderTop: "1px solid rgb(13 116 201 / 28%) !important",
      //   },
      // },
      MuiTypography: {
        subtitle2: {
          color: "rgba(0, 0, 0, 0.5)",
        },
      },
      MuiPaper: {
        rounded: {
          border: "20px",
        },
        root: {
          // backgroundColor: "#302F35",
          background: "#234231",
          // border: "1px solid #CBCBCB",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "4px",
          // background:
          //   "linear-gradient(144deg, #00ACEB 0%, #00B0ED -0.82%, #1069C2 70.35%, #1069C2 100%)",
          color: "rgba(0, 0, 0, 0.5)",
        },
        outlined: {
          backgroundColor: "#2A292E",
          border: "1px solid #797979",
        },
      },
      MuiTableCell: {
        body: {
          color: "#000",
        },
      },
      MuiOutlinedInput: {
        root: {
          "& ::-webkit-input-placeholder": {
            color: "#000 !important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #fff",
            borderColor: "#fff",
          },
          input: {
            "& ::-webkit-autofill": {
              WebkitBoxShadow: "none !important",
            },
          },
        },
        notchedOutline: {
          // border: "1px solid #ececec",
          // borderColor: "#ececec",
        },
        adornedEnd: {
          paddingRight: "6px",
        },
      },
    },
    palette: {
      type: "light",
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: colors.common.white,
        dark: "#fff",
        virtual: "#F8FBFF",
        paper: colors.common.white,
        taf: "#F3F5F6",
        chatBox: "#fff",
        back: "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
        cardstyle: "#245CA3",
        About: "#fff",
        dashLayout: "#56CA00",
        Notification: "#fff",
        login: "#e5e5e5",
        CardP2P: "#FFFFFF",
        stakeing: "#F8FBFF",
        reward: "#FFFFFF",
      },
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#fff",
      },
      tertiary: {
        main: "#ccc",
      },
      text: {
        // primary: colors.blueGrey[900],
        // mainColor: "#000",
        // secondary: colors.blueGrey[600],
        primary: colors.blueGrey[900],
        mainColor: "#0047AB",
        secondary: colors.blueGrey[600],

        NotificationColor: "green",
        SideBar: "#fff",
        token: "#44484E",
        Steper: "#1D2D3F",
        stperContent: "#0b0b0bba",
        nofiction: "#00000080",
        BannerText: "#1D2D3F",

        // primary: "#fff",
        // mainColor: "#fff",
        // secondary: "#F8FBFF",
        // NotificationColor: "#fff",
        // SideBar: "#fff",
        // token: "#fff",
        // Steper: "#fff",
        // stperContent: "#fff",
        // nofiction: "#fff",
        // BannerText: "#f5f5ff5",
      },
    },
    shadows: softShadows,
  },
  {
    name: "DARK",
    overrides: {
      // MuiOutlinedInput: {
      //   root: {
      //     background: "#0c1012",
      //   },
    },
    MuiInputBase: {
      root: {
        color: "#fff !important",
      },
      input: {
        color: "#fff !important",
      },
    },
    // MuiTableRow: {
    //   root: {
    //     borderTop: "1px solid rgb(13 116 201 / 28%) !important",
    //   },
    // },

    MuiTypography: {
      subtitle2: {
        color: "#fff",
      },
    },
    // MuiPaper: {
    //   root: {
    //     // backgroundColor: "#302F35",
    //     background: "#1c1d1f !important",

    //     color: "#fff !important",
    //   },
    // },
    MuiTableCell: {
      body: {
        color: "#fff",
      },
    },
    MuiOutlinedInput: {
      root: {
        "& ::-webkit-input-placeholder": {
          color: "#fff !important",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #fff",
          borderColor: "#fff",
        },
      },
      notchedOutline: {
        // border: "1px solid #ececec",
        // borderColor: "#ececec",
      },
      adornedEnd: {
        paddingRight: "6px",
      },
      input: {
        "& ::-webkit-autofill": {
          WebkitBoxShadow: "none !important",
        },
      },
    },

    palette: {
      type: "dark",
      action: {
        active: "rgba(255, 255, 255, 0.54)",
        hover: "rgba(255, 255, 255, 0.04)",
        selected: "rgba(255, 255, 255, 0.08)",
        disabled: "rgba(255, 255, 255, 0.26)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        focus: "rgba(255, 255, 255, 0.12)",
      },
      background: {
        default: "#282C34",
        dark: "#000",
        virtual: "#0c1012",
        taf: "#0c1012",
        paper: "#282C34",
        chatBox: "#1a1a1a",
        back: "#18293b",
        cardstyle: "#40474f",
        About: "#0c1012",
        stakeing: "#0c1012",
        dashLayout: "#0c1012",
        Notification: "#373737",
        login: "#343434",
        CardP2P: "#151414",
        reward: "#201e1e",
      },
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#1f73b7",
      },
      warning: {
        main: "#BC211D",
      },
      error: {
        main: "#B33A3A",
      },
      text: {
        // primary: "#000000",
        // mainColor: "#1069c2",
        // secondary: "#F8FBFF",
        // NotificationColor: "#fff",
        // SideBar: "#fff",
        // token: "#fff",
        // Steper: "#fff",
        // stperContent: "#fff",
        // nofiction: "#fff",
        // BannerText: "#000000",
        primary: "#fff",
        mainColor: "#fff",
        secondary: "#F8FBFF",
        NotificationColor: "#fff",
        SideBar: "#fff",
        token: "#fff",
        Steper: "#fff",
        stperContent: "#fff",
        nofiction: "#fff",
        BannerText: "#f5f5ff5",
      },
    },
    shadows: strongShadows,
  },
];

export const createnewTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  let theme = createTheme(
    _.merge({}, baseOptions, themeOptions, { direction: config.direction })
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
