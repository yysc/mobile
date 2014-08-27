define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dijit/_WidgetBase",
    "dojox/mobile/EdgeToEdgeList",
    "dojox/mobile/ContentPane"
], function(declare, lang, domConstruct, WidgetBase){
    return	declare("dsw.sqo.widget.SpecialBidStatusInfo", [WidgetBase], {
    	speclBidReasons:[],
    	speclBidApprvrDtl:[], 
    	speclBidJstf:[],
    	webQuoteNum: "",
    	currencyDscr : "",
        quotePriceTot: "",       
        baseClass: "",
       
		buildRendering: function(){
			this.inherited(arguments);          
            var widgetContent = "<h2 data-dojo-type=\"dojox/mobile/EdgeToEdgeCategory\" class=\"specialBidCategoryTitleFont specialBidFirstCategoryTitle\">Quote value: " + this.quotePriceTot +" "+ this.currencyDscr +"</h2>";
            widgetContent += "<h2 data-dojo-type=\"dojox/mobile/EdgeToEdgeCategory\" class=\"specialBidCategoryTitleFont specialBidFirstCategoryTitle\">Special bid status and approver details</h2>";
            widgetContent += "<ul data-dojo-type=\"dojox/mobile/EdgeToEdgeList\">";	
            if (this.speclBidApprvrDtl!=undefined && this.speclBidApprvrDtl.length>0 ) {
            	for(var i=0; i<this.speclBidApprvrDtl.length; i++){
            		if(i % 2== 0) {
            			widgetContent += "<li class=\"mblDswQuoteDetailSpecialbidListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
            		} else {
            			widgetContent += "<li style=\"background-color:#e6e7e8\" class=\"mblDswQuoteDetailSpecialbidListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
            		}
            		widgetContent += "<p><label class=\'mblDswSpecialBidStatusItemBlockLabel\'>Approval type: </label><span class=\'mblDswSpecialBidStatusItemBlockSpan\'>" + this.speclBidApprvrDtl[i].speclBidApprvrType+" </span></p>";
            		widgetContent += "<p><label class=\'mblDswSpecialBidStatusItemBlockLabel\'>Approval name: </label><span class=\'mblDswSpecialBidStatusItemBlockSpan\'>" + this.speclBidApprvrDtl[i].apprvrName+" </span></p>";
            		widgetContent += "<p><label class=\'mblDswSpecialBidStatusItemBlockLabel\'>Approval taken: " + this.speclBidApprvrDtl[i].userAction + " </label><span class=\'mblDswSpecialBidStatusItemBlockSpan\'>" + this.speclBidApprvrDtl[i].modDate+" </span></p>";
					 if(this.speclBidApprvrDtl[i].speclBidApprvrReturnReason.length > 0){
						widgetContent += "<p><label class=\'mblDswSpecialBidStatusItemBlockLabel\'>Reason: </label><span class=\'mblDswSpecialBidStatusItemBlockSpan\'>" + this.speclBidApprvrDtl[i].speclBidApprvrReturnReason+" </span></p>";
					}
				}              
	                widgetContent += "</ul>";
            	
            } else {					
		                widgetContent += "<li class=\"specialBidFirstCategoryTitle\" data-dojo-type=\"dojox/mobile/ListItem\">";
		            	widgetContent += "<p><span class=\"quoteDetailValue\">There are no approvers assigned.</span>";
		            	widgetContent += "</p>";
		            	widgetContent += "</li></ul>";
			}        
            this.domNode.innerHTML = widgetContent;
		}
	});
});

