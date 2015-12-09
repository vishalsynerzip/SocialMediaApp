angular.module('SMT').controller('cloudCtrl', ['$scope','CloudService','$sce', '$window',
function ($scope,cloudService,$sce, $window, $analytics) {

  $scope.GoogleFiles = [];
  $scope.DropBoxFiles = [];
  $scope.OneDriveFiles = [];
  $scope.BoxFiles = [];

  $scope.dropSuccessHandler = function($event, index, array) {
    // array.splice(index, 1);
  };

  $scope.onDrop = function($event, $data, array, index) {
    if (index !== undefined) {
      array.splice(index, 0, $data);
    } else {
          array.push($data);
    }
  };

  $scope.fileOpen = function(file) {
    $window.open(file.link, 'width=500,height=400');
  };

  //////// Google Drive /////////////////////////////////////////////////////
  $scope.loginGoogleOK = false;
  $scope.loginDropBoxOK = false;
  $scope.loginOneDriveOK = false;
  $scope.loginBoxOK = false;

  $scope.currentFileUrl='';
  $scope.Show=function(control)
  {
    // alert("hi"+id.currentTarget.id);
    $scope.currentFileUrl = $sce.trustAsResourceUrl(control.currentTarget.id);
    // $scope.currentDropboxFileUrl = $sce.trustAsResourceUrl(control.currentTarget.id);
    $scope.$apply();
  }

  $scope.oauthToken='';
  $scope.pickerApiLoaded=false;
  $scope.LoginWithGoogle = function() {
   /* if ($scope.loginGoogleOK) {
      //logout Code
      gapi.auth.signOut();
      $scope.loginGoogleOK = false;
    } else {*/
      gapi.load('auth', { 'callback': onAuthApiLoad });
    //}
     
           var dropZone = document.getElementById('drop_zone');
           dropZone.addEventListener('dragover', $scope.handleDragOver, false);
           dropZone.addEventListener('drop', $scope.handleFileSelect, false);
  }

  $scope.PickerGoogle = function() {
    gapi.load('picker', { 'callback': onPickerApiLoad });
    gapi.client.load('drive', 'v2', null); 
  }

  function onAuthApiLoad() {
    window.gapi.auth.authorize(
      {
        'client_id': '579050972948-ot1hm22tds2oor4m78n3ad9rho9fic0t.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/drive.file',
        'immediate': false
      },
      handleAuthResult);
    }

    function onPickerApiLoad() {
      $scope.pickerApiLoaded = true;
      createPicker();
    }

    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        $scope.oauthToken = authResult.access_token;
        $scope.loginGoogleOK = true;
        $scope.$apply();
        // createPicker();
      }
    }

    // Create and render a Picker object for picking user Photos.
    function createPicker() {
      if ($scope.pickerApiLoaded && $scope.oauthToken) {
        //var view = new google.picker.View(google.picker.ViewId.DOCS);
        //view.setMimeTypes("application/vnd.openxmlformats-officedocument.presentationml.presentation");
        var picker = new google.picker.PickerBuilder().
        addView(google.picker.ViewId.DOCS).
        //addView(view).
        setOAuthToken($scope.oauthToken).
        //setDeveloperKey(developerKey).
        setCallback(pickerCallback).
        build();
        picker.setVisible(true);
      }
    }

    // A simple callback implementation.
    function pickerCallback(data) {
      var url = 'nothing';
      if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        $scope.GetdownloadableUrl(doc)
                /*  var value = '';
                    var type = 'anyone';
                    var role = 'reader';
                    $scope.insertPermission(doc.id, value, type, role);*/
                    
                    
        // cloudService.addDriveFile(doc);
 
      }
      /* var message = 'You picked: ' + url;
      document.getElementById('result').innerHTML = message;*/
    }
    $scope.GetdownloadableUrl=function(doc)
    {
    var request =gapi.client.request({
                    'path': '/drive/v2/files/' + doc.id,
                    'params': { 'maxResults': '1000' },
                    callback: function (responsejs, responsetxt) {
                       var fileDownloadUrl = responsejs.webContentLink; 
                               //var n = fileDownloadUrl.indexOf("&");
        //var dwnlink = fileDownloadUrl.substring(0, n); 
        var fileData = {name:doc.name, type:"GoogleDrive", id:doc.id, link:doc.url,downUrl:responsejs.webContentLink};
        $scope.GoogleFiles.push(fileData);
        // $scope.driveFileList = cloudService.driveFileList;
        $scope.$apply();
        var value = '';
                    var type = 'anyone';
                    var role = 'reader';
                    $scope.insertPermission(doc.id, value, type, role);
                    }});
    }
    $scope.onDropGoogleDrive = function($event, $data, array, index) {
      if (index !== undefined) {
        array.splice(index, 0, $data);
      } else {
        array.push($data);
      }
    };
    
    
$scope.insertPermission=function (fileId, value, type, role) {
            var body = {
                'value': value,
                'type': type,
                'role': role,
                'withLink': true
            };
            var request = gapi.client.drive.permissions.insert({
                'fileId': fileId,
                'resource': body,
                'sendNotificationEmails': false
            });
            request.execute(function (resp) {
                if (resp) {
console.log(resp);
                }
                else {
                    Console.log('Error in inserting permission');
                }
            });
        }
        
        $scope.SaveToGdrive=function(fileUrl,fileName){
          var accessToken = gapi.auth.getToken();
          
        /*  gapi.savetodrive.render('savetodrive-div',{
          src: 'C:\Users\vishalp\Downloads\ScienceEducationinTonga.pptx',
          filename: fileName,
          sitename: 'My Site'
        });*/
        var uploader = new MediaUploader({
  file: 'C:\Users\vishalp\Downloads\ScienceEducationinTonga.pptx',
  token: accessToken,
});
uploader.upload();
          
        }
        
$scope.handleDragOver=function(evt) {
         evt.stopPropagation();
         evt.preventDefault();
         evt.dataTransfer.dropEffect = 'copy'; 
       }
       
        $scope.handleFileSelect=function(evt) {
         evt.stopPropagation();
         evt.preventDefault();
         
         var blob = null;
var xhr = new XMLHttpRequest(); 
xhr.open("GET", "https://dl.dropboxusercontent.com/1/view/eogrnb2cq6a230w/Saves/IIS%20settings.docx"); 
xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
xhr.onload = function() 
{
    blob = xhr.response;//xhr.response is now a blob object
    var myReader = new FileReader();
myReader.readAsArrayBuffer(blob)
myReader.addEventListener("loadend", function(e){
        var buffer = e.srcElement.result;//arraybuffer object
        var files = evt.dataTransfer.files; // FileList object.
         var accessToken=gapi.auth.getToken().access_token;
         console.log(accessToken);
         var output = [];
         for (var i = 0, f; f = files[i]; i++) {
             var uploader = new MediaUploader({
                 file: buffer,
                 token: accessToken,
                 onComplete: function(data) {
                     var element = document.createElement("pre");
                     element.appendChild(document.createTextNode(data));
                     document.getElementById('results').appendChild(element);
                 }
             });
             uploader.upload();
         }
});

xhr.send();

     /*    var files = evt.dataTransfer.files; // FileList object.
         var accessToken=gapi.auth.getToken().access_token;
         console.log(accessToken);
         var output = [];
         for (var i = 0, f; f = files[i]; i++) {
             var uploader = new MediaUploader({
                 file: 'C:\Users\vishalp\Downloads\NoticeOfIntimation_612049397.pdf',
                 token: accessToken,
                 onComplete: function(data) {
                     var element = document.createElement("pre");
                     element.appendChild(document.createTextNode(data));
                     document.getElementById('results').appendChild(element);
                 }
             });
             uploader.upload();*/
         }
       }
        
       
    //////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////// DROP-BOX ////////////////////////////////////////////////////
    $scope.ShowDropboxFile=function(control)
    {
      window.open(control.currentTarget.id);
      //$scope.currentDropboxFileUrl = $sce.trustAsResourceUrl(dwnlink);
      //$scope.apply();
    }
    $scope.DownloadFile=function(control)
    {
      var dwnlink = control.currentTarget.name.substr(0, control.currentTarget.name.length - 1) + "1";
      //window.open(control.currentTarget.id);
      $scope.currentDropboxFileUrl = $sce.trustAsResourceUrl(dwnlink);
      //$scope.apply();
      //$scope.currentDropboxFileUrl=$sce.trustAsResourceUrl(control.currentTarget.id);
    }
var client = new Dropbox.Client({ key: 'u7720ia3imgrbn4' });
    $scope.LoginWithDropbox=function()
    {

      var options = {

        // Required. Called when a user selects an item in the Chooser.
        success: function(files) {
           //var dwnlink = files[0].link.substr(0, files[0].link.length - 1) + "1";
          var fileData = {name:files[0].name, type:"DropBox", id:files[0].link, link:files[0].link,downUrl:files[0].link};
          $scope.DropBoxFiles.push(fileData);
          
          //var fileArray=new Array(1);
          //fileArray.push(dwnlink);
          //$scope.InsertFile(fileArray);
          // cloudService.addDropboxFile(files[0]);
          // $scope.dropboxFileList = cloudService.dropboxFileList;
          $scope.$apply();
          //alert("Here's the file link: " + files[0].link)
        },

        // Optional. Called when the user closes the dialog without selecting a file
        // and does not include any parameters.
        cancel: function() {

        },

        // Optional. "preview" (default) is a preview link to the document for sharing,
        // "direct" is an expiring link to download the contents of the file. For more
        // information about link types, see Link types below.
        linkType: "direct", // or "direct"

        // Optional. A value of false (default) limits selection to a single file, while
        // true enables multiple file selection.
        multiselect: false, // or true

        // Optional. This is a list of file extensions. If specified, the user will
        // only be able to select files with these extensions. You may also specify
        // file types, such as "video" or "images" in the list. For more information,
        // see File types below. By default, all extensions are allowed.
        //extensions: ['.pdf', '.doc', '.docx'],
      };
      Dropbox.choose(options);
     //var client = new Dropbox.Client({ key: 'u7720ia3imgrbn4' });
      client.authenticate(function (error, client) {if(!error){cloudService.dropboxClient=client}});
    }
    
     $scope.SaveToDropBox = function(fileUrl,fileName)
        {
          
          var options = {
    files: [
        // You can specify up to 100 files.
        {'url': fileUrl, 'filename': fileName}
        // ...
    ],

    // Success is called once all files have been successfully added to the user's
    // Dropbox, although they may not have synced to the user's devices yet.
    success: function () {
        // Indicate to the user that the files have been saved.
        
      //client.authenticate(function (error, client) {
        //if (!error) {
         cloudService.dropboxClient.makeUrl(fileName, {download: true}, function (error, data)
        {
          if (!error) { 
          var fileData = {name:fileName, type:"DropBox", id:data.url, link:data.url,downUrl:data.url};
          $scope.DropBoxFiles.push(fileData);
          $scope.$apply();
          alert("Success! Files saved to your Dropbox.");
         // }
        // });
}
});
         },

    // Progress is called periodically to update the application on the progress
    // of the user's downloads. The value passed to this callback is a float
    // between 0 and 1. The progress callback is guaranteed to be called at least
    // once with the value 1.
    progress: function (progress) {},

    // Cancel is called if the user presses the Cancel button or closes the Saver.
    cancel: function () {},

    // Error is called in the event of an unexpected response from the server
    // hosting the files, such as not being able to find a file. This callback is
    // also called if there is an error on Dropbox or if the user is over quota.
    error: function (errorMessage) {}
};
Dropbox.save(options);
        }

    $scope.onDropDropBox = function($event, $data, array, index) {
      if (index !== undefined) {
        array.splice(index, 0, $data);
      } else {
        array.push($data);
      }
    };
    
     $scope.SearchDropboxFileUrl=function(filename) {
    var client = new Dropbox.Client({ key: 'u7720ia3imgrbn4' });
      client.authenticate(function (error, client) {
        if (!error) {client.makeUrl(filename, {download: true}, function (error, data)
        {
          if (!error) { return data.url; }
         });
}
});
      
}
    
    /////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////// ONE DRIVE /////////////////////////////////////////
    $scope.ShowOnedriveFile=function(control)
    {
      window.open(control.currentTarget.id);
      //$scope.currentDropboxFileUrl = $sce.trustAsResourceUrl(dwnlink);
      //$scope.apply();
    }

    $scope.launchOneDrivePicker=function(){
      var pickerOptions = {
        success: function(files) {
          // Handle returned file object(s)
          //alert("You picked " + files.values[0].fileName);
          // cloudService.addoneDriveFile(files.values[0]);
          // $scope.oneDriveFileList = cloudService.oneDriveFileList;
          var fileData = {name:files.values[0].fileName, type:"OneDrive", id:files.values[0].link, link:files.values[0].link,downUrl:files.values[0].link};
          $scope.OneDriveFiles.push(fileData);
          $scope.$apply();
        },

        cancel: function() {
          // handle when the user cancels picking a file
        },

        linkType: "downloadLink", // or "downloadLink",
        multiSelect: false // or true
      }
      OneDrive.open(pickerOptions);
    }
    
    $scope.SaveToOneDrive=function(fileUrl,fileName){
      
      var saverOptions = {
  file: fileUrl,
  fileName: fileName,
  success: function(){
    // upload is complete
    alert("file saved successfully");
  },
  progress: function(p) {
    // upload is progressing
  },
  cancel: function(){
    // upload was cancelled
  },
  error: function(e) {
    // an error occured
  }
}
OneDrive.save(saverOptions);
    }

    $scope.onDropOneDrive = function($event, $data, array, index) {
      if (index !== undefined) {
        array.splice(index, 0, $data);
      } else {
        array.push($data);
      }
    };
    
    
    ////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////// box drive ////////////////////////////////////////////

    $scope.ShowBoxdriveFile=function(control)
    {
      // alert("hi"+id.currentTarget.id);
      window.open(control.currentTarget.id);
      // $scope.currentDropboxFileUrl = $sce.trustAsResourceUrl(control.currentTarget.id);
      //$scope.$apply();
    };

    $scope.boxdrivePicker= function()
    {

      var options = {
        clientId: "67s3chcyyak7hl7jpgjkfepm4bol7arp",
        linkType: "direct link",
        multiselect: "false"
      };
      var boxSelect = new BoxSelect(options);
      boxSelect.success(function(response) {
        var fileData = {name:response[0].name, type:"BoxDrive", id:response[0].id, link:response[0].url,downUrl:response[0].url};
          $scope.BoxFiles.push(fileData);
          $scope.$apply();
      });
      // Register a cancel callback handler
      boxSelect.cancel(function() {
        console.log("The user clicked cancel or closed the popup");
      });
      boxSelect.launchPopup();
    };

    $scope.onDropBox = function($event, $data, array, index) {
      if (index !== undefined) {
        array.splice(index, 0, $data);
      } else {
        array.push($data);
      }
    };

$scope.SaveToBoxDrive = function(fileUrl,fileName)
{
	//newwindow=window.open("https://app.box.com/api/oauth2/authorize?response_type=code&client_id=67s3chcyyak7hl7jpgjkfepm4bol7arp&redirect_uri=http://localhost:3000/cloud&state=security_token%3DKnhMJatFipTAnM0nHlZA","_self");
	//if (window.focus) {newwindow.focus()}
	//return false;
  OAuth.initialize('VG1UXb-EGz8Fki7pmOkXlRcGVHI')
OAuth.popup('box').done(function(result) {
    console.log(result)
 /*   
    $.ajax({
    url: 'https://upload.box.com/api/2.0/files/content',
    type: 'post',
    data: {
        "name":fileName,
    "parent":{"id":"0"},
    "file":fileUrl
    },
    headers: {
        'Authorization': 'Bearer',   //If your header name has spaces or any other char not appropriate
        'ACCESS_TOKEN': '',  //for object property name, use quoted notation shown in second
        'Content-MD5':'SHA1'
    },
    dataType: 'json',
    success: function (data) {
        console.info(data);
    }
});*/
$window.open('https://upload.box.com/api/2.0/files/content?ACCESS_TOKEN='+result.access_token+'&Authorization=Bearer&Content-MD5=SHA1&'+
'data={name:'+fileName+',parent:{id:0},file:'+fileUrl+'}');
    // do some stuff with 
  /* var options={
    "name":fileName,
    "parent":{"id":"0"},
    "file":fileUrl
    }
    //form.submit();
    //var options={attributes:{"name":fileName, "parent":{"id":"0"}},file:fileUrl}
    //result.post("https://upload.box.com/api/2.0/files/content",options).done(function(data) {
    // do something with `data`, e.g. print data.name
    console.log(data);
})*/
})
}
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////// Amazon Cloud drive //////////////////////////////////////////////

    $scope.amazondrivePicker=function(){
      var driveurl = encodeURI("https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.7d9f9ea3481d4603a1eec3a8e0696a6e&scope=clouddrive:Aread_all&response_type=token&redirect_uri=http://localhost:3000/cloud");
      $.get(driveurl, function( data ) {
        alert(data);
      });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
  }]);
