(function(Observer) {
// {
//     _name:f "Default",
//     target: {
//         backgroundColor: "transparent"
//     },
//     legend: {
//         textColor: null,
//         fontFamily: null,
//         fontSize: null,
//         border: null,
//         background: null
//     },
//     title: {
//         textColor: "rgb(102, 102, 102)",
//         fontFamily: "'Trebuchet MS',Arial,Helvetica,sans-serif",
//         fontSize: "19.2px",
//         textAlign: "center"
//     },
//     seriesStyles: {},
//     series: [{
//         color: "#4bb2c5",
//         lineWidth: 2.5,
//         shadow: true,
//         fillColor: "#4bb2c5",
//         showMarker: true,
//         markerOptions: {
//             color: "#4bb2c5",
//             show: true,
//             style: 'filledCircle',
//             lineWidth: 1.5,
//             size: 4,
//             shadow: true
//         }
//     }],
//     grid: {
//         drawGridlines: true,
//         gridLineColor: "#cccccc",
//         gridLineWidth: 1,
//         backgroundColor: "#fffdf6",
//         borderColor: "#999999",
//         borderWidth: 2,
//         shadow: true
//     },
//     axesStyles: {
//         label: {},
//         ticks: {}
//     },
//     axes: {
//         xaxis: {
//             borderColor: "#999999",
//             borderWidth: 2,
//             ticks: {
//                 show: true,
//                 showGridline: true,
//                 showLabel: true,
//                 showMark: true,
//                 size: 4,
//                 textColor: "",
//                 whiteSpace: "nowrap",
//                 fontSize: "12px",
//                 fontFamily: "'Trebuchet MS',Arial,Helvetica,sans-serif"
//             },
//             label: {
//                 textColor: "rgb(102, 102, 102)",
//                 whiteSpace: "normal",
//                 fontSize: "14.6667px",
//                 fontFamily: "'Trebuchet MS',Arial,Helvetica,sans-serif",
//                 fontWeight: "400"
//             }
//         },
//         yaxis: {
//             borderColor: "#999999",
//             borderWidth: 2,
//             ticks: {
//                 show: true,
//                 showGridline: true,
//                 showLabel: true,
//                 showMark: true,
//                 size: 4,
//                 textColor: "",
//                 whiteSpace: "nowrap",
//                 fontSize: "12px",
//                 fontFamily: "'Trebuchet MS',Arial,Helvetica,sans-serif"
//             },
//             label: {
//                 textColor: null,
//                 whiteSpace: null,
//                 fontSize: null,
//                 fontFamily: null,
//                 fontWeight: null
//             }
//         },

	var defaultStyles = {
		shadow: false
	};

	Observer.jqplotTheme = {
		series: [
			defaultStyles,
			defaultStyles,
			defaultStyles,
			defaultStyles
		],
		legend: {
			show: true
		},
		grid: {
			backgroundColor: 'transparent',
			drawGridlines: false, // wether to draw lines across the grid or not.
			drawBorder: false,
			borderColor: '#eee',
			gridLineColor: '#eee',
			shadow: false,
			borderWidth: 1.0           // pixel width of border around grid.
			// shadow: true,               // draw a shadow for grid.
			// shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
			// shadowOffset: 1.5,          // offset from the line of the shadow.
			// shadowWidth: 3,             // width of the stroke for the shadow.
			// shadowDepth: 3,             // Number of strokes to make when drawing shadow.
			//                             // Each stroke offset by shadowOffset from the last.
			// shadowAlpha: 0.07           // Opacity of the shadow
			// renderer: $.jqplot.CanvasGridRenderer,  // renderer to use to draw the grid.
			// rendererOptions: {}         // options to pass to the renderer.  Note, the default
										// CanvasGridRenderer takes no additional options.
		}
	};
}(Observer));
