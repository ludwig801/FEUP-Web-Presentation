$(document).ready(function () {
    FillInAge();
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