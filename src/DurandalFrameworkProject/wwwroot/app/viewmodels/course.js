﻿define(['plugins/http', 'durandal/app', 'knockout','durandal/system'], function (http, app, ko,system) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    return {
        displayName: '课程',
        courses: ko.observableArray([]),
        activate: function () {
            //the router's activator calls this function and waits for it to complete before proceeding            
            if (this.courses().length > 0) {
                return;
            }
            var that = this;
            return http.get('/api/courseinfos')
            .then(function (response) {
                that.courses(response);               
            },
                function (response) {
                    system.log(response);
                }
            );
            
        },
        select: function(item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            item.viewUrl = 'views/coursedetail';
            app.showDialog(item);
        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        }
       
    };
});