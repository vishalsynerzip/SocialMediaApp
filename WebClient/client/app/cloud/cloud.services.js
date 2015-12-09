angular.module('SMT').factory('CloudService',[function(){
    return({
        driveFileList: new Array(),
        addDriveFile : function(fileObject){
            this.driveFileList.push(fileObject);},
        dropboxFileList:new Array(),
        addDropboxFile : function(fileObject)
        {   
            this.dropboxFileList.push(fileObject);
        },
        oneDriveFileList:new Array(),
        addoneDriveFile : function(fileObject)
        {   
            this.oneDriveFileList.push(fileObject);
        },
        boxDriveFileList:new Array(),
        addboxDriveFile : function(fileObject)
        {   
            this.boxDriveFileList.push(fileObject);
        },
        evernoteFileList:new Array(),
        addevernoteFile : function(fileObject)
        {   
            this.evernoteFileList.push(fileObject);
        },
        dropboxClient:new Object()
    })
}]);
