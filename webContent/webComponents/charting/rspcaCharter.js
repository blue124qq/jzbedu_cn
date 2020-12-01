/*
 * RSPCA Specific charting functions (requires Chart.js to be included on page)
 * 
 */

(function(){

	var root = this,
		previous = root.RspcaCharter;

	// Create the RspcaCharter Object
	var RspcaCharter = function(){

		// Define Object scope variables
		this.mainChart = null;
		this.subChartInfo = [];
		this.mainChartSelector = "";
		this.subChartSelector = "";
		this.selectedSubChartId = 0;

		// Create a set of doughnut charts using selectors for subCharts and a totals chart
		this.createMultiDoughnutChart = function(mainChartSelector, subChartSelector) {
			this.mainChartSelector = mainChartSelector;
			this.subChartSelector = subChartSelector;

			this.initMultiDoughnutChart();
			var that = this;

			// setup sub chart click functionality for updating main chart highlighting
			$(this.subChartSelector).on('click', function(event) {
				that.subMultiDoughnutChartClicked($(event.currentTarget).data("childId"));
			})
		}

		// Setup and display initial charts for multiple doughnuts
		this.initMultiDoughnutChart = function() {
			var subCharts = $(this.subChartSelector);
			var mainChart = $(this.mainChartSelector);
			var mainChartBackgroundColor = mainChart.css("background-color");

			// Loop through each element found by the selector, element must have a canvas child
			if (subCharts.length > 0) {
				// subChart Variables
				var startPos = 0;
				var origStart = 0;
				// mainChart Variables
				var highlightedColors = [];
				var allColors = [];
				var percentageData = [];

				for (var i = 0; i < subCharts.length; i++) {
					// create variables required to display the doughnut chart
					// also store colours and percentages for the main chart
					var pct = $(subCharts[i]).data("percentage");
					var color = $(subCharts[i]).css("color");
					var backgroundColor = $(subCharts[i]).css("background-color");
					if (startPos == 0) {
						startPos = (-0.5 * Math.PI) - ((pct + (100 - pct) / 2) / 100 * Math.PI * 2);
						origStart = startPos;
						highlightedColors.push(color);
					} else {
						highlightedColors.push(mainChartBackgroundColor);
					}
					allColors.push(color);
					percentageData.push(pct);

					// Need to display different rings to show highlighted arcs of the doughnut
					var outerRing = {
						data: [pct, (100 - pct)],
						backgroundColor: [color, backgroundColor],
						borderColor: [color, backgroundColor],
						borderWidth: 1
					}

					var innerRing =  {
						data: [pct, (100 - pct)],
						backgroundColor: [color, "#AAAAAA"],
						borderColor: [color, "#AAAAAA"],
						borderWidth: 1
					}

					this.subChartInfo.push({
						color: color,
						pct: pct
					})

					// create the doughnut chart for this child's canvas
					var ctx = $(subCharts[i]).children("canvas");
					var chart = new Chart(ctx, {
						type: 'doughnut',
						data: {
							datasets: [
								JSON.parse(JSON.stringify(outerRing)),
								JSON.parse(JSON.stringify(outerRing)),
								JSON.parse(JSON.stringify(innerRing)),
								JSON.parse(JSON.stringify(outerRing)),
								JSON.parse(JSON.stringify(outerRing))
							],
						},
						options: {
							cutoutPercentage: 90,
							tooltips: false,
							maintainAspectRatio: false,
							rotation: startPos,
							events: [],
							animation: false
						}
					});

					// ensure next start position is setup for next chart
					startPos += pct / 100 * Math.PI * 2;
				}

				// rings for the main chart just need the previously stored info from sub charts
				var mainOuterRing = {
					data: percentageData,
					backgroundColor: highlightedColors,
					borderColor: highlightedColors,
					borderWidth: 1
				}
				var mainInnerRing = {
					data: percentageData,
					backgroundColor: allColors,
					borderColor: allColors,
					borderWidth: 1
				}

				// create main chart (main chart selector should be canvas)
				var mainCtx = $(this.mainChartSelector);
				this.mainChart = new Chart(mainCtx,
				{
					type: 'doughnut',
					data: {
						datasets: [
							JSON.parse(JSON.stringify(mainOuterRing)),
							JSON.parse(JSON.stringify(mainInnerRing)),
							JSON.parse(JSON.stringify(mainInnerRing)),
							JSON.parse(JSON.stringify(mainInnerRing)),
							JSON.parse(JSON.stringify(mainInnerRing)),
							JSON.parse(JSON.stringify(mainOuterRing))
						]
					},
					options: {
						cutoutPercentage: 60,
						tooltips: false,
						maintainAspectRatio: false,
						rotation: origStart,
						events: [],
						animation: {
							duration: 500,
							easing: 'easeOutQuart',
							animateRotate: false,
							animateScale: true
						}
					}
				});
			}
		}

		// Update the main chart to highlight the sub chart clicked 
		this.subMultiDoughnutChartClicked = function(subChartId) {
			var percentageData = [];
			var highlightedColors = [];
			var allColors = [];
			var mainChart = $(this.mainChartSelector);
			var mainChartBackgroundColor = mainChart.css("background-color");

			// do as we did for setup but a bit less (only if new sub chart selected)
			if (this.selectedSubChartId !== subChartId) {
				// get percentage and colour info
				for (var i = 0; i < this.subChartInfo.length; i++) {
					percentageData.push(this.subChartInfo[i].pct);
					allColors.push(this.subChartInfo[i].color);
					if (subChartId == i) {
						highlightedColors.push(this.subChartInfo[i].color);
					} else {
						highlightedColors.push(mainChartBackgroundColor);
					}
				}

				var mainOuterRing = {
					data: percentageData,
					backgroundColor: highlightedColors,
					borderColor: highlightedColors,
					borderWidth: 1
				}

				var mainInnerRing = {
					data: percentageData,
					backgroundColor: allColors,
					borderColor: allColors,
					borderWidth: 1
				}

				// update the main chart with the new data
				this.mainChart.data.datasets = [
					JSON.parse(JSON.stringify(mainOuterRing)),
					JSON.parse(JSON.stringify(mainInnerRing)),
					JSON.parse(JSON.stringify(mainInnerRing)),
					JSON.parse(JSON.stringify(mainInnerRing)),
					JSON.parse(JSON.stringify(mainInnerRing)),
					JSON.parse(JSON.stringify(mainOuterRing))
				];
				this.mainChart.update();
				this.selectedSubChartId = subChartId;
			}
		}

		return this;
	}

	// Define as amd module if we are using amd
	var helpers = RspcaCharter.helpers = {};
	var amd = helpers.amd = (typeof define == 'function' && define.amd)

	if (amd) {
		define(function(){
			return RspcaCharter;
		});
	} else if (typeof module === 'object' && module.exports) {
		module.exports = RspcaCharter;
	}

	// Create the root object for RSPCA charting functions
	root.RspcaCharter = RspcaCharter;

	RspcaCharter.noConflict = function(){
		root.RspcaCharter = previous;
		return RspcaCharter;
	};

}).call(this);