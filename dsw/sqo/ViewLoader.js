define([
    "dojo/_base/lang",
    "dojo/_base/window", 
    "dojox/mobile/parser", 
    "dojo/_base/array", 
    "dojo/_base/xhr", 
    "dojo/dom-construct", 
    "dojo/dom", 
    "dijit/registry"
], function(lang, win, parser, array, xhr, domConstruct, dom, registry){
	lang.getObject("dsw.sqo.ViewLoader", true);
	
	dsw.sqo.ViewLoader = {
        // moduleInitParameters -- parameters that be needed when initilize the View, can pass to Module.init(moduleInitParameters)
        load: function(args, moduleInitParameters, callback, forceRefresh){
            var targetView = registry.byId(args.id);
            if(forceRefresh == false && targetView){
                callback();
                return;
            }

            if(targetView){
                targetView.destroyRecursive();
                // Need explictly remove the popup widget as it appends to the html tab, not in the view div
                if(args.containsMenuWidget){
                    var menuWidget =  registry.byId(args.containsMenuWidget);
                    if(menuWidget){
                        menuWidget.destroyRecursive();
                    }
                } 
            }
            var self = this;
            var xhrArgs = {
				url: args.viewUrl,
				timeout: 30000,
				handleAs: "text" //only text can work now, xml will result in null responseXML
		    };
            if (args.jsModule) {
			    require([args.jsModule], function(module){
                    xhr.get({
                        url: args.viewUrl,
                        timeout: 30000,
                        handleAs: "text",
                        load: function(data) {
                            self.createViewHTMLLoadedHandler(args)(data);
                            if (module.init)
                                module.init(moduleInitParameters);
                            // execute the callback, then can do something after the view loaded
                            if(callback){
                                callback();
                            }
                        },
                        error: handleError
                    });
                });
            }else{
                var deferred = xhr.get(xhrArgs);
                deferred.addCallback(self.createViewHTMLLoadedHandler(args));
                if(callback){
                    deferred.addCallback(callback);
                }
                deferred.addErrback(handleError);
            }    
            
            function handleError(err){
			    console.err("Oops, failed to load view.");
		    };
        },
        
        createViewHTMLLoadedHandler: function(args){
            return function(htmlText){
                // parse the html first
                var tmpContainer = domConstruct.create("DIV");
                tmpContainer.innerHTML = htmlText;
                var ws = parser.parse(tmpContainer);
                // use document fragment to loop DOM, this can improve performance
                var df = document.createDocumentFragment(); 
                for (var i = tmpContainer.childNodes.length -1; i >=0; i--) {
                    domConstruct.place(tmpContainer.childNodes[i], df, 'first');
                }
                // put the DOM to main document
                domConstruct.place(df, dom.byId("container"));
                // startup the widgets in view
                array.forEach(ws, function(w){
                    if(w && !w._started && w.startup){
                        w.startup();
                    }
                });
		    };
    	}
    };
	return dsw.sqo.ViewLoader;
});
