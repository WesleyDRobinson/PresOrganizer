app.factory('ProjectorModeFactory', function() {
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
		timelineFlat: timelineFlat
	};
});