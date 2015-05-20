app.factory('ProjectorModeFactory', function() {
	function timeline() {
		return [timelineItem1, pauseItem, timelineItem2 ];
	}

	function timelineFlat(timeline) {
		var flattenedTimeline = [];


		for (var i = 0; i < timeline.length; i++) {
			if (!timeline[i].presentation) {
				flattenedTimeline.push(timeline[i].title);
			}
			else {
				flattenedTimeline = flattenedTimeline.concat(timeline[i].presentation.media);
			}
		} 

		return flattenedTimeline;
	}


	return {
		timeline: timeline,
		timelineFlat: timelineFlat
	};
});