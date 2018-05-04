"use strict";!function(){"undefined"==typeof SVGElement.prototype.contains&&(SVGElement.prototype.contains=HTMLDivElement.prototype.contains);var a="undefined"!=typeof HTMLDocument?HTMLDocument:"undefined"!=typeof Document?Document:null;a&&"undefined"==typeof a.prototype.contains&&(a.prototype.contains=function(a){return Boolean(16&this.compareDocumentPosition(a))})}();;"use strict";!function(a){var b=["ngRoute","ov.authentication","ov.storage","ov.i18n","ov.entity","ov.alert","ov.tableForm","ov.util","ov.socket","ui.bootstrap","ui.tree","ngTasty","formly","formlyBootstrap","ngJSONPath","ngAnimate","checklist-model","ui.tinymce","ngFileUpload"];"undefined"!=typeof openVeoSettings&&openVeoSettings.plugins&&a.forEach(openVeoSettings.plugins,function(c){a.module("ov."+c),b.push("ov."+c)});var c=a.module("ov",b);c.run(["formlyConfig","$filter","$sce",function(b,c,d){b.setWrapper({name:"collapse",templateUrl:"ov-core-collapse.html"}),b.setWrapper({name:"horizontalBootstrapLabel",templateUrl:"ov-core-horizontal-bootstrap-label.html"}),b.setWrapper({name:"horizontalBootstrapLabelOnly",templateUrl:"ov-core-horizontal-bootstrap-label-only.html"}),b.setWrapper({name:"editableWrapper",templateUrl:"ov-core-editable-wrapper.html"}),b.setType({name:"datepicker",templateUrl:"ov-core-formly-datepicker.html",defaultOptions:{validation:{show:!0}},link:function(a,b,c){a.status={opened:!1},a.open=function(){a.status.opened=!0}}}),b.setType({name:"tags",templateUrl:"ov-core-formly-tags.html",defaultOptions:{validation:{show:!0}}}),b.setType({name:"match",templateUrl:"ov-core-formly-match.html",defaultOptions:{validation:{show:!0}}}),b.setType({name:"emptyrow",templateUrl:"ov-core-empty-row.html",wrapper:["horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"section",templateUrl:"ov-core-section.html"}),b.setType({extends:"input",name:"editableInput",link:function(a,b,d){a.show=function(){return a.isEmpty=!a.model[a.options.key],a.model[a.options.key]||c("translate")("CORE.UI.EMPTY")}}}),b.setType({extends:"select",name:"editableSelect",link:function(a,b,d){a.show=function(){var b,d=[];return b="[object Array]"===Object.prototype.toString.call(a.model[a.options.key])?a.model[a.options.key]:[a.model[a.options.key]],a.to.options.forEach(function(a){b.forEach(function(b){a.value===b&&d.push(a.name)})}),a.isEmpty=!d.length,d.length?d.join(", "):c("translate")("CORE.UI.EMPTY")}}}),b.setType({name:"editableDatepicker",extends:"datepicker",link:function(a,b,d){a.show=function(){return c("date")(a.model[a.options.key],"shortDate")}}}),b.setType({name:"editableTags",extends:"tags",wrapper:["editableTagsWrapper"],link:function(a,b,d){a.show=function(){var b=a.model[a.options.key];return a.isEmpty=!b||!b.length,b&&b.join(", ")||c("translate")("CORE.UI.EMPTY")}}}),b.setType({name:"ovMultiCheckBox",templateUrl:"ov-core-formly-multi-check-box.html"}),b.setType({name:"ovEditableMultiCheckBox",extends:"ovMultiCheckBox",link:function(b){b.show=function(){var d=[];return a.forEach(b.to.options,function(a){b.model[b.options.key]&&b.model[b.options.key].indexOf(a.id)>=0&&d.push(a.name)}),b.isEmpty=!d.length,d.length?d.join(", "):c("translate")("CORE.UI.EMPTY")}}}),b.setType({extends:"checkbox",name:"editableCheckbox",link:function(a,b,d){a.show=function(){return a.isEmpty=!1,a.model[a.options.key]&&c("translate")("CORE.UI.TRUE")||c("translate")("CORE.UI.FALSE")}}}),b.setType({name:"ovTinymce",templateUrl:"ov-core-textarea-tinymce.html"}),b.setType({name:"ovEditableTinymce",extends:"ovTinymce",link:function(a){a.show=function(){return a.isEmpty=!a.model[a.options.key],a.model[a.options.key]||c("translate")("CORE.UI.EMPTY")}}}),b.setType({name:"ovFile",templateUrl:"ov-file.html",link:function(a){a.file=null,a.$watch('model["'+a.options.key+'"]',function(b){100===b&&(a.file=null,a.form.file.$setUntouched(),a.form.file.$setPristine())})}}),b.setType({name:"simple",templateUrl:"ov-core-simple.html",wrapper:["horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalFile",extends:"ovFile",wrapper:["horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalEditableFile",extends:"horizontalFile",wrapper:["editableWrapper","horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalTinymce",extends:"ovTinymce",wrapper:["horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalEditableTinymce",extends:"ovEditableTinymce",wrapper:["editableWrapper","horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalInput",extends:"input",wrapper:["horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalEditableInput",extends:"editableInput",wrapper:["editableWrapper","horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalDatepicker",extends:"datepicker",wrapper:["horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalEditableDatepicker",extends:"editableDatepicker",wrapper:["editableWrapper","horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalSelect",extends:"select",wrapper:["horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalEditableSelect",extends:"editableSelect",wrapper:["editableWrapper","horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalMultiCheckbox",extends:"ovMultiCheckBox",wrapper:["horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalEditableMultiCheckbox",extends:"ovEditableMultiCheckBox",wrapper:["editableWrapper","horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalTags",extends:"tags",wrapper:["horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalMatch",extends:"match",wrapper:["horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalEditableTags",extends:"editableTags",wrapper:["editableWrapper","horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalCheckbox",extends:"checkbox",wrapper:["horizontalBootstrapLabel","bootstrapHasError"]}),b.setType({name:"horizontalEditableCheckbox",extends:"editableCheckbox",wrapper:["editableWrapper","horizontalBootstrapLabel","bootstrapHasError"]})}]),c.config(["$routeProvider","$locationProvider","$httpProvider",function(a,b,c){var d=openVeoSettings.authenticationStrategies,e=openVeoSettings.authenticationMechanisms.indexOf(d.LDAP)>=0,f=openVeoSettings.authenticationMechanisms.indexOf(d.CAS)>=0;a.when("/",{templateUrl:"views/home.html",controller:"HomeController",title:"CORE.HOME.PAGE_TITLE"}),a.when("/login",{title:"CORE.LOGIN.PAGE_TITLE",templateUrl:"views/login.html",controller:"LoginController",resolve:{i18nCommon:["i18nService",function(a){return a.addDictionary("common")}],i18nLogin:["i18nService",function(a){return a.addDictionary("login")}]}}).otherwise("/"),a.when("/applications-list",{templateUrl:"views/applications.html",controller:"ApplicationController",title:"CORE.APPLICATIONS.PAGE_TITLE",access:"core-access-applications-page",resolve:{scopes:["applicationService",function(a){return a.loadScopes()}]}}),a.when("/users-list",{templateUrl:"views/users.html",controller:"UserController",title:"CORE.USERS.PAGE_TITLE",access:"core-access-users-page",resolve:{roles:["entityService",function(a){return a.getAllEntities("roles")}]}}),a.when("/profile",{templateUrl:"views/profile.html",controller:"ProfileController",controllerAs:"ctrl",title:"CORE.PROFILES.PAGE_TITLE",resolve:{user:["authenticationService",function(a){return a.getUserInfo()}]}}),a.when("/roles-list",{templateUrl:"views/roles.html",controller:"RoleController",title:"CORE.ROLES.PAGE_TITLE",access:"core-access-roles-page",resolve:{permissions:["userService",function(a){return a.loadPermissions()}]}}),a.when("/groups-list",{templateUrl:"views/groups.html",controller:"GroupController",title:"CORE.GROUPS.PAGE_TITLE",access:"core-access-groups-page"}),a.when("/openveo-settings",{templateUrl:"views/settings.html",controller:"SettingsController",controllerAs:"ctrl",title:"CORE.SETTINGS.PAGE_TITLE",access:"core-access-settings-page",resolve:{ldapSettings:["$q","entityService",function(a,b){return e?b.getEntity("settings",null,"core-"+d.LDAP):a.when({data:{}})}],casSettings:["$q","entityService",function(a,b){return f?b.getEntity("settings",null,"core-"+d.CAS):a.when({data:{}})}],roles:["entityService",function(a){return a.getAllEntities("roles")}]}}),b.html5Mode(!0),c.interceptors.push("errorInterceptor"),FastClick.attach(document.body)}]),c.filter("noBreakSpace",function(){return function(a){return a.replace(/ /g," ")}})}(angular);;"use strict";!function(a,b){function c(a,b){var c,d;return a.data&&a.data.error&&(c=a.data.error.code,d=a.data.error.module),403===a.status?b("translate")("CORE.ERROR.FORBIDDEN"):400===a.status?b("translate")("CORE.ERROR.CLIENT")+" (code="+c+", module="+d+")":c&&d?b("translate")("CORE.ERROR.SERVER")+" (code="+c+", module="+d+")":b("translate")("CORE.ERROR.SERVER")}function d(a,b,d){return{responseError:function(e){return 401===e.status?a.$broadcast("forceLogout"):e.status==-1?e.config&&e.config.timeout&&e.config.timeout.status||a.$broadcast("setAlert","danger",c(e,b),0):a.$broadcast("setAlert","danger",c(e,b),0),d.reject(e)}}}b.factory("errorInterceptor",d),d.$inject=["$rootScope","$filter","$q"]}(angular,angular.module("ov"));;"use strict";!function(a){function b(a,b,c,d,e,f,g,h,i,j,k,l,m){function n(){b.closeResponsiveMenu(),e.setUserInfo(),b.menu=!1,b.displayMainMenu=!1,f.destroyMenu(),i.removeDictionary("back-office"),g.destroy(),h.destroy(),k.deleteCache(),j.closeAll(),c.path("/login")}function o(a,b){var c=[];return angular.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var e=a.match(/(\w+)(?:[?*])?(.*)/),f=e[1];c.push(b[f]),c.push(e[2]||""),delete b[f]}}),c.join("")}function p(a,b){return b=angular.copy(b),b&&Object.keys(b).length?o(a,b):a}function q(a,b){var c=[];return a&&a.length&&a.forEach(function(a){c.push(b+"-group-"+a)}),c}b.displayMainMenu=!1,b.isResponsiveMenuClosed=!0,b.languages=i.getLanguages(),b.language=i.getLanguageName(i.getLanguage()),b.indexOpen=-1,b.menuDropdownIsOpen=!1,b.newAnimation="",b.toggleResponsiveMenu=function(){b.isResponsiveMenuClosed=!b.isResponsiveMenuClosed},b.closeResponsiveMenu=function(){!b.isResponsiveMenuClosed&&b.displayMainMenu&&(b.isResponsiveMenuClosed=!0)},b.openResponsiveMenu=function(){b.isResponsiveMenuClosed&&b.displayMainMenu&&(b.isResponsiveMenuClosed=!1)},b.navigate=function(a){a&&(b.closeResponsiveMenu(),c.path(angular.element(a.currentTarget).attr("href")))},b.changeLanguage=function(a){i.setLanguage(a),l.location.reload()},b.toggleSidebarSubMenu=function(a){b.indexOpen==-1?b.indexOpen=a:b.indexOpen==a?b.indexOpen=-1:b.indexOpen=a},b.logout=function(){b.userInfo&&b.userInfo.origin===openVeoSettings.authenticationStrategies.CAS?l.location.href="logout":e.logout().then(n,n)},b.$on("setAlert",function(a,b,c,d){j.add(b,c,d)}),b.$on("logout",function(){b.logout()}),b.$on("forceLogout",function(){n()}),b.$on("$routeChangeStart",function(a,g){var h=g.params,j=p(g.originalPath,h);if(!j)return!1;var k=e.getUserInfo(),l=i.getDictionary("back-office",i.getLanguage());if(!("/login"===c.path()||!k||f.getMenu()&&l)){a.preventDefault();var o={i18nCommon:i.addDictionary("common"),i18nBE:i.addDictionary("back-office",!0),menu:f.loadMenu()};return m.all(o).then(function(a){j===p(c.path(),h)?d.reload():c.path(j)},function(a){401===a.status&&(n(),d.reload())}),!1}if("/login"!==c.path()&&!k)return a.preventDefault(),c.path("/login"),!1;if("/login"!==c.path()&&k){if(b.userInfo=k,g.access&&!b.checkAccess(g.access))return a.preventDefault(),c.path("/"),!1;"LR"==a.targetScope.newAnimation?a.currentScope.newAnimation="RL":"RL"==a.targetScope.newAnimation?a.currentScope.newAnimation="LR":a.currentScope.newAnimation=""}else if("/login"===c.path()&&k)return a.preventDefault(),c.path("/"),!1}),b.$on("$routeChangeSuccess",function(c,g){k.deleteCache(),b.userInfo=e.getUserInfo(),b.userInfo?(b.menu=f.getMenu(),b.displayMainMenu=!!b.menu,f.setActiveMenuItem()):b.displayMainMenu=!1,b.title=d.current&&d.current.title||"",b.newAnimation=a.newAnimation}),b.$on("$routeChangeError",function(a,d,e,f){b.userInfo?f&&f.redirect?c.path(f.redirect):c.path("/"):c.path("/login")}),b.checkAccess=function(a){if(b.userInfo){if(b.userInfo.id===openVeoSettings.superAdminId)return!0;if("string"==typeof a&&(a=[a]),b.userInfo.roles&&0!=b.userInfo.roles.length&&b.userInfo.permissions&&0!=b.userInfo.permissions.length)return a.filter(function(a){return b.userInfo.permissions.indexOf(a)>=0}).length>0}return!1},b.checkContentAccess=function(a,c){if(b.userInfo&&a&&c){if(b.userInfo.id===openVeoSettings.superAdminId||a.metadata.user===openVeoSettings.anonymousId||b.userInfo.id===a.metadata.user)return!0;if(a.metadata.groups&&a.metadata.groups.length)for(var d=q(a.metadata.groups,c),e=0;e<d.length;e++)if(b.userInfo.permissions.indexOf(d[e])>=0)return!0}return!1},b.hasPermission=function(a){return!!(b.userInfo&&b.userInfo.permissions&&a)&&b.userInfo.permissions.indexOf(a)>=0}}a.controller("MainController",b),b.$inject=["$rootScope","$scope","$location","$route","authenticationService","menuService","applicationService","userService","i18nService","alertService","entityService","$window","$q"]}(angular.module("ov"));;"use strict";!function(a){function b(a,b,c,d,e){var f=openVeoSettings.authenticationStrategies;a.verticalAlign=!0,a.onError=!1,a.languages=e.getLanguages(),a.language=e.getLanguage(),a.isPending=!1,a.hasCas=openVeoSettings.authenticationMechanisms.indexOf(f.CAS)>=0,a.changeLanguage=function(a){e.setLanguage(a),c.location.reload()},a.signIn=function(){a.isPending=!0,d.login(a.userLogin,a.password).then(function(c){a.isPending=!1,d.setUserInfo(c.data),b.path("/")},function(){a.isPending=!1,a.onError=!0,a.userLogin=a.password=""})}}a.controller("LoginController",b),b.$inject=["$scope","$location","$window","authenticationService","i18nService"]}(angular.module("ov"));;"use strict";!function(a){function b(a,b){a.version=openVeoSettings.version,a.open=function(c){b.open({templateUrl:"versionModal.html",controller:"ModalInstanceCtrl",size:c,resolve:{items:function(){return a.version}}})}}function c(a,b,c){a.items=c,a.close=function(){b.close("close")}}a.controller("HomeController",b),a.controller("ModalInstanceCtrl",c),b.$inject=["$scope","$uibModal"],c.$inject=["$scope","$uibModalInstance","items"]}(angular.module("ov"));;"use strict";!function(a){function b(a,b,c,d){function e(){angular.forEach(a.scopes,function(a){a.name=b("translate")(a.name),a.description=b("translate")(a.description)})}function f(d,e){c.removeEntities(i,null,d.join(",")).then(function(){a.$emit("setAlert","success",b("translate")("CORE.APPLICATIONS.REMOVE_SUCCESS"),4e3),e()})}function g(a){return c.updateEntity(i,null,a.id,{name:a.name,scopes:a.scopes})}function h(a){return c.addEntities(i,null,[a])}var i="applications";a.scopes=d.data.scopes,e(),a.rights={},a.rights.add=a.checkAccess("core-add-"+i),a.rights.edit=a.checkAccess("core-update-"+i),a.rights.delete=a.checkAccess("core-delete-"+i);var j=a.tableContainer={};j.entityType=i,j.filterBy=[{key:"query",value:"",label:b("translate")("CORE.APPLICATIONS.QUERY_FILTER")}],j.header=[{key:"name",name:b("translate")("CORE.APPLICATIONS.NAME_COLUMN"),class:["col-xs-11"]},{key:"action",name:b("translate")("CORE.UI.ACTIONS_COLUMN"),class:["col-xs-1"]}],j.actions=[{label:b("translate")("CORE.UI.REMOVE"),warningPopup:!0,condition:function(b){return a.rights.delete&&!b.locked&&!b.saving},callback:function(a,b){f([a.id],b)},global:function(a,b){f(a,b)}}];var k=a.editFormContainer={};k.model={},k.entityType=i,k.init=function(a){k.fields[1].templateOptions.message=a.id,k.fields[2].templateOptions.message=a.secret},k.fields=[{key:"name",type:"horizontalEditableInput",templateOptions:{label:b("translate")("CORE.APPLICATIONS.ATTR_NAME"),required:!0}},{noFormControl:!0,type:"emptyrow",templateOptions:{label:b("translate")("CORE.APPLICATIONS.ATTR_ID"),message:""}},{noFormControl:!0,type:"emptyrow",templateOptions:{label:b("translate")("CORE.APPLICATIONS.ATTR_SECRET"),message:""}}],0!=a.scopes.length&&k.fields.push({key:"scopes",type:"horizontalEditableMultiCheckbox",templateOptions:{label:b("translate")("CORE.APPLICATIONS.ATTR_SCOPES"),options:a.scopes,valueProperty:"id",labelProperty:"name"}}),k.conditionEditDetail=function(b){return a.rights.edit&&!b.locked},k.onSubmit=function(a){return g(a)};var l=a.addFormContainer={};l.model={},l.fields=[{key:"name",type:"horizontalInput",templateOptions:{label:b("translate")("CORE.APPLICATIONS.FORM_ADD_NAME"),required:!0,description:b("translate")("CORE.APPLICATIONS.FORM_ADD_NAME_DESC")}}],0==a.scopes.length?l.fields.push({noFormControl:!0,template:"<p>"+b("translate")("CORE.APPLICATIONS.NO_APPLICATIONS")+"</p>"}):l.fields.push({key:"scopes",type:"horizontalMultiCheckbox",templateOptions:{label:b("translate")("CORE.APPLICATIONS.FORM_ADD_SCOPES"),required:!1,options:a.scopes,valueProperty:"id",labelProperty:"name",description:b("translate")("CORE.APPLICATIONS.FORM_ADD_SCOPES_DESC")},expressionProperties:{"templateOptions.disabled":"!model.name"}}),l.onSubmit=function(a){return h(a)}}a.controller("ApplicationController",b),b.$inject=["$scope","$filter","entityService","scopes"]}(angular.module("ov"));;"use strict";!function(a){function b(a,b,c,d){function e(){angular.forEach(a.permissions,function(a){a.label=b("translate")(a.label),angular.forEach(a.permissions,function(a){a.name=b("translate")(a.name),a.description=b("translate")(a.description)})})}function f(a){var b={name:a.name,permissions:[]};return angular.forEach(a,function(a,c){var d="permissions_";c.slice(0,d.length)==d&&(b.permissions=b.permissions.concat(a))}),b}function g(a){var b=f(a);return c.updateEntity(k,null,a.id,b).then(function(){a.permissions=angular.copy(b.permissions)})}function h(a){var b=f(a);return c.addEntities(k,null,[b]).then(function(){a.permissions=angular.copy(b.permissions)})}function i(a,b){var c={};return angular.forEach(a,function(a,d){angular.forEach(a.permissions,function(a){c["permissions_"+d]||(c["permissions_"+d]=[]),b.indexOf(a.id)>=0&&c["permissions_"+d].push(a.id)})}),c}function j(d,e){c.removeEntities(k,null,d.join(",")).then(function(){a.$emit("setAlert","success",b("translate")("CORE.ROLES.REMOVE_SUCCESS"),4e3),e()})}var k="roles";a.permissions=d.data.permissions;var l;e(),a.rights={},a.rights.add=a.checkAccess("core-add-"+k),a.rights.edit=a.checkAccess("core-update-"+k),a.rights.delete=a.checkAccess("core-delete-"+k);var m=a.tableContainer={};m.entityType=k,m.filterBy=[{key:"query",value:"",label:b("translate")("CORE.ROLES.QUERY_FILTER")}],m.header=[{key:"name",name:b("translate")("CORE.ROLES.NAME_COLUMN"),class:["col-xs-11"]},{key:"action",name:b("translate")("CORE.UI.ACTIONS_COLUMN"),class:["col-xs-1"]}],m.actions=[{label:b("translate")("CORE.UI.REMOVE"),warningPopup:!0,condition:function(b){return a.rights.delete&&!b.locked&&!b.saving},callback:function(a,b){j([a.id],b)},global:function(a,b){j(a,b)}}];var n=a.editFormContainer={};n.model={},n.entityType=k,n.init=function(b){var c=i(a.permissions,b.permissions);angular.forEach(c,function(a,c){b[c]=a})},n.fields=[{key:"name",type:"horizontalEditableInput",templateOptions:{label:b("translate")("CORE.ROLES.ATTR_NAME"),required:!0}}],0==a.permissions.length?n.fields.push({noFormControl:!0,template:"<p>"+b("translate")("CORE.ROLES.NO_DATA")+"</p>"}):(l=[],n.fields.push({noFormControl:!0,templateOptions:{label:b("translate")("CORE.ROLES.FORM_ADD_PERMISSIONS")},wrapper:["horizontalBootstrapLabelOnly"],template:""}),angular.forEach(a.permissions,function(a,b){l.push({key:"permissions_"+b,type:"ovEditableMultiCheckBox",wrapper:["editableWrapper","collapse"],templateOptions:{label:"",labelCollapse:a.label,options:a.permissions,valueProperty:"id",labelProperty:"name"}})}),n.fields.push({className:"col-md-8 col-push-md-4",fieldGroup:l})),n.conditionEditDetail=function(b){return a.rights.edit&&!b.locked},n.onSubmit=function(a){return g(a)};var o=a.addFormContainer={};o.model={},o.fields=[{key:"name",type:"horizontalInput",templateOptions:{label:b("translate")("CORE.ROLES.FORM_ADD_NAME"),required:!0,description:b("translate")("CORE.ROLES.FORM_ADD_NAME_DESC")}}],0==a.permissions.length?o.fields.push({noFormControl:!0,template:"<p>"+b("translate")("CORE.ROLES.NO_DATA")+"</p>"}):(l=[],o.fields.push({noFormControl:!0,templateOptions:{label:b("translate")("CORE.ROLES.FORM_ADD_PERMISSIONS")},wrapper:["horizontalBootstrapLabelOnly"],template:""}),angular.forEach(a.permissions,function(a,b){l.push({key:"permissions_"+b,type:"ovMultiCheckBox",wrapper:["collapse"],templateOptions:{label:"",labelCollapse:a.label,options:a.permissions,valueProperty:"id",labelProperty:"name"}})}),o.fields.push({className:"col-md-8 col-push-md-4",fieldGroup:l})),o.onSubmit=function(a){return h(a)}}a.controller("RoleController",b),b.$inject=["$scope","$filter","entityService","permissions"]}(angular.module("ov"));;"use strict";!function(a){function b(a,b,c,d){function e(a){var b={name:a.name,email:a.email,password:a.password,passwordValidate:a.passwordValidate,roles:a.roles||[]};return c.addEntities(i,null,[b])}function f(d,e){c.removeEntities(i,null,d.join(",")).then(function(){a.$emit("setAlert","success",b("translate")("CORE.USERS.REMOVE_SUCCESS"),4e3),e()})}function g(a){return c.updateEntity(i,null,a.id,{name:a.name,email:a.email,roles:a.roles})}function h(){var a=[{value:null,name:b("translate")("CORE.USERS.ORIGIN_FILTER_ALL")}];return openVeoSettings.authenticationMechanisms.forEach(function(c){a.push({name:b("translate")("CORE.USERS.ORIGIN_FILTER_"+c.toUpperCase()),value:c})}),a}var i="users",j="^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$";a.roles=d.data.entities,a.rights={},a.rights.add=a.checkAccess("core-add-"+i),a.rights.edit=a.checkAccess("core-update-"+i),a.rights.delete=a.checkAccess("core-delete-"+i);var k=a.tableContainer={};k.entityType=i,k.filterBy=[{key:"query",value:"",label:b("translate")("CORE.USERS.QUERY_FILTER")},{key:"origin",type:"select",param:"origin",value:null,label:b("translate")("CORE.USERS.ORIGIN_FILTER"),options:h()}],k.header=[{key:"name",name:b("translate")("CORE.USERS.NAME_COLUMN"),class:["col-xs-11"]},{key:"action",name:b("translate")("CORE.UI.ACTIONS_COLUMN"),class:["col-xs-1"]}],k.actions=[{label:b("translate")("CORE.UI.REMOVE"),warningPopup:!0,condition:function(b){return a.rights.delete&&!b.locked&&!b.saving},callback:function(a,b){f([a.id],b)},global:function(a,b){f(a,b)}}];var l=a.editFormContainer={};l.model={},l.entityType=i,l.fields=[{key:"originLiteral",type:"simple",templateOptions:{label:b("translate")("CORE.USERS.ATTR_ORIGIN")}},{key:"name",type:"horizontalEditableInput",templateOptions:{label:b("translate")("CORE.USERS.ATTR_NAME"),required:!0}},{key:"email",type:"horizontalEditableInput",templateOptions:{label:b("translate")("CORE.USERS.ATTR_EMAIL"),required:!0,pattern:j}}],0!=a.roles.length&&l.fields.push({key:"roles",type:"horizontalEditableMultiCheckbox",templateOptions:{label:b("translate")("CORE.USERS.ATTR_ROLE"),required:!1,options:a.roles,valueProperty:"id",labelProperty:"name"}}),l.conditionEditDetail=function(b){return a.rights.edit&&!b.locked},l.onSubmit=function(a){return g(a)},l.init=function(a){a.originLiteral=b("translate")("CORE.USERS.ORIGIN_"+a.origin.toUpperCase())};var m=a.addFormContainer={};m.model={},m.fields=[{key:"name",type:"horizontalInput",templateOptions:{label:b("translate")("CORE.USERS.FORM_ADD_NAME"),required:!0,description:b("translate")("CORE.USERS.FORM_ADD_NAME_DESC")}},{key:"email",type:"horizontalInput",templateOptions:{type:"email",label:b("translate")("CORE.USERS.FORM_ADD_EMAIL"),required:!0,description:b("translate")("CORE.USERS.FORM_ADD_EMAIL_DESC"),pattern:j},expressionProperties:{"templateOptions.disabled":"!model.name"}},{key:"password",type:"horizontalInput",templateOptions:{type:"password",label:b("translate")("CORE.USERS.FORM_ADD_PASSWORD"),required:!0,description:b("translate")("CORE.USERS.FORM_ADD_PASSWORD_DESC")},expressionProperties:{"templateOptions.disabled":"!model.email"}},{key:"passwordValidate",type:"horizontalInput",templateOptions:{type:"password",label:b("translate")("CORE.USERS.FORM_ADD_PASSWORD_VALIDATE"),required:!0,description:b("translate")("CORE.USERS.FORM_ADD_PASSWORD_VALIDATE_DESC")},expressionProperties:{"templateOptions.disabled":"!model.password"}}],0==a.roles.length?m.fields.push({noFormControl:!0,type:"emptyrow",templateOptions:{label:b("translate")("CORE.USERS.FORM_ADD_ROLE"),message:b("translate")("CORE.USERS.NO_ROLE")}}):m.fields.push({key:"roles",type:"horizontalMultiCheckbox",templateOptions:{label:b("translate")("CORE.USERS.FORM_ADD_ROLE"),required:!1,options:a.roles,valueProperty:"id",labelProperty:"name",description:b("translate")("CORE.USERS.FORM_ADD_ROLE_DESC")},expressionProperties:{"templateOptions.disabled":"!model.passwordValidate"}}),m.onSubmit=function(a){return e(a)}}a.controller("UserController",b),b.$inject=["$scope","$filter","entityService","roles"]}(angular.module("ov"));;"use strict";!function(a){function b(a,b,c,d){function e(a){return c.addEntities(h,null,[a]).then(function(){d.cacheClear("permissions")})}function f(a){return c.updateEntity(h,null,a.id,a).then(function(){d.cacheClear("permissions")})}function g(e,f){c.removeEntities(h,null,e.join(",")).then(function(){d.cacheClear("permissions"),a.$emit("setAlert","success",b("translate")("CORE.GROUPS.REMOVE_SUCCESS"),4e3),f()})}var h="groups";a.rights={},a.rights.add=a.checkAccess("core-add-"+h),a.rights.edit=a.checkAccess("core-update-"+h),a.rights.delete=a.checkAccess("core-delete-"+h);var i=a.addFormContainer={};i.model={},i.fields=[{key:"name",type:"horizontalInput",templateOptions:{label:b("translate")("CORE.GROUPS.FORM_ADD_NAME"),required:!0,description:b("translate")("CORE.GROUPS.FORM_ADD_NAME_DESC")}},{key:"description",type:"horizontalInput",templateOptions:{label:b("translate")("CORE.GROUPS.FORM_ADD_DESCRIPTION"),required:!0,description:b("translate")("CORE.GROUPS.FORM_ADD_DESCRIPTION_DESC")}}],i.onSubmit=function(a){return e(a)};var j=a.tableContainer={};j.entityType=h,j.filterBy=[{key:"query",label:b("translate")("CORE.GROUPS.QUERY_FILTER")}],j.header=[{key:"name",name:b("translate")("CORE.GROUPS.NAME_COLUMN"),class:["col-xs-11"]},{key:"action",name:b("translate")("CORE.UI.ACTIONS_COLUMN"),class:["col-xs-1"]}],j.actions=[{label:b("translate")("CORE.UI.REMOVE"),warningPopup:!0,condition:function(b){return a.rights.delete&&!b.locked&&!b.saving},callback:function(a,b){g([a.id],b)},global:function(a,b){g(a,b)}}];var k=a.editFormContainer={};k.model={},k.entityType=h,k.fields=[{key:"name",type:"horizontalEditableInput",templateOptions:{label:b("translate")("CORE.GROUPS.ATTR_NAME"),required:!0}},{key:"description",type:"horizontalEditableInput",templateOptions:{label:b("translate")("CORE.GROUPS.ATTR_DESCRIPTION"),required:!0}}],k.conditionEditDetail=function(b){return a.rights.edit&&!b.locked},k.onSubmit=function(a){return f(a)}}a.controller("GroupController",b),b.$inject=["$scope","$filter","entityService","userService"]}(angular.module("ov"));;"use strict";!function(a){function b(a,b,c,d,e){function f(){var a="";if(e.roles&&e.roles.length){var b=0;for(b=0;b<e.roles.length-1;b++)a+=e.roles[b].name+", ";a+=e.roles[b].name}return a}function g(a){return a.saving=!0,i.user.name=a.name,d.updateEntity(h,null,a.id,{name:a.name,email:a.email}).then(function(){c.setUserInfo(e)}).finally(function(){a.saving=!1})}var h="users",i=this;this.password="",this.confirmPassword="",this.isInvalid=!0,this.isSaving=!1,this.user=e,this.roles=f()||b("translate")("CORE.PROFILES.NO_ROLES"),this.authenticationStrategies=openVeoSettings.authenticationStrategies;var j=a.editFormContainer={};a.row=this.user,j.entityType=h,this.user.origin===openVeoSettings.authenticationStrategies.LOCAL&&(j.fields=[{key:"name",type:"horizontalEditableInput",templateOptions:{label:b("translate")("CORE.PROFILES.ATTR_NAME"),required:!0}},{key:"email",type:"emptyrow",templateOptions:{label:b("translate")("CORE.PROFILES.ATTR_EMAIL"),message:this.user.email}}],this.user.roles&&this.user.roles.length&&j.fields.push({noFormControl:!0,type:"emptyrow",templateOptions:{label:b("translate")("CORE.PROFILES.ATTR_ROLES"),message:f()}})),j.conditionEditDetail=function(a){return a.id!==openVeoSettings.superAdminId&&!a.locked},j.onSubmit=function(a){return g(a)},this.updatePassword=function(){this.isSaving=!0,d.updateEntity(h,null,this.user.id,{password:this.password,passwordValidate:this.confirmPassword,email:this.email}).then(function(){i.isSaving=!1,i.resetForm(),a.$emit("setAlert","success",b("translate")("CORE.UI.SAVE_SUCCESS"),4e3)},function(a,b){i.isSaving=!1})},this.resetForm=function(){this.password="",this.confirmPassword="",this.isInvalid=!0},this.checkValid=function(){return this.isInvalid=!this.password||!this.confirmPassword||this.password!==this.confirmPassword,this.isInvalid},this.passwordEditable=function(){return this.user.id!=openVeoSettings.superAdminId&&!this.user.locked&&this.user.origin===openVeoSettings.authenticationStrategies.LOCAL}}a.controller("ProfileController",b),b.$inject=["$scope","$filter","authenticationService","entityService","user"]}(angular.module("ov"));;"use strict";!function(a,b){function c(b,c,d){function e(){if(i){var b=d.path();for(var c in i)if(a.isArray(i[c].subMenu)){i[c].active=!1;for(var e=0;e<i[c].subMenu.length;e++)i[c].subMenu[e].active="/"+i[c].subMenu[e].path===b,i[c].active=i[c].active||i[c].subMenu[e].active}else i[c].active="/"+i[c].path===b}}function f(){return i?c.when(i):b.get(j+"getMenu").success(function(a){i=a,e()})}function g(){return i}function h(){i=null}var i,j="/be/";return{loadMenu:f,getMenu:g,destroyMenu:h,setActiveMenuItem:e}}b.factory("menuService",c),c.$inject=["$http","$q","$location"]}(angular,angular.module("ov"));;"use strict";!function(a){function b(a,b){function c(){return g?b.when({data:g}):a.get(h+"permissions").success(function(a){g=a})}function d(){return g}function e(){g=null}function f(a){if(a)switch(a){case"permissions":g=null;break;default:return}else g=null}var g,h="/be/";return{loadPermissions:c,getPermissions:d,destroy:e,cacheClear:f}}a.factory("userService",b),b.$inject=["$http","$q"]}(angular.module("ov"));;"use strict";!function(a){function b(a,b){function c(){return f?b.when({data:f}):a.get(g+"ws/scopes").success(function(a){f=a})}function d(){return f}function e(){f=null}var f,g="/be/";return{destroy:e,loadScopes:c,getScopes:d}}a.factory("applicationService",b),b.$inject=["$http","$q"]}(angular.module("ov"));;"use strict";!function(a,b){function c(){var a=35;return function(b){return b&&""!=b&&b.length>a&&(b=b.slice(0,a)+"..."),b}}b.filter("truncate",c)}(angular,angular.module("ov"));;"use strict";!function(a){function b(){return{restrict:"E",templateUrl:"ov-core-tags.html",require:["?ngModel"],replace:!0,scope:{ovAvailableOptions:"=?",ovPlaceholder:"=?"},link:function(a,b,c,d){function e(){a.ovAvailableOptions=a.availableOptions="undefined"==typeof a.ovAvailableOptions?null:a.ovAvailableOptions,a.ovPlaceholder=a.placeholder="undefined"==typeof a.ovPlaceholder?"":a.ovPlaceholder}function f(){if(!a.availableOptions)return angular.copy(a.tags);var b=[];return a.tags.forEach(function(c){for(var d=0;d<a.availableOptions.length;d++)if(a.availableOptions[d].name===c){b.push(a.availableOptions[d].value);break}}),b}var g=d[0];a.editableTagsInput="",a.autoCompleteValues=[],g.$render=function(){a.availableOptions?(a.tags=[],(g.$viewValue||[]).forEach(function(b){for(var c=0;c<a.availableOptions.length;c++)if(a.availableOptions[c].value===b){a.tags.push(a.availableOptions[c].name);break}})):a.tags=angular.copy(g.$viewValue)||[]},a.addTag=function(b){if(!a.availableOptions&&b&&a.tags.indexOf(b)===-1)return a.editableTagsInput="",a.tags.push(b),g.$setViewValue(f()),void g.$validate();if(a.availableOptions)for(var c=0;c<a.availableOptions.length;c++)if(a.availableOptions[c].name===b){b&&a.tags.indexOf(a.availableOptions[c].name)===-1&&(a.tags.push(b),g.$setViewValue(f()),g.$validate()),a.editableTagsInput="",a.autoComplete();break}},a.handleKeys=function(b){13===b.keyCode&&(a.addTag(a.editableTagsInput),b.stopImmediatePropagation(),b.stopPropagation(),b.preventDefault())},a.removeTag=function(b,c){a.tags.splice(c,1),g.$setViewValue(f()),b.stopImmediatePropagation(),b.stopPropagation(),b.preventDefault(),g.$validate()},a.autoComplete=function(){a.availableOptions&&(a.autoCompleteValues.splice(0,a.autoCompleteValues.length),a.editableTagsInput&&a.availableOptions.forEach(function(b){0===b.name.toLowerCase().indexOf(a.editableTagsInput.toLowerCase())&&a.autoCompleteValues.push(b)}))},g.$isEmpty=function(a){return!a||0===a.length},a.$watch("ovAvailableOptions",e),a.$watch("ovPlaceholder",e),e()}}}a.directive("ovTags",b)}(angular.module("ov"));;"use strict";!function(a){function b(){return{restrict:"E",templateUrl:"ov-core-mutli-check-box.html",require:["?ngModel"],replace:!0,scope:{options:"=",labelProperty:"=?",valueProperty:"=?",disabled:"=?"},link:function(a,b,c,d){function e(b){for(var c=0;c<a.options.length;c++)if(a.options[c][a.valueProperty]===b)return c;return-1}var f,g=d[0],h=NaN;a.labelProperty=a.labelProperty||"name",a.valueProperty=a.valueProperty||"value",g.$render=function(){var b=angular.copy(g.$viewValue)||[];a.values=[];for(var c=0;c<b.length;c++){var d=e(b[c]);d>=0&&(a.values[d]=!0)}},a.onChange=function(){for(var b=[],c=0;c<a.values.length;c++)a.values[c]&&b.push(a.options[c][a.valueProperty]);g.$setViewValue(b)},a.$watch(function(){h!==g.$viewValue||angular.equals(f,g.$viewValue)||(f=angular.copy(g.$viewValue),g.$render()),h=g.$viewValue}),g.$isEmpty=function(a){return!a||0===a.length}}}}a.directive("ovMultiCheckBox",b)}(angular.module("ov"));;"use strict";!function(a){function b(){return{restrict:"E",templateUrl:"ov-core-match.html",require:["?ngModel"],replace:!0,scope:{ovMultiple:"=?",ovAvailableOptions:"=?",ovAddLabel:"=?",ovInputPlaceholder:"=?",ovTagsPlaceholder:"=?",ovInputProperty:"=?",ovTagsProperty:"=?"},link:function(a,b,c,d){function e(){a.ovAddLabel=a.addLabel="undefined"==typeof a.ovAddLabel?"":a.ovAddLabel,a.ovMultiple=a.multiple="undefined"==typeof a.ovMultiple||a.ovMultiple,a.ovAvailableOptions=a.availableOptions="undefined"==typeof a.ovAvailableOptions?null:a.ovAvailableOptions,a.ovInputPlaceholder=a.inputPlaceholder="undefined"==typeof a.ovInputPlaceholder?"":a.ovInputPlaceholder,a.ovTagsPlaceholder=a.tagsPlaceholder="undefined"==typeof a.ovTagsPlaceholder?"":a.ovTagsPlaceholder,a.ovInputProperty=a.inputProperty="undefined"==typeof a.ovInputProperty?"value":a.ovInputProperty,a.ovTagsProperty=a.tagsProperty="undefined"==typeof a.ovTagsProperty?"values":a.ovTagsProperty}var f=d[0];f.$render=function(){a.matches=angular.copy(f.$viewValue)||[]},a.addMatch=function(){a.matches.push({}),a.updateModel()},a.removeMatch=function(b){a.matches.splice(b,1),a.updateModel()},a.updateModel=function(){f.$setViewValue(angular.copy(a.matches)),f.$validate()},f.$isEmpty=function(a){return!(a&&0!==a.length&&(1!==a.length||a[0].value&&a[0].values&&a[0].values.length))},a.$watch("ovAddLabel",e),a.$watch("ovMultiple",e),a.$watch("ovAvailableOptions",e),a.$watch("ovInputPlaceholder",e),a.$watch("ovTagsPlaceholder",e),e()}}}a.directive("ovMatch",b)}(angular.module("ov"));;"use strict";!function(a){function b(a,b,c,d,e,f,g){function h(){var a=[];return g.data.entities.forEach(function(b){a.push({name:b.name,value:b.id})}),a}var i=openVeoSettings.authenticationStrategies;this.isSaving=!1,this.hasLdap=openVeoSettings.authenticationMechanisms.indexOf(i.LDAP)>=0,this.hasCas=openVeoSettings.authenticationMechanisms.indexOf(i.CAS)>=0,this.formValues={hasLdap:this.hasLdap,hasCas:this.hasCas,ldapMatches:e.data.entity&&e.data.entity.value,casMatches:f.data.entity&&f.data.entity.value};var j=h();this.formFields=[{type:"section",templateOptions:{title:b("translate")("CORE.SETTINGS.LDAP.TITLE")},hideExpression:"!model.hasLdap"},{key:"ldapMatches",type:"horizontalMatch",templateOptions:{label:b("translate")("CORE.SETTINGS.LDAP.GROUP_ASSOC_LABEL"),description:b("translate")("CORE.SETTINGS.LDAP.GROUP_ASSOC_DESC"),addLabel:b("translate")("CORE.SETTINGS.LDAP.GROUP_ASSOC_ADD"),multiple:!0,inputPlaceholder:b("translate")("CORE.SETTINGS.LDAP.GROUP_ASSOC_INPUT"),tagsPlaceholder:b("translate")("CORE.SETTINGS.LDAP.GROUP_ASSOC_TAGS"),availableOptions:j,inputProperty:"group",tagsProperty:"roles"},hideExpression:"!model.hasLdap"},{type:"section",templateOptions:{title:b("translate")("CORE.SETTINGS.CAS.TITLE")},hideExpression:"!model.hasCas"},{key:"casMatches",type:"horizontalMatch",templateOptions:{label:b("translate")("CORE.SETTINGS.CAS.GROUP_ASSOC_LABEL"),description:b("translate")("CORE.SETTINGS.CAS.GROUP_ASSOC_DESC"),addLabel:b("translate")("CORE.SETTINGS.CAS.GROUP_ASSOC_ADD"),multiple:!0,inputPlaceholder:b("translate")("CORE.SETTINGS.CAS.GROUP_ASSOC_INPUT"),tagsPlaceholder:b("translate")("CORE.SETTINGS.CAS.GROUP_ASSOC_TAGS"),availableOptions:j,inputProperty:"group",tagsProperty:"roles"},hideExpression:"!model.hasCas"}],this.save=function(){var c=this,e=[];this.hasLdap&&this.formValues.ldapMatches&&e.push({id:"core-"+i.LDAP,value:this.formValues.ldapMatches}),this.hasCas&&this.formValues.casMatches&&e.push({id:"core-"+i.CAS,value:this.formValues.casMatches}),e.length&&(this.isSaving=!0,d.addEntities("settings",null,e).then(function(){c.isSaving=!1,a.$emit("setAlert","success",b("translate")("CORE.SETTINGS.SAVE_SUCCESS"),4e3)}))}}a.controller("SettingsController",b),b.$inject=["$scope","$filter","$q","entityService","ldapSettings","casSettings","roles"]}(angular.module("ov"));