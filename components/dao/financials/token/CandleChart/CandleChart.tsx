import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  elderRay,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
} from "react-financial-charts";
import { initialData } from "./data";
import { Box } from "@mui/material";
import { deviceStruct } from "@components/utilities/Style";
import { IThemeContext, ThemeContext } from "@lib/ThemeContext";
import { LightTheme } from "@theme/theme";

const CandleChart: React.FC = () => {
  const ScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d: any) => new Date(d.date)
    );
  const height = screen.width <= 900 ? 350 : 500;
  const width = screen.width <= 600 ? 365 : screen.width <= 1200 ? 650 : screen.width <= 1350 ? 900 : screen.width <= 1900 ? 1200 : 1400;
  const margin = { left: 0, right: 48, top: 50, bottom: 24 };


  const { data, xScale, xAccessor, displayXAccessor } =
    ScaleProvider(initialData);
  const pricesDisplayFormat = format(".2f");
  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;

  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_: any, h: number) => [
    0,
    h - barChartHeight,
  ];
  const chartHeight = gridHeight;
  const yExtents = (data: any) => {
    return [data.high, data.low];
  };

  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const barChartExtents = (data: any) => {
    return data.volume;
  };

  const candleChartExtents = (data: any) => {
    return [data.high, data.low];
  };

  const yEdgeIndicator = (data: any) => {
    return data.close;
  };

  const volumeColor = (data: any) => {
    return data.close > data.open
      ? "rgba(38, 166, 154, 0.3)"
      : "rgba(239, 83, 80, 0.3)";
  };

  const volumeSeries = (data: any) => {
    return data.volume;
  };
  const themeContext = React.useContext<IThemeContext>(ThemeContext)

  const axisStyles = {
    strokeStyle: themeContext.theme === LightTheme ? "rgba(56, 62, 85, 0.22)" : "rgba(56, 62, 85, 0.5)", // Color.GRAY
    strokeWidth: 1,
    tickLabelFill: "#9EAAC7", // Color.LIGHT_GRAY
    tickStrokeStyle: "#383E55",
    gridLinesStrokeStyle: themeContext.theme === LightTheme ? "rgba(56, 62, 85, 0.22)" : "rgba(56, 62, 85, 0.5)" // Color.GRAY w Opacity
  };


  const openCloseColor = (d: any) => (d.close > d.open ? "#26a69a" : "#ef5350");
  const crossHairStyles = {
    strokeStyle: "#9EAAC7"
  };
  return (
    <Box sx={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ChartCanvas
        height={height}
        ratio={3}
        width={width}
        margin={margin}
        
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart
          id={2}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={barChartExtents}
        >
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>
        <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
          <XAxis showGridLines {...axisStyles} tickLabelFill={themeContext.theme === LightTheme ? '#333333' : 'white'}/>
          <YAxis showGridLines {...axisStyles} tickFormat={pricesDisplayFormat}  tickLabelFill={themeContext.theme === LightTheme ? '#333333' : 'white'}/>
          <CandlestickSeries />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={pricesDisplayFormat}
          />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={openCloseColor}
            lineStroke={openCloseColor}
            displayFormat={pricesDisplayFormat}
            yAccessor={yEdgeIndicator}
          />

          <OHLCTooltip origin={[0, -16]} fontSize={screen.width <= 900 ? 15 : 20} textFill={openCloseColor} labelFill="grey"/>
        </Chart>
        <CrossHairCursor {...crossHairStyles}/>
      </ChartCanvas>
    </Box>
  );
};

export default CandleChart;