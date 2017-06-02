define(['plugins/http', 'durandal/app', 'knockout', 'durandal/system'], function (http, app, ko, system) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    return {
        displayName: '待办任务列表',
        todos: ko.observableArray([]),
        activate: function () {
            //the router's activator calls this function and waits for it to complete before proceeding            
            if (this.todos().length > 0) {
                return;
            }
            var that = this;
            return http.get('/api/todos')
            .then(function (response) {
                that.todos(response);
            },
                function (response) {
                    system.log(response);
                }
            );

        },
        select: function (item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            item.viewUrl = 'views/todoedit';
            var that = this;
            item.save = function (that) {
                return http.post('/api/todos/'+item.id, {id:item.id,taskName:item.taskName,deadLine:item.deadLine})
            .then(function (response) {
                system.log(response);
                todos();
            }, function () {
                app.showDialog("保存失败");
            });
            };
            app.showDialog(item);
            for (var i in item) {
                system.log(i);
            }
        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        },
        add: function () {
            app.showDialog({ viewUrl: 'views/todoedit' });
        },
        save: function (item) {
            return http.post('/api/todos', item)
            .then(function (response) {
                app.showMessage(response);
            });
        }
    };
});