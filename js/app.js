;(function ($, window, document, undefined) {
    "use strict";

/************* #1 *************/

var $friends_add = $('#friends-add');
var $friends_counter = $('#friends-counter').text(0);

var $msg_add = $('#msg-add');
var $msg_counter = $('#msg-counter').text(0);

var $info_add = $('#info-add');
var $info_counter = $('#info-counter').text(0);

var audioSupport = "Audio" in window;

if (audioSupport)
    var notifyMp3 = new Audio('mp3/notify.mp3');

/************* #2 *************/

var OnNotifyReady = function(callback) {
    this.permission = false;
    this.support    = "Notification" in window;

    var _this = this;

    var init = function() {
        if(!_this.support) return;

        if (Notification.permission === "granted") {
            _this.permission = true;
            callback();
        }

        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                
                if(!('permission' in Notification))
                    Notification.permission = permission;

                if (permission === "granted") {
                    _this.permission = true;
                    callback();
                }
                else
                    _this.permission = false;
            });
        }
    };

    init();
};

/************* #3 *************/

function friendNotification() {
    var i = parseInt($friends_counter.toggleClass('rotate').text(), 10);
    $friends_counter.text(++i);
    var n = new Notification("One more friend!",
                                {icon: 'img/user-icon.png',
                                body: 'Lorem ipsum dolor sit amet, consectetur.'});
    n.onshow = function(){
        console.log('Friend notification\'s displayed.');
    };
    n.onclick = function(){
        console.log('Friend notification\'s clicked.');
    };
    n.onclose = function(){
        console.log('Friend notification\'s closed.');
    };
    n.onerror = function(){
        console.log('Something goes wrong with friend notification.');
    };
    if (audioSupport)
        notifyMp3.play();
}

function msgNotification() {
    var i = parseInt($msg_counter.toggleClass('rotate').text(), 10);
    $msg_counter.text(++i);
    var n = new Notification("I've message for you!",
                                {icon: 'img/speech-icon.png',
                                body: 'Labore, sapiente, necessitatibus ratione blanditiis quibusdam hic dolorem consequuntur illum laudantium sunt architecto saepe ipsa accusantium.'});
    if (audioSupport)
        notifyMp3.play();
}

function infoNotification() {
    var i = parseInt($info_counter.toggleClass('rotate').text(), 10);
    $info_counter.text(++i);
    var n = new Notification("Breaking News!",
                                {icon: 'img/info-icon.png',
                                body: 'Labore, sapiente, necessitatibus ratione blanditiis.'});
    if (audioSupport)
        notifyMp3.play();
}

function notificationsNotSupported() {
    alert("Your browser doesn't support notification. Try with Mozilla Firefox or Google Chrome.");
}

/************* #4 *************/

$friends_add.on('click', function(){
    if(!new OnNotifyReady(friendNotification).support)
        notificationsNotSupported();
});

$msg_add.on('click', function(){
    if(!new OnNotifyReady(msgNotification).support)
        notificationsNotSupported();
});

$info_add.on('click', function(){
    if(!new OnNotifyReady(infoNotification).support)
        notificationsNotSupported();
});

}(jQuery, this, this.document));