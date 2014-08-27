define([
    "dojo/_base/lang", 
    "../ViewLoader", 
    "../Structure", 
    "dijit/registry", 
    "dojo/dom",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/query",
    "dojo/dom-class",
    "dojox/mobile/ProgressIndicator",
    "dojox/mobile/ListItem", 
    "dsw/sqo/widget/QuoteSearchResultItem",
    "dojox/mobile/EdgeToEdgeList"
], function(lang,viewLoader,structure, registry, dom, on, domConstruct, query, domClass, ProgressIndicator, ListItem, QuoteSearchResultItem, EdgeToEdgeList){
	lang.getObject("dsw.sqo.controller.SearchResultContorller", true);
	
	dsw.sqo.controller.SearchResultContorller = {
		init: function(moduleInitParameters){
          // the effect of click the "Refresh" icon
          var searchText = moduleInitParameters.searchText;
          var prog = ProgressIndicator.getInstance();
          domConstruct.place(prog.domNode,registry.byId('searchResultScrollableView').containerNode);
          prog.start();
          this.callSearchService(searchText, function(response){
              prog.stop();
               var quoteList = response.invocationResult.quoteList;
               var edgeToEdgeList = new EdgeToEdgeList({id: "quoteListInSearchResult"});
               for(var i=0; i<quoteList.length; i++){
                   var quote = quoteList[i];
                   var listItem = new ListItem({
                       className: "mblListItem",
                       moveTo: "#"
                   });
                   // display quote summary information 
                   var quoteSearchResultItem = new QuoteSearchResultItem(quote);
                   listItem.domNode.innerHTML = quoteSearchResultItem.domNode.innerHTML;
                  (function(index){ 
                       on(listItem.domNode, "click", function(){
                           var view = structure.views["searchResultQuoteDetailView"]; 
                           viewLoader.load(view, {webQuoteNum: quoteList[index].webQuoteNum}, function(){
                               registry.byId("searchResultView").performTransition(view.id, 1, 'slide');
                           });
                       });
                   })(i);
                   edgeToEdgeList.addChild(listItem);                    
               }
               domConstruct.place(edgeToEdgeList.domNode, registry.byId('searchResultScrollableView').containerNode);
               edgeToEdgeList.startup();
             query("#refreshSearchResultBtn .mblDomButtonIdxHeadingRefreshIcon").forEach(function(item){
             on(item, "click", function(){
                 domClass.remove(item, 'mblDomButtonIdxHeadingRefreshIcon');
                 domClass.add(item, 'mblDomButtonIdxHeadingRefreshClickIcon');
                 setTimeout(function(){
                     domClass.remove(item, 'mblDomButtonIdxHeadingRefreshClickIcon');
                     domClass.add(item, 'mblDomButtonIdxHeadingRefreshIcon');
                    },100);
             });
          }); 
          }, function(error){
            alert("Oops, failed to search");
          });
          
        },
        callSearchService: function(userId, successCallback, failureCallback){
    	    var invocationData = {
				adapter: "QuoteAdapter",
				procedure: "getSearchByIBMer",
				parameters: [userId]
			};
    	    WL.Client.invokeProcedure(invocationData, {
                onSuccess: successCallback,
                onFailure: failureCallback
            });
        }
	};
	return dsw.sqo.controller.SearchResultContorller;
});
