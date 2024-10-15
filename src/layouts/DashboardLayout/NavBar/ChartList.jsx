import { Box } from "@material-ui/core";
import React, { useEffect, useRef } from "react";

export default function ChartList() {
  const myRef = useRef();
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = false;
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      dateRange: "12M",
      showChart: true,
      locale: "in",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: "100%",
      height: "273",
      plotLineColorGrowing: "rgb(233 200 86)",
      plotLineColorFalling: "rgb(233 200 86)",
      gridLineColor: "rgba(240, 243, 250, 0)",
      scaleFontColor: "rgba(120, 123, 134, 1)",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      tabs: [
        {
          title: "Indices",
          symbols: [
            {
              s: "BINANCE:BTCUSDT",
            },
          ],
          originalTitle: "Indices",
        },
      ],
    });
    myRef.current.appendChild(script);
  }, []);

  return (
    <Box className="mainsecChart">
      <div className="tradingview-widget-container" ref={myRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </Box>
  );
}
