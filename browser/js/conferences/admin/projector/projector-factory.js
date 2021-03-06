app.factory('ProjectorModeFactory', function () {
    function timelineFlat(timeline) {
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

        return flattenedTimeline;
    }

    return {
        timelineFlat: timelineFlat
    };
});