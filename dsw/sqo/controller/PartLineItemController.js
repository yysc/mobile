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
    "dsw/sqo/widget/PartList",
	"dsw/sqo/widget/PartLineItem",
    "dojox/mobile/EdgeToEdgeList",
    "dojox/mobile/parser",
], function(lang,viewLoader,structure, registry, dom, on, domConstruct, query, domClass, ProgressIndicator, ListItem, PartList, PartLineItem,EdgeToEdgeList,parser){
	lang.getObject("dsw.sqo.controller.PartLineItemController", true);
	
	dsw.sqo.controller.PartLineItemController = {
		init: function(moduleInitParameters){
	
          // the effect of click the "Refresh" icon
          var webQuoteNum = moduleInitParameters.webQuoteNum;
          var partLineItemSeqNum = moduleInitParameters.partLineItemSeqNum;
          var partLineServiceBrand = moduleInitParameters.partLineServiceBrand;
          var currencyDscr = moduleInitParameters.currencyDscr;
          var quotePriceTot = moduleInitParameters.quotePriceTot;
          var fulfillmentSrc = moduleInitParameters.fulfillmentSrc;
          var lobCode=moduleInitParameters.lobCode;
          var priceCountry=moduleInitParameters.priceCountry;
          var prog = ProgressIndicator.getInstance();
          domConstruct.place(prog.domNode,registry.byId('partLineItemScrollableView').containerNode);
          prog.start();
          var self = this;
		  registry.byId('partDetailHeadView').set("label", "Quote number<br/>" + webQuoteNum);
          
          if(lineItemListWithDetailsLoadingStatus == 2){
        	  //data is already loaded by the background process in QuoteDetailController
        	  prog.stop();
              self.renderLineItemInfo(partLineItemSeqNum, currencyDscr, quotePriceTot, partLineServiceBrand, domConstruct, parser, registry)
          } else {
        	  var count = 0;
        	  
        	  var timer = setInterval(function(){
        		  if(lineItemListWithDetailsLoadingStatus == 1){
        			  count++;
        			  //line item details are still loading
        			  if(count > 120){
        				  clearInterval(timer);
        				  alert("Oops, failed to get part line item!");
        			  }
        			  return;
        		  } else {
        			  prog.stop();
        			  clearInterval(timer);
        			  if(lineItemListWithDetailsLoadingStatus == 3){
        				  alert("Oops, failed to get part line item!");
        			  } else if(lineItemListWithDetailsLoadingStatus == 2){
        				  var lineObj = self.getFromCache(partLineItemSeqNum);
        	       		  if(!lineObj.prratdDiscdLocalExtndPrice || !lineObj.lineDiscPct){
        	   					self.showWarningMessage();
        	   					return;
        	       		  }
        	       		  
        	       		  self.renderLineItemInfo(partLineItemSeqNum, currencyDscr, quotePriceTot, partLineServiceBrand, domConstruct, parser, registry);
        			  }
        		  }
        	  }, 1000);
          }
        },
        showWarningMessage: function(){
			if(dom.byId("_errorMessageContainer")){
				var _errorMessageContainer = dom.byId("_errorMessageContainer");
				domClass.remove(_errorMessageContainer, "hide");
			}
		},
		
		getFromCache: function(partLineItemSeqNum){
			 var lineObj = eval("lineItemListWithDetails.lineItem_" + partLineItemSeqNum);
			 
			 return lineObj;
		},
		
		renderLineItemInfo: function(partLineItemSeqNum, currencyDscr, quotePriceTot, partLineServiceBrand, domConstruct, parser, registry){
			var lineObj = this.getFromCache(partLineItemSeqNum);
			
			 var item = {
          		   lineItem: lineObj,
          		   currencyDscr: currencyDscr,
          		   quotePriceTot: quotePriceTot,
          		   serviceBrand: partLineServiceBrand
             }; 
             
             // display part line item detail information 
             var widget = new dsw.sqo.widget.PartLineItem(item);
             var partLineItemDetailWidgtContailer = domConstruct.create("DIV"); 
             partLineItemDetailWidgtContailer.innerHTML = widget.domNode.innerHTML;
             parser.parse(partLineItemDetailWidgtContailer);
             registry.byId('partLineItemScrollableView').containerNode.innerHTML = partLineItemDetailWidgtContailer.innerHTML; 
		},
	};
	return dsw.sqo.controller.PartLineItemController;
});
