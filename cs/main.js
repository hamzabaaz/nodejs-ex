(function(){

var pl, os, agent, navigator;

navigator = window.navigator;
os = "Unknown";
if (navigator.appVersion.indexOf("Win")!=-1)   os = "Windows";
if (navigator.appVersion.indexOf("Mac")!=-1)   os = "MacOS";
if (navigator.appVersion.indexOf("X11")!=-1)   os = "UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) os = "Linux";

agent = navigator.userAgent;

pl = {
	type  : 'history',
	datetime  : new Date().toLocaleString(),
  	url   : window.location.href,
  	title : document.title,
  	os    : os,
  	agent : agent,
  	key   : 'mock'
};

  chrome.runtime.sendMessage({
  	body: pl
  });

}());