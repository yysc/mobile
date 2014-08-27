define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dijit/_WidgetBase",
    "dojox/mobile/RoundRectCategory",
    "dojox/mobile/ContentPane"
], function(declare, lang, domConstruct, WidgetBase){

    return	declare("dsw.sqo.widget.CustomerPartner", [WidgetBase], {
        soldToCustNum : "",
        custName: "",
        fulfillmentSrc: "",
        reslCustNum: "",
        rselCustName: "",
	    payerCustNum: "",
        payerCustName: "",
        
        baseClass: "",
                 
		buildRendering: function(){
			this.inherited(arguments);
            var widgetContent = "<h2 data-dojo-type=\"dojox/mobile/RoundRectCategory\" class=\"quoteDetailCategoryTitleFont quoteDetailFirstCategoryTitle\">Customer information</h2>";
            widgetContent += "<ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
            widgetContent += "<li class=\"mblDswQuoteDetailCustomerListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
            widgetContent += "<p><label class='mblDswListItemBlockLabel'>Site number: </label><span class=\"quoteDetailValue\">" + this.soldToCustNum + "</span></p>";
           // widgetContent += "<p><label class='mblDswListItemBlockLabel'>Customer name: </label><span class=\"quoteDetailValue\">" + this.custName + "</span></p>";
            widgetContent += "</li></ul>";
            
            widgetContent += "<h2 data-dojo-type=\"dojox/mobile/RoundRectCategory\" class=\"quoteDetailCategoryTitleFont\">Quote partners</h2>";
            widgetContent += "<ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
            widgetContent += "<li class=\"mblDswQuoteDetailPartnerListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
            widgetContent += "<p><label class='mblDswListItemBlockLabel'>Fulfilment sources: </label><span class=\"quoteDetailValue\">" + this.fulfillmentSrc + "</span></p>";
            widgetContent += "</li></ul>";

            if(this.fulfillmentSrc == "CHANNEL") { 
	            widgetContent += "<h2 data-dojo-type=\"dojox/mobile/RoundRectCategory\" class=\"quoteDetailCategoryTitleFont\">Reseller information</h2>";
	            widgetContent += " <ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
	            widgetContent += "<li class=\"mblDswQuoteDetailResellerListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
	            widgetContent += "<p><label class='mblDswListItemBlockLabel'>Customer number: </label><span class=\"quoteDetailValue\">" + this.reslCustNum + "</span></p>";
	            widgetContent += "<p><label class='mblDswListItemBlockLabel'>Customer name: </label><span class=\"quoteDetailValue\">" + this.rselCustName + "</span></p>";
	            widgetContent += "</li></ul>";
	
	            widgetContent += "<h2 data-dojo-type=\"dojox/mobile/RoundRectCategory\" class=\"quoteDetailCategoryTitleFont\">Distributor information</h2>";
	            widgetContent += " <ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
	            widgetContent += "<li class=\"mblDswQuoteDetailResellerListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
	            widgetContent += "<p><label class=\"mblDswListItemBlockLabel\">Customer number: </label><span class=\"quoteDetailValue\">" + this.payerCustNum + "</span></p>";
	            widgetContent += "<p><label class=\"mblDswListItemBlockLabel\">Customer name: </label><span class=\"quoteDetailValue\">" + this.payerCustName + "</span></p>";
	            widgetContent += "</li></ul>";
           	}

            this.domNode.innerHTML = widgetContent;

		}
	});
});

