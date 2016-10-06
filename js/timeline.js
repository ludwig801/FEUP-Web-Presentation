$(document).ready(function () {
    PlaceTimespans();
});

function PlaceTimespans() {
    var $timeline = $("timeline");
    $timeline.addClass("graphic");
    
    var mBegin = parseInt($timeline.attr("begin"));
    var mEnd = parseInt($timeline.attr("end"));
    var entries = $timeline.find("timeline-entry");

    $(entries).each(function (index, element) {
        var $entry = $(element);

        $entry.on("click", function() {
            $entry.toggleClass("click");
        });

        $entry.on("mouseover", function () {
            $entry.addClass("hover");
            $entry.addClass("click");
        });

        $entry.on("mouseleave", function () {
            $entry.removeClass("hover");
            $entry.removeClass("click");
        });

        PlaceTimespan($entry, mBegin, mEnd);
        PlaceDescription($entry);
    });
}

function PlaceTimespan($entry, mBegin, mEnd) {
    var timespan = ParseTimespan($entry, mBegin, mEnd);

    if (!timespan.valid)
        return;

    var $timespanElem = $($entry.find(".timespan"));
    $timespanElem.addClass("graphic");
    $timespanElem.css("margin-left", timespan.beginPerc + "%");
    $timespanElem.css("margin-right", (100 - timespan.endPerc) + "%");
    $timespanElem.html("");

    AddTimespanTags($timespanElem, timespan.begin, timespan.end);
}

function ParseTimespan($entry, mBegin, mEnd) {
    var timespan = {};
    timespan.valid = true;

    var beginStr = $entry.attr("begin");
    var endStr = $entry.attr("end");

    if (beginStr == undefined || beginStr.length == 0) {
        console.error("Timelapse: begin is undefined.");
        timespan.valid = false;
    } else {
        timespan.begin = parseInt(beginStr);
        timespan.beginPerc = (timespan.begin - mBegin) / (mEnd - mBegin) * 100;

        if (endStr == undefined || endStr.length == 0) {
            console.log("Timelapse: end is undefined.");
            timespan.end = timespan.begin;
        } else {
            timespan.end = parseInt(endStr);
        }

        timespan.endPerc = Math.min(100, (timespan.end + 0.5 - mBegin) / (mEnd - mBegin) * 100);
    }

    timespan.delta = (timespan.begin - timespan.end);

    return timespan;
}

function PlaceDescription($entry) {
    var $description = $($entry.find(".description"));
    $description.addClass("graphic");
}

function AddTimespanTags($timespan, begin, end) {
    var $tagLeft = $(document.createElement("span"));
    $tagLeft.attr("class", "tag tag-left");
    $tagLeft.html(begin);

    $timespan.append($tagLeft);

    if (end == begin)
        return;

    var $tagRight = $(document.createElement("span"));
    $tagRight.attr("class", "tag tag-right");
    $tagRight.html(end);

    $timespan.append($tagRight);
}