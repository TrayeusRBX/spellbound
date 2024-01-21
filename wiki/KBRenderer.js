/*
References:
- https://stackoverflow.com/questions/20772417/how-to-loop-through-json-array-in-jquery
- https://stackoverflow.com/questions/19491336/how-to-get-url-parameter-using-jquery-or-plain-javascript
- https://stackoverflow.com/questions/22607150/getting-the-url-parameters-inside-the-html-page
- https://api.jquery.com/appendTo/
- https://stackoverflow.com/questions/15581059/how-to-add-text-to-an-existing-div-with-jquery
- https://stackoverflow.com/questions/1784780/how-to-break-out-of-jquery-each-loop
*/
$(document).ready(function(){
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
    KBNumber = KBNumber.toString(); // Convert to String
    $.getJSON('https://spellbound.slothstudiorbx.com/resources/wikidata.json', function(data) {
          $.each(data, function(KBInd, KBData) {
            KBInd = KBInd.toString(); // Convert to String
            if (KBNumber == KBInd) {

                // Set Page Title (Browser Tab)
                var pageTitle = KBInd + ": " + KBData.Name
                $(document).attr("title", pageTitle);

                // KB WikiNav
                var wikinav = `
                <ol class="breadcrumb breadcrumb-chevron p-3 bg-body-tertiary rounded-3">
                <li class="breadcrumb-item">
                  <a class="link-body-emphasis" href="https://spellbound.slothstudiorbx.com">
                    <svg class="bi" width="16" height="16"><use xlink:href="#house-door-fill"></use></svg>
                    <span class="visually-hidden">Home</span>
                  </a>
                </li>
                <li class="breadcrumb-item">
                  <a class="link-body-emphasis fw-semibold text-decoration-none" href="https://spellbound.slothstudiorbx.com/wiki.html">Wiki</a>
                </li>
                <li class="breadcrumb-item">
                    <a class="link-body-emphasis fw-semibold text-decoration-none" href="https://spellbound.slothstudiorbx.com/wiki.html?Category=` + KBData.Category + `">` + KBData.Category + `</a>
                  </li>
                <li class="breadcrumb-item active" aria-current="page">
                ` + KBData.Name + `
                </li>
              </ol>
              `;
              wikinav = wikinav.toString();
              $(wikinav).appendTo('#wikinav');

              // Get KB contents
              var KBFilePath = "KBs/" + KBData.WikiFileName;
              KBFilePath = KBFilePath.toString();

              var FullKBFilePath = "https://spellbound.slothstudiorbx.com/wiki/KBs/" + WikiFileName;
              var KBContent = "<p>No KB Data Found.</p>";

              $.get(FullKBFilePath, function(KBFileData) {
                KBContent = KBFileData;
              });
              // Get KB Title
              var KBTitle = "<h1>" + KBData.Name + "</h1>"
              KBTitle = KBTitle.toString();
              
              // Get KB Footer
              var KBFooter = "<p>Author: " + KBData.Author + "</p>"
              KBFooter = KBFooter.toString();


              // Render KB Page
              $('#wikicontent').html(KBTitle + KBContent + KBFooter);

      
              return false; // Break loop to end loading. 
            }
              
          //    var tblRow = "<tr>" + "<td>" + f.firstName + "</td>" +
          //     "<td>" + f.lastName + "</td>" + "<td>" + f.job + "</td>" + "<td>" + f.roll + "</td>" + "</tr>"
          //     $(tblRow).appendTo("#userdata tbody");
        });
      });
  } else {
      location = "https://spellbound.slothstudiorbx.com/wiki/kbnotfound.html";
  }
});