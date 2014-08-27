define([
    "dojo/_base/lang", 
    "../ViewLoader", 
    "../Structure",
    "dijit/registry", 
    "dojo/dom",
    "dojo/on",
    "dojo/query",
    "dojo/dom-class"
], function(lang,viewLoader,structure, registry, dom, on, query, domClass){
	lang.getObject("dsw.sqo.controller.SearchController", true);
	
	dsw.sqo.controller.SearchController = {
		init: function(){
            var searchView = registry.byId('searchView');
            var searchBtn = dom.byId('searchBtn');
            var searchBox = dom.byId('searchBox');
            
            on(searchBtn, 'click', function(){
               viewLoader.load(structure.views["searchResultView"],{searchText: searchBox.value}, function(){
                    searchView.performTransition("searchResultView", 1, 'slide');
                });  
            });   
        }
        
	};
	return dsw.sqo.controller.SearchController;
});
