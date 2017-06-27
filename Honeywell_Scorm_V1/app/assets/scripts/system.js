/*
 Framework for Responsive eLearning Development (FRED)
 Version 2.0
 Copyright © Upside Learning Solutions Pvt. Ltd.

 This is a legal agreement between you or the company, organization, employer, or other entity on behalf of whom you are entering into this agreement ("Purchaser") and Upside Learning Solutions Pvt. Ldt., a provider of learning solutions having its head office at Punakar Complex, Survey No-117, 1st Floor, Bangalore Pune Highway, Warje, Pune – 411058, Maharashtra, India, as the licensor hereunder ("Upside Learning"). The Purchaser has been granted a one-time non-exclusive non-transferable license for FRED v2.0. This grants permission to the Purchaser or any Purchaser employee to use this framework (including templates) and its associated documentation to:
 1.Modify the framework and templates as desired.
 2.Use the (modified) framework and templates to create eLearning content.

 The Purchaser may not resell or freely redistribute FRED or its associated documentation to anyone outside the Purchaser (including vendors, service providers, partners, clients or customers); nor may the Purchaser transfer this license to anyone.

 It is strongly recommended that the framework and template source files included in the packaged eLearning content (i.e. the output) should be minified prior to distribution, to restrict unauthorized access to the source.
 */

/**
 * @author Shivaji Babar
 * @name system.js
 * @namespace FRED
 * @version 2.0
 */
window.onload = function() {
    disableSelection(document.body);
};

document.oncontextmenu = function() {
    return false;
};

document.onmousedown = mousedwn;

if (window.addEventListener)
    window.addEventListener("keydown", onKeyDown);
if (window.addListener)
    window.addListener("keydown", onKeyDown);

function onKeyDown(e) {
    if (e.ctrlKey && (e.which === 65 || e.which === 67 || e.which === 85 || e.which === 80)) {
        e.preventDefault();
    }
}

document.keypress = function(e) {
    if (e.ctrlKey && (e.which === 65 || e.which === 67 || e.which === 85 || e.which === 80)) {

    }
    return false;
};

function disableSelection(target) {
    if (typeof target.onselectstart !== "undefined") {
        target.onselectstart = function() {
            return false;
        };
    } else if (typeof target.style.MozUserSelect !== "undefined") {
        target.style.MozUserSelect = "none";
    } else {
        target.onmousedown = function() {
            return false;
        };
    }
    target.style.cursor = "default";
}

function mousedwn(e) {
    try {
        if (event.button === 2 || event.button === 3)
            return false;
    }
    catch (e) {
        if (e.which === 3)
            return false;
    }
}