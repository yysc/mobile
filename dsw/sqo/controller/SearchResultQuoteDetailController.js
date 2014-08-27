define([
    "dojo/_base/lang", 
    "dijit/registry", 
    "../ViewLoader", 
    "../Structure", 
    "dojo/query", 
    "dojox/mobile/RoundRectList",
    "dojox/mobile/RoundRectCategory",
    "dojox/mobile/ListItem", 
    "dojo/on",
    "dojo/dom-construct",
    "dsw/sqo/widget/QuoteOverall",
    "dojox/mobile/ProgressIndicator",
    "dsw/sqo/widget/CustomerPartner",
    "dsw/sqo/widget/SearchResultPartPrice",
    "dsw/sqo/widget/SpecialBid",
    "dojox/mobile/parser",
    "dojo/dom-class",
    "dojo/dom"
], function(lang, registry, viewLoader, structure, query, RoundRectLists, RoundRectCategory, ListItem, on, domConstruct, QuoteOverall, ProgressIndicator, CustomerPartner, SearchResultPartPrice, SpecialBid, parser, domClass, dom){
	lang.getObject("dsw.sqo.controller.SearchResultQuoteDetailController", true);
    
	dsw.sqo.controller.SearchResultQuoteDetailController = {
		init: function(moduleInitParameters){
        var prog = ProgressIndicator.getInstance();
        domConstruct.place(prog.domNode,registry.byId('searchResultOverallInfoView').containerNode);
        prog.start();

        var quoteNum = moduleInitParameters.webQuoteNum;
        var userId = moduleInitParameters.searchText;
        this.callGetQuoteDetailService(quoteNum, userId, function(response){
            var self = this;
            prog.stop();

            var quoteOverallObj = {
                webQuoteNum: response.invocationResult.webQuoteNum,
	            quoteTitle : response.invocationResult.quoteTitle,
                custName : response.invocationResult.custName,
                city : response.invocationResult.city,
                country : response.invocationResult.country,
                currencyDscr : response.invocationResult.currencyDscr,
                submittedDate : response.invocationResult.submittedDate,
                effDate : response.invocationResult.effDate,
                quoteExpDate : response.invocationResult.quoteExpDate,
                quotePriceTot : response.invocationResult.quotePriceTot,
                quoteOverallStatuses : response.invocationResult.quoteOverallStatuses,
            };
            
            var quoteOverallWidget = new QuoteOverall(quoteOverallObj); 
            var quoteOverallWidgetContainer = domConstruct.create("DIV"); 
            quoteOverallWidgetContainer.innerHTML = quoteOverallWidget.domNode.innerHTML;
            parser.parse(quoteOverallWidgetContainer);
            registry.byId('searchResultOverallInfoScrollView').containerNode.innerHTML = quoteOverallWidgetContainer.innerHTML; 

           
            
             // create QuoteOverall view end
                // create Customer and Partner view start
            var customerPartnerObj = {
                soldToCustNum : response.invocationResult.soldToCustNum,
                custName: response.invocationResult.custName,
                fulfillmentSrc: response.invocationResult.fulfillmentSrc,
                reslCustNum: response.invocationResult.reslCustNum,
                rselCustName: response.invocationResult.rselCustName,
	            payerCustNum: response.invocationResult.payerCustNum,
                payerCustName: response.invocationResult.payerCustName,
            };
            var customerPartnerWidget = new CustomerPartner(customerPartnerObj); 
            var customerPartnerWidgetContainer = domConstruct.create("DIV"); 
            customerPartnerWidgetContainer.innerHTML = customerPartnerWidget.domNode.innerHTML;
            parser.parse(customerPartnerWidgetContainer);
            registry.byId('searchResultCustomerPartnerScrollView').containerNode.innerHTML = customerPartnerWidgetContainer.innerHTML;    
            // create Customer and Partner view end
            
            // create Part and pricing view start
            var softwareLineItems = response.invocationResult.softwareQuoteLineItems;
            var saasLineItems = response.invocationResult.saasQuoteLineItems;
            var quoteTypeTxt = "";
            if(softwareLineItems && softwareLineItems.length >0 && saasLineItems && saasLineItems.length >0){
                quoteTypeTxt = "both";
            }else if(softwareLineItems && softwareLineItems.length >0){
                quoteTypeTxt = "Software";
            }else if(saasLineItems && saasLineItems.length >0){
                quoteTypeTxt = "SaaS";
            }
            var partPriceObj = {
                softwareQuoteLineItems: softwareLineItems,
                saasQuoteLineItems: saasLineItems,
                quoteType: quoteTypeTxt
            };
            var partPriceWidget = new SearchResultPartPrice(partPriceObj);
            var partPriceWidgetContainer = domConstruct.create("DIV"); 
            partPriceWidgetContainer.innerHTML = partPriceWidget.domNode.innerHTML;
            parser.parse(partPriceWidgetContainer);
            registry.byId('searchResultPartPriceScrollView').containerNode.innerHTML = partPriceWidgetContainer.innerHTML;
            // handle the quote type menu
            var partTypeSpinner = registry.byId("searchResultPartTypeSpinner");
            if(quoteTypeTxt == "SaaS"){
                partTypeSpinner.set('label', "SaaS");
                var saasPartListNode = dom.byId("saasPartList");
                if(saasPartListNode){
                    saasPartListNode.style.display = "block";
                }
            }else if(quoteTypeTxt == "both"){
                var partPriceView = registry.byId('searchResultPartPriceView');
                var partPriceScrollView = registry.byId('searchResultPartPriceScrollView');
                var partTypeNavigation = registry.byId("searchResultPartTypeNavigation");
                domClass.remove(partTypeSpinner.domNode, "tabLabel");
                domClass.add(partTypeSpinner.domNode, "tabMenu");
                
                var showingMenu = null;
		        var showingMenuButton = null;
		        var showHideMenu = function(menuButton, menu, show, domNode) {
			        if(show) {
					    if((menu !== showingMenu) || (menuButton != showingMenuButton)){
						    if (showingMenu)
						    	showingMenu.hide();
						    if (showingMenuButton)
							    showingMenuButton.set("selected", false);
						    menu.show(domNode, ['below']);
					    	menuButton.set("selected", true);
						    showingMenu = menu;
						    showingMenuButton = menuButton;
					    }
				    }
				    else {
					    if (showingMenu){
						    showingMenu.hide();
						    showingMenu = null;
					    }
					    if (showingMenuButton){
						    showingMenuButton.set("selected", false);
						    showingMenuButton = null;
					    }
				    }
			    }
                var hideMenuOnMainViewClick = function(evt) {
				    if(showingMenu) {
					    if(!dom.isDescendant(evt.target, showingMenuButton.domNode)){
						    showHideMenu(null, showingMenu, false);
                        }
				    }
			    }

                var menuItemClick = function(evt){
                    var menuItemDom = evt.target;
                    partTypeSpinner.set('label',menuItemDom.innerHTML);
                    evt.preventDefault();
				    evt.stopPropagation();
		            showHideMenu(null, showingMenu, false);	
                }
		        on(partPriceView, "click", hideMenuOnMainViewClick);
		        on(partPriceScrollView, "click", hideMenuOnMainViewClick);
                on(partTypeSpinner, "click", function(evt){
				    showHideMenu(partTypeSpinner, partTypeNavigation, !(partTypeNavigation === showingMenu), partTypeSpinner.domNode);
				    evt.preventDefault();
				    evt.stopPropagation();
                });
          
                on(partTypeNavigation, "click", function(){
				    showHideMenu(null, navigationMenuTooltip, false);
			    });
                query("#searchResultPartTypeMenuList .mblListItem").forEach(function(item){
                    on(item, "click", menuItemClick);
                    on(item, "mouseover", function(evt){
                        evt.target.parentNode.style.background = "#008bc0";
                    });
                    on(item, "mouseout", function(evt){
                        evt.target.parentNode.style.background = "#2d2d2d";
                    });

                });
                var softwarePartMenuItem = dom.byId("searchResultSoftwarePartMenuItem");
                var saasPartMenuItem = dom.byId("searchResultSaaSPartMenuItem");
                var softwarePartListNode = dom.byId("searchResultSoftwarePartList");
                var saasPartListNode = dom.byId("searchResultSaaSPartList");
                on(softwarePartMenuItem, "click", function(evt){
                    if(softwarePartListNode && softwarePartListNode.style.display == "none"){
                        softwarePartListNode.style.display = "block";
                    }
                    if(saasPartListNode){
                        saasPartListNode.style.display = "none";
                    }
                });
                on(saasPartMenuItem, "click", function(evt){
                    if(saasPartListNode && (saasPartListNode.style.display == "none" || saasPartListNode.style.display == "")){
                        saasPartListNode.style.display = "block";
                    }
                    if(softwarePartListNode){
                        softwarePartListNode.style.display = "none";
                    }
                });
            }
            
            // create Part and pricing view end 

            // create Specialbid view start
            var specialBidObj = {
                speclBidReasons: response.invocationResult.speclBidReasons,
                speclBidJstfs: response.invocationResult.speclBidJstfs,
                speclBidApprvrDtl: response.invocationResult.speclBidApprvrDtl               
            }; 
            var specialBidWidget = new SpecialBid(specialBidObj);
            var specialBidWidgetContainer = domConstruct.create("DIV"); 
            specialBidWidgetContainer.innerHTML = specialBidWidget.domNode.innerHTML;
            parser.parse(specialBidWidgetContainer);
            registry.byId('searchResultSpecialBidScrollView').containerNode.innerHTML = specialBidWidgetContainer.innerHTML; 
            // create Specialbid view end
            // create the body end
            
            var quoteDetailView = registry.byId('quoteDetailView');


           query("#searchResultSoftwarePartList .partDiscountValue").forEach(function(item){
                on(item, "click", function(evt){
                    var partDetailItem = evt.target.parentNode.nextElementSibling;
                    if(partDetailItem.style.display == 'none' || partDetailItem.style.display == ''){
                        partDetailItem.style.display = 'block'
                    }else {
                        partDetailItem.style.display = 'none';
                    }
                    // close other hidden section
                    query("#searchResultPartPriceScrollView .softwareHiddenPartItem").forEach(function(item){
                        if(item != partDetailItem &&  partDetailItem.style.display == 'block'){
                            item.style.display = 'none';
                        }
                    });
            
                })
           });

           query("#searchResultSaaSPartList .saasPartLevelTwoIcon").forEach(function(item){
                on(item, "click", function(evt){
                    var levelThreeItemQuantity = query("#searchResultSaaSPartList .saasPartLevelThreeItem").length;
                    var levelThreeItem = evt.target.parentNode.nextElementSibling;
                    for(var i=0; i<levelThreeItemQuantity; i++){
                        if(levelThreeItem.style.display == 'none' || levelThreeItem.style.display == ''){
                            levelThreeItem.style.display = 'block'
                        }else {
                            levelThreeItem.style.display = 'none';
                        }
                        levelThreeItem = levelThreeItem.nextElementSibling;
                        if(!domClass.contains(levelThreeItem, "saasPartLevelThreeItem")){
                            break;
                        }
                    }
                });
           });
           query("#searchResultSaaSPartList .saasPartLevelThreeIcon").forEach(function(item){
                on(item, "click", function(evt){
                    var levelFourItemQuantity = query("#searchResultSaaSPartList .saasPartLevelFourItem").length;
                    var levelFourItem = evt.target.parentNode.nextElementSibling;
                    for(var i=0; i<levelFourItemQuantity; i++){
                        if(levelFourItem.style.display == 'none' || levelFourItem.style.display == ''){
                            levelFourItem.style.display = 'block'
                        }else {
                            levelFourItem.style.display = 'none';
                        }
                        levelFourItem = levelFourItem.nextElementSibling;
                        if(!domClass.contains(levelFourItem, "saasPartLevelFourItem")){
                            break;
                        }
                    }
                });
           });
            },function(error){
                alert("Just let you know that I'm still loading the data in the backend...");
            }); 
        },
        callGetQuoteDetailService: function(quoteNum, userId, successCallback, failureCallback){
    	    var invocationData = {
				adapter: "QuoteAdapter",
				procedure: "getQuoteDetails",
				parameters: [quoteNum, userId]
			};
    	    WL.Client.invokeProcedure(invocationData, {
                onSuccess: successCallback,
                onFailure: failureCallback
            });
        }
	};
	return dsw.sqo.controller.SearchResultQuoteDetailController;
})

