// Function: Get Website Parameters
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

// Check if KB Paramter is Blank or Valid
var KBNumber = getUrlParameter('KB');

if (KBNumber != undefined && KBNumber != null) {
    $.getJSON('../resources/wikidata.json', function(data) {
        $.each(data, function(KBInd, KBData) {

            var wikinav = `
            <ol class="breadcrumb breadcrumb-chevron p-3 bg-body-tertiary rounded-3">
            <li class="breadcrumb-item">
              <a class="link-body-emphasis" href="https://spellbound.slothstudiorbx.com/index.html">
                <svg class="bi" width="16" height="16"><use xlink:href="#house-door-fill"></use></svg>
                <span class="visually-hidden">Home</span>
              </a>
            </li>
            <li class="breadcrumb-item">
              <a class="link-body-emphasis fw-semibold text-decoration-none" href="https://spellbound.slothstudiorbx.com/wiki.html">Wiki</a>
            </li>
            <li class="breadcrumb-item">
                <a class="link-body-emphasis fw-semibold text-decoration-none" href="#">` + KBData.Category + `</a>
              </li>
            <li class="breadcrumb-item active" aria-current="page">
            New Player Basics
            </li>
          </ol>
          `;
            var KBFilePath = "KBs/" + KBData.WIKIFileName;
    
            // Render KB
            $('#wikinav').appendTo(wikinav);
            $('#wikicontent').load(KBFilePath);

            
            return false; // Break loop to end loading. 
            
        //    var tblRow = "<tr>" + "<td>" + f.firstName + "</td>" +
        //     "<td>" + f.lastName + "</td>" + "<td>" + f.job + "</td>" + "<td>" + f.roll + "</td>" + "</tr>"
        //     $(tblRow).appendTo("#userdata tbody");
      });
    });
} else {
    location = "kbnotfound.html";
}