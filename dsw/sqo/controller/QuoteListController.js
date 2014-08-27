define([
    "dojo/_base/lang",
    "dijit/registry", 
    "dojo/dom",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojox/mobile/ListItem",
    "dsw/sqo/widget/QuoteSearchResultItem",
    "dojox/mobile/EdgeToEdgeCategory",
    "dojox/mobile/EdgeToEdgeList",
], function(lang, registry, dom, on, domConstruct, domClass, ListItem, QuoteSearchResultItem, EdgeToEdgeCategory, EdgeToEdgeList){
	lang.getObject("dsw.sqo.controller.QuoteListController", true);
	
	dsw.sqo.controller.QuoteListController = {
		init: function(){
			
        },
        
        maxNumPerPage: 10,
        pageIncrement: 2,
        totalPageNum: 0, 
        totalResultNum: 0,
        pullToLoadPanelDisplayed: false,
        loadOnTouchEnd: false,
        byFilter: false,
        favoriteOnly: false, 
        quoteNum: "", 
        custName: "", 
        pageIndex: "",
        
        initPullToLoad: function() {
			var self = this;
			var scrollableView = registry.byId("quoteListScrollView");
	     	var pullToLoadPanel = dom.byId("pullToLoadPanel");
			
     		var displayPullToLoadPanel = function() {
     			self.pullToLoadPanelDisplayed = true;
				pullToLoadPanel.style.display="block";
     		};

     		var hidePullToLoadPanel = function() {
     			self.pullToLoadPanelDisplayed = false;
				pullToLoadPanel.style.display="none";
     		};
     		
     		scrollableView.on("beforescroll", function(evt){
				if(evt.afterBottom){
					if(self.pageIncrement <= self.totalPageNum){
						// display the pullToLoadPanel panel if it is not
						if(!self.pullToLoadPanelDisplayed){
							displayPullToLoadPanel();
						}
						// resize the pullToLoadPanel according to the scroll destination
						pullToLoadPanel.style.height= evt.afterBottomHeight + "px";
						pullToLoadPanel.style.bottom= -evt.afterBottomHeight + "px";
					}
				}else{
					// hide the pullToLoadPanel panel if it is displayed
					if(self.pullToLoadPanelDisplayed){
						hidePullToLoadPanel();
					}
				}
				
				if(evt.afterBottomHeight > 80){
					if(self.pageIncrement <= self.totalPageNum){
						domClass.remove(pullToLoadPanel, "pullUpToLoad");
						domClass.add(pullToLoadPanel, "releaseToLoad");
						self.loadOnTouchEnd = true;
					}
				}else{
					domClass.remove(pullToLoadPanel, "releaseToLoad");
					domClass.add(pullToLoadPanel, "pullUpToLoad");
					self.loadOnTouchEnd = false;
				}
     		});

     		scrollableView.on("touchend", function(evt){
				if(self.pageIncrement <= self.totalPageNum) {
					// We're done scrolling:
					// - hide the pullToLoadPanel if it is displayed
					// - perform refresh if specified
					if(self.pullToLoadPanelDisplayed){
						hidePullToLoadPanel();
					}
					if(self.loadOnTouchEnd){
						self.loadOnTouchEnd = false;
						self.expandQuoteList();
					}
				}
		    });
        },
        
        destroyPullToLoad: function() {
	     	var pullToLoadPanel = dom.byId("pullToLoadPanel");
	     	pullToLoadPanel.style.display="none";
	     	domClass.remove(pullToLoadPanel);
	     	
	     	this.pageIncrement = 2;
	     	this.totalPageNum = 0;
	     	this.totalResultNum = 0;
	     	this.pullToLoadPanelDisplayed = false;
	     	this.loadOnTouchEnd = false;
        },
        
		reloadQuoteList: function(byFilter, favoriteOnly, quoteNum, custName, pageIndex) {
			registry.byId("quoteListScrollView").slideTo({y:0}, 0.3, "ease-out");
			busyInd.show();
			this.hideWarningMessage();
			this.destroyPullToLoad();
			
			if(registry.byId("quoteListInMain")){
				registry.byId("quoteListInMain").destroy();
			}
			
			var self = this;
			self.byFilter = byFilter; 
			self.favoriteOnly = favoriteOnly; 
			self.quoteNum = quoteNum; 
			self.custName = custName; 
			self.pageIndex = pageIndex;
			
			var searchHeader = registry.byId("quoteListHeader");
            	     
           	if(self.favoriteOnly){
            	searchHeader.set("label", "Favorite quotes");
            } else if(currentSearch == 'byRecent'){
 				searchHeader.set("label", "Recent quotes");
            } else if(currentSearch == 'byAll'){
            	searchHeader.set("label", "All quotes");
            } else {
            	searchHeader.set("label", "Search results");
            }
           	registry.byId("clearAll").set("style", "visibility:hidden");
           	
        	// Load quote list
 			callSearchService(self.byFilter, self.favoriteOnly, self.quoteNum, self.custName, self.pageIndex, function(response){
    			if(!response.invocationResult.quoteList){
    				var returnCode = response.invocationResult.result.returnCode;
    				if(returnCode == "0" ){
    					self.showWarningMessage();
    					busyInd.hide();
    					return;
    				}
    			}
    			
    			var availableCount = response.invocationResult.availableCount;
    			if(availableCount > 0 && (currentSearch == 'byFavorite' || currentSearch == 'byRecent')){
               		registry.byId("clearAll").set("style", "visibility:visible");
               	}
    			
    			var quoteList = response.invocationResult.quoteList;
    			if(quoteList.length == 0){
    				self.showWarningMessage();
    				busyInd.hide();
    				return;
    			}
    			
                var roundRectLists = new EdgeToEdgeList({
             	   id: "quoteListInMain"
                });
                
                self.buildQuoteList(quoteList, roundRectLists);
                
                self.totalResultNum = parseInt(response.invocationResult.totalNum);
                self.totalPageNum = parseInt(self.totalResultNum / self.maxNumPerPage);
				if(self.totalResultNum % self.maxNumPerPage > 0){
					self.totalPageNum = self.totalPageNum + 1;
				}
				
				if(self.totalResultNum > self.maxNumPerPage){
					var paginationInfo = "(" + (self.maxNumPerPage * self.pageIndex) + "/" + self.totalResultNum + ") Pull up to load more quotes...";
					self.initPullToLoad();
					roundRectLists.addChild(new EdgeToEdgeCategory({
						id : "paginationInfoPanel",
						label : paginationInfo,
						style : "text-align:center",
					}));
				}
				
				roundRectLists.startup();
				domConstruct.place(roundRectLists.domNode, registry.byId('quoteListScrollView').containerNode, 0);
				busyInd.hide();
            },
            function(error){
            	console.error("Just let you know that I'm still loading quotes in the backend...");
            	busyInd.hide();
            });
        },
        
        expandQuoteList: function() {
			var self = this;
			busyInd.show();
			
			self.pageIndex = self.pageIncrement + "";
        	// Load quote list
 			callSearchService(self.byFilter, self.favoriteOnly, self.quoteNum, self.custName, self.pageIndex, function(response){
    			if(!response.invocationResult.quoteList){
    				var returnCode = response.invocationResult.result.returnCode;
    				if(returnCode == "0" ){
    					self.showWarningMessage();
    					busyInd.hide();
    					return;
    				}
    			}
    			
    			var quoteList = response.invocationResult.quoteList;
    			if(quoteList.length == 0){
    				self.showWarningMessage();
    				busyInd.hide();
    				return;
    			}
                
                var roundRectLists = registry.byId("quoteListInMain");
				var h = roundRectLists.domNode.clientHeight;
				registry.byId("quoteListScrollView").slideTo({y:-(h-80)}, 0.3, "ease-out");				
				
				self.buildQuoteList(quoteList, roundRectLists);
				
				if(registry.byId("paginationInfoPanel")){
					registry.byId("paginationInfoPanel").destroy();
				}
				
				var paginationInfo = "(" + (self.maxNumPerPage * self.pageIndex) + "/" +  self.totalResultNum + ") Pull up to load more quotes...";
				if(self.maxNumPerPage * self.pageIndex > self.totalResultNum){
					paginationInfo = "No more quotes";
				}
				
				roundRectLists.addChild(new EdgeToEdgeCategory({
					id : "paginationInfoPanel",
					label : paginationInfo,
					style : "text-align:center",
				}));
				
				roundRectLists.startup();
				self.pageIncrement = self.pageIncrement + 1;
				busyInd.hide();
            },
            function(error){
            	console.error("Just let you know that I'm still loading quotes in the backend...");
            	busyInd.hide();
            });    	
        },
		
		buildQuoteList: function(quoteList, roundRectLists) {
			for (var i = 0; i < quoteList.length; i++) {
				var quote = quoteList[i];
				var quoteListItem = new ListItem({
					className : "mblListItem"
				});
				if(i%2 == 1) {
					quoteListItem.set("style", "background-color:#e6e7e8");
				}
				
				// display quote summary information
				var quoteSearchResultItem = new QuoteSearchResultItem(quote);
				if (quote.quoteOverallStatuses.length > 0) {
					quoteSearchResultItem.statusDiv.innerHTML = showStatus(quote.quoteOverallStatuses).join(', ');
				}
				if (quote.quoteTitle.length > 0) {
					quoteSearchResultItem.descriptionDiv.innerHTML = "<font style='font-weight:bold'>Title: </font>" + quote.quoteTitle;
				} else {
					quoteSearchResultItem.startDateDiv.style.lineHeight = "20px";
				}
				// display bold text if search by

				var favoriteMark = domConstruct.create("button", {
					type : "button",
					onClick : "markFavorite(this, '" + quote.webQuoteNum + "', event)",
				});
				if (quote.favoriteFlag) {
					favoriteMark.setAttribute("class", "mblDomButtonBlueStar");
				} else {
					favoriteMark.setAttribute("class", "mblDomButtonGrayStar");
				}
				domConstruct.place(favoriteMark, quoteSearchResultItem.favoriteDiv);

				quoteListItem.domNode.innerHTML = quoteSearchResultItem.domNode.innerHTML;
				(function(index){
    				on(quoteListItem.domNode, "click", function(){
    					goToQuoteDetailPage(quoteList[index].webQuoteNum, 'quoteListView');
    				});
				})(i);
				roundRectLists.addChild(quoteListItem);
			}
		},
		
		showWarningMessage: function(){
			if(dom.byId("_statusMessageContainer")){
				var _statusMessageContainer = dom.byId("_statusMessageContainer");
				domClass.remove(_statusMessageContainer, "hide");
			}
		},
		
		hideWarningMessage: function(){
			if(dom.byId("_statusMessageContainer")){
				var _statusMessageContainer = dom.byId("_statusMessageContainer");
				domClass.add(_statusMessageContainer, "hide");
			}
		}
	};
	return dsw.sqo.controller.QuoteListController;
});
