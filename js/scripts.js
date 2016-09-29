$(document).ready(function () {
    FillInAge();
    CollapseBehavior();
});

function FillInAge() {
    var lang = $($("html")[0]).attr("lang");
    var yearOfBirth = parseInt($($("#year_of_birth")[0]).html());
    var currentYear = new Date().getFullYear();
    var age = currentYear - yearOfBirth;
    var ageElem = $($("#age")[0]);

    if (lang == "en") {
        ageElem.html("(" + age + " years old)");
    }
    else if (lang == "pt") {
        ageElem.html("(" + age + " anos)");
    }
}

var animDuration = 200;

function CollapseBehavior() {
    var content = $(".content");
    var collapsables = content.find(".collapsable");

    console.log(collapsables);

    $(collapsables).each(function(index, item) {
        var jQueryItem = $(item);

        var toggle = $(jQueryItem.find(".collapse-toggle"));
        var target = $(jQueryItem.find(".collapse-target"));
        
        toggle.removeClass("visible");
        toggle.addClass("");
        target.hide();
        
        toggle.on("click", function() {
            if(toggle.hasClass("visible")) {
                target.hide(animDuration);
            }
            else {
                target.show(animDuration);
            }
            toggle.toggleClass("visible");
        });
    });
}