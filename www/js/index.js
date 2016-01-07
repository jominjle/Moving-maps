/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
var watchID = null;
$(document).ready(function(){
    var optn = {
enableHighAccuracy: true,
            timeout: 60000,
            maximumAge: 5000   
        };
    if( navigator.geolocation )
     navigator.geolocation.watchPosition(success, fail, optn);
    else
     $("p").html("HTML5 Not Supported");
$("button").click(function(){
 
    if(watchID)
     navigator.geolocation.clearWatch(watchID);
 
    watchID = null;
    return false;
});
 
});
 
function success(position)
{
    var googleLatLng = new google.maps.LatLng(position.coords.latitude, 
                        position.coords.longitude);
    var mapOtn={
zoom:14,
center:googleLatLng,
mapTypeId:google.maps.MapTypeId.ROAD
    };
 
    var Pmap=document.getElementById("map");
 
    var map=new google.maps.Map(Pmap, mapOtn);
    addMarker(map, googleLatLng, "Technotip.com", 
                  "SATISH B<br /><b>About Me:</b>http://technotip.com/about/");
}
 
function addMarker(map, googleLatLng, title, content){
    var markerOptn={
position:googleLatLng,
map:map,
title:title,
animation:google.maps.Animation.DROP
    };
 
    var marker=new google.maps.Marker(markerOptn);
 
    var infoWindow=new google.maps.InfoWindow({ content: content, 
                                                   position: googleLatLng});
    google.maps.event.addListener(marker, "click", function(){
        infoWindow.open(map);
    });                                                
}
 
function fail(error)
{
    var errorType={
0:"Unknown Error",
1:"Permission denied by the user",
2:"Position of the user not available",
3:"Request timed out"
    };
 
    var errMsg = errorType[error.code];
 
    if(error.code == 0 || error.code == 2){
        errMsg = errMsg+" - "+error.message;
    }
 
    $("p").html(errMsg);
}
