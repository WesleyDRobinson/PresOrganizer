app.factory('ProjectorModeFactory', function() {
	function timelineFlat(timeline) {
		console.log(timeline);
		var flattenedTimeline = [];
		var itemNumber = 1;

		for (var i = 0; i < timeline.length; i++) {
			if (!timeline[i].presentation) {
				timeline[i].itemStart = true;
				timeline[i].itemNumber = itemNumber;
				flattenedTimeline.push(timeline[i]);
			}
			else {
				timeline[i].presentation.media[0].itemStart = true;
				timeline[i].presentation.media[0].itemNumber = itemNumber;
				flattenedTimeline = flattenedTimeline.concat(timeline[i].presentation.media);
			}

			itemNumber++;
		}
		
		//console.log("timeline", timeline);
		//console.log("flattened", flattenedTimeline);

		return flattenedTimeline;
	}


	return {
		timelineFlat: timelineFlat
	};
});