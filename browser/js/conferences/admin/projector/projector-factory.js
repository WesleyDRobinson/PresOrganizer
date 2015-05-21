app.factory('ProjectorModeFactory', function() {
	function timelineFlat(timeline) {
		var flattenedTimeline = [];


		for (var i = 0; i < timeline.length; i++) {
			if (!timeline[i].presentation) {
				timeline[i].itemStart = true;
				flattenedTimeline.push(timeline[i].title);
			}
			else {
				timeline[i].presentation.media[0].itemStart = true;
				flattenedTimeline = flattenedTimeline.concat(timeline[i].presentation.media);
			}
		}
		console.log("timeline", timeline);
		console.log("flattened", flattenedTimeline);

		return flattenedTimeline;
	}


	return {
		timelineFlat: timelineFlat
	};
});