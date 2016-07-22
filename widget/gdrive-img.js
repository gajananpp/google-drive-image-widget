/* global gadgets:false */
var id,rsW,rsH;

var RiseVision = RiseVision || {};
RiseVision.GoogleDriveImage = {};

RiseVision.GoogleDriveImage = (function(gadgets) {
  "use strict";

  var prefs = new gadgets.Prefs();
  // rsW = new gadgets.Prefs().getInt("rsW");
  id = prefs.getString("id"),
  rsW = prefs.getInt("rsW"),
  rsH = prefs.getInt("rsH");
  //console.log(id,rsW,rsH);


  /*
   *  Private Methods
   */

  function ready() {
    gadgets.rpc.call("", "rsevent_ready", null, prefs.getString("id"), true,
      true, true, true, true);
  }

  /*
   *  Public Methods
   */

  function getAdditionalParams(name, value) {
    if (name === "additionalParams" && value) {
	  //This is where the settings data is parsed, and made ready to use.
      var params = JSON.parse(value);
      //What we initially stored as "settings.additionalParams.message" becomes "params.message" by way of voodoo.
      var arrayOfUrls = params.arrayOfUrls;
      var delay = params.delay;
      var showControls = params.showControls;
      var selection = params.selection;

      insertDomElements(arrayOfUrls,delay,showControls,selection);

    }

    ready();
  }

  return {
    getAdditionalParams: getAdditionalParams
  };
})(gadgets);


function insertDomElements(arrayOfUrls,delay,showControls,selection) {
  // var cont = document.getElementById("img-container").innerHTML;
  for (var i=0; i<arrayOfUrls.length; i++) {
    $('#img-container').append("<img src="+arrayOfUrls[i]+">");
  }
  startTransition(delay,showControls,selection);
}

function startTransition(delay,showControls,selection) {
  $(function() {
    window.startTrans = new flux.slider("#img-container",{
      autoplay: true,
      pagination: false,
      controls: showControls,
      //width: rsW,
      //height: rsH,
      delay: delay*1000 || 4000,
      transitions: selection
    });
  });
}
