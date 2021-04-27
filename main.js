function onGetAllCountries() {
    $.get("https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag;borders").then(
        function (data, status) {
            displayCountries(data);
        }
    ).catch(() => handleError("Failed to retrieve countries from server"));
}

function onSearchByName() {
    let countryName = $("#searchInput").val();

    if (countryName != "") {
        $.get("https://restcountries.eu/rest/v2/name/" + countryName +
            "?fields=name;topLevelDomain;capital;currencies;flag;borders").then(
                function (data, status) {
                    displayCountries(data);
                }
            ).catch(() => handleError("No countries were found"));
    }
    else {
        // Notify user he has to fill the input field in order to search
        $("#searchInput").focus();
        $("#reminder").css("display", "inline-block").fadeOut(4000);
    }

    // Clear last search input
    $("#searchInput").val("");
}

function displayCountries(countries) {
    let displaySection = $("#coutriesDisplay").empty();

    countries.forEach(country => {
        let countryCard = createCountryCard(country);
        displaySection.append(countryCard);
    })
}

function createCountryCard(country) {
    let countryCard = $("<div>").addClass("country-card");

    // Create flag picture
    let flag = $("<div>").addClass("flag");
    let flagImage = $("<img>").attr("src", country.flag);
    flag.append(flagImage);

    // Country details
    let details = $("<div>");
    let name = $("<h4>").addClass("title text-center");
    name.html(country.name);
    let info = $("<p>").addClass("details");
    info.html("Capital: " + country.capital + "<br>" +
        "Top Level Domain: " + country.topLevelDomain + "<br>" +
        "Borders: " + country.borders.join(",") + "<br>" +
        "Currencies: ");

    // Create a list of the country's currenices
    let currencyList = $("<ul>");
    country.currencies.forEach(currency => {
        let currentCurrency = $("<li>");
        currentCurrency.html(currency.code + " " + currency.name + " " + currency.symbol);
        currencyList.append(currentCurrency);
    });

    info.append(currencyList);
    details.append(name, info);
    countryCard.append(flag, details);

    return countryCard;
}

function handleError(message) {
    console.error(message);
    $("#coutriesDisplay").empty();
    alert(message);
}