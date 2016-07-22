
    var number = document.getElementById("transition-time");
    number.onkeydown = function(e) {
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8)) {
        return false;
    }
  }


    function init() {
      console.log('Ok');
    }

    var clientId = "1066350731358-qigha2k259l6ak2rah9bif37c4pn1480.apps.googleusercontent.com"
    var appId = "1066350731358";
    var scopes = 'https://www.googleapis.com/auth/drive.readonly';

    function getUrls() {
    gapi.auth.authorize({'client_id':clientId, 'scope':scopes, 'immediate': true},handleAuthResult);
  }

  function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      oauthToken = authResult.access_token;
      loadApi();
      //console.log(authResult);
    }
    else {
      console.log('call');
      askForAuth();
    }
  }

  function askForAuth() {
    gapi.auth.authorize({'client_id':clientId, 'scope':scopes, 'immediate':false},handleAuthResult);
  }

  function loadApi() {
    gapi.load("picker",{"callback":createPicker});
  }

  function createPicker() {
/*
	  //////////////////////////////////////////////////////////////////////

		var parser = document.createElement("a"),
              origin,
              picker;

            if (document.referrer) {
              if (document.location.hostname === "localhost") {
                // Component is within an iframe, but likely within a widget settings tested locally (localhost:8000)
                origin = $window.location.protocol + "//" + $window.location.host;
              } else {
                // Component is within an iframe
                parser.href = document.referrer;
                origin = parser.protocol + "//" + parser.hostname;
              }
            } else {
              // Component is not within an iframe, likely testing locally in this repo (localhost:8099)
              origin = $window.location.protocol + "//" + $window.location.host;
            }

	  //////////////////////////////////////////////////////////////////////

*/


    var docsView = new google.picker.DocsView()
      .setIncludeFolders(true)
      .setMimeTypes('application/vnd.google-apps.folder')
      .setSelectFolderEnabled(true);

    var picker = new google.picker.PickerBuilder();
	  //picker.setOrigin(origin)
    picker.addView(docsView)
    .setOAuthToken(oauthToken)
    .setCallback(pickerCallback)
    .build()
    .setVisible(true);
  }

  function pickerCallback(data) {
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
      var doc = data[google.picker.Response.DOCUMENTS][0];
      id = doc[google.picker.Document.ID];
      //console.log(id);
      loadDriveApi();
    }
  }

  function loadDriveApi() {
    gapi.client.load("drive","v2").then(makeRequest);
  }

  function makeRequest() {
    var request1 = gapi.client.drive.files.get({
      "fileId":id,
      "fields": "shared,title"
    });
    var request2 = gapi.client.drive.children.list({
      "folderId":id,
      "orderBy":"createdDate",
      "q": "mimeType = 'image/jpeg' or mimeType = 'image/png'"
    });
    request1.then(function(response) {
      title = response.result.title;
      //console.log(title);
      $("#well-resp").attr("hidden","false").slideToggle("fast",function() {
        $("#well-resp").attr("hidden","false").slideDown("fast",function() {
          if (response.result.shared == true) {
            $("#notice").css('background-color','#d6f5d6');
            $("#title").css('color','green').text("Selected Folder : "+title).hide().fadeIn("slow");
          }
          else {
            $("#notice").css('background-color','#ffcccc');
            $("#title").css('color','red').text("Selected folder not shared publicly. Change sharing settings of folder to public.").hide().fadeIn("slow");
          }
        });
      });


    },function(reason) {
      alert("Error");
    });
    request2.then(function(response) {
      var items = response.result.items;
      //console.log(items);
      processResult(items);
    },function(reason) {
      alert("Error");
    });
  }



    function processResult(items) {
      var itemsLength = items.length;
      var staticImgUrl = "https://drive.google.com/uc?export=view&id=";
      var arrayOfUrls = [];
      for (var i=0;i<itemsLength;i++) {
        //console.log(items[i].id);
        var url = staticImgUrl + items[i].id;
        arrayOfUrls.push(url);
      }
      //console.log(arrayOfUrls);
      change(arrayOfUrls);
    }



  function change(arrayOfUrls) {
    var appElement = document.querySelector('#outer');
    var $scope = angular.element(appElement).scope();
    $scope = $scope.$$childHead; // add this and it will work
    $scope.$apply(function() {
        $scope.$parent.settings.additionalParams.arrayOfUrls = arrayOfUrls;
    });
  }
