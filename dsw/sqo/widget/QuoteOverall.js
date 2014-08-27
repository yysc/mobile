define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dijit/_WidgetBase",
    "dojox/mobile/RoundRectCategory",
    "dojox/mobile/RoundRectList"
], function(declare, lang, domConstruct, WidgetBase){

    return	declare("dsw.sqo.widget.QuoteOverall", [WidgetBase], {
        soldToCustNum : "",
        custName: "",
        fulfillmentSrc: "",
        reslCustNum: "",
        rselCustName: "",
	    payerCustNum: "",
        payerCustName: "",
        
        webQuoteNum: "",
	    quoteTitle : "",
        city: "",
        country: "",
        currencyDscr: "",
	    submittedDate: "",
        effDate: "",
        quoteExpDate: "",
        quotePriceTot: "",
	    quoteOverallStatuses: [],
	    lobDscr: "",
	    address: "",
	    contactName: "",
	    contactPhone: "",
	    lob: "",
        
        baseClass: "",
                 
		buildRendering: function(){
			this.inherited(arguments);
            var widgetContent = "<ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
            widgetContent += "<li class=\"mblDswQuoteDetailCustomerListItem\" data-dojo-type=\"dojox/mobile/ListItem\" style=\"background-color:#82D1F5;\">";
            widgetContent += "<div class=\"quoteDetailTitle\">Quote info</div></li>";
            
            widgetContent += "<li class=\"mblDswQuoteDetailCustomerListItem\" data-dojo-type=\"dojox/mobile/ListItem\">"; 
            widgetContent += "<div class=\"quoteDetailLabel quoteDetailHeight\" style=\"margin-top: 0px;\">" + this.quoteOverallStatuses.join(', ') + "</div>";
            widgetContent += "<div class=\"quoteDetailLabel quoteDetailHeight\">" + this.custName + "</div>";
            widgetContent += "<div class=\"quoteDetailHeight\"><span class=\"quoteDetailValue\">" + this.lobDscr + "</span><span class=\"quoteDetailValue\"> " + this.replaceReg(this.fulfillmentSrc) + "</span><label class=\"quoteDetailValue\"> Quote</label></div>";
            widgetContent += "<div class=\"quoteDetailHeight\" style=\"margin-top: 0px;\"><span class=\"quoteDetailLabel\">" + this.currencyDscr + "  " + "</span><span class=\"quoteDetailValue\"> " + this.quotePriceTot + "</span></div>";
            widgetContent += "<div class=\"quoteDetailHeight\" style=\"margin-top: 10px;\"><label class=\"quoteDetailLabel\">Start date:  </label><span class=\"quoteDetailValue\">" + this.effDate + "</span></div>";
            widgetContent += "<div class=\"quoteDetailHeight\"><label class=\"quoteDetailLabel\">Expiration date:  </label><span class=\"quoteDetailValue\">"+ this.quoteExpDate + "</span></div>";
            if(this.quoteTitle != ''){
            	widgetContent += "<div class=\"quoteDetailHeight\"><label class=\"quoteDetailLabel\">Quote title:  </label><span class=\"quoteDetailValue\">" + this.quoteTitle + "</span></div>";
            }
            widgetContent += "</li></ul>";
            
            widgetContent += "<ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
            widgetContent += "<li class=\"mblDswQuoteDetailCustomerListItem\" data-dojo-type=\"dojox/mobile/ListItem\" style=\"background-color:#82D1F5;\">";
            widgetContent += "<div class=\"quoteDetailTitle\">Customer info</div></li>";
            
            widgetContent += "<li class=\"mblDswQuoteDetailCustomerListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
            widgetContent += "<div class=\"quoteDetailHeight\"><label class=\"quoteDetailLabel\" style=\"margin-top: 0px;\">Site#:  </label><span class=\"quoteDetailValue\" style=\"margin-top: 0px;\">" + this.soldToCustNum + "</span></div>";
            widgetContent += "<div class=\"quoteDetailHeight\"><label class=\"quoteDetailLabel\">Address: </label><div class=\"quoteDetailValue\" style=\"margin-left: 59px; margin-top: -18px;\">" + this.address + "</div></div>";
            widgetContent += "<div class=\"quoteDetailHeight\"><label class=\"quoteDetailLabel\">Quote contact:  </label><span class=\"quoteDetailValue\">" + this.contactName + "</span></div>";
            widgetContent += "<div class=\"quoteDetailHeight\"><label class=\"quoteDetailLabel\">Phone number:  </label><a href=\"tel:" + this.contactPhone + "\" class=\"quoteDetailValue\">" + this.contactPhone + "</a></div>";
            widgetContent += "</li></ul>";

            if((this.fulfillmentSrc == "CHANNEL" || this.lob == "FCT")
            		&&(this.payerCustNum != '' || this.rselCustName != '' && this.payerCustName != '')){
            	widgetContent += "<ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
 	            widgetContent += "<li class=\"mblDswQuoteDetailResellerListItem\" data-dojo-type=\"dojox/mobile/ListItem\" style=\"background-color:#82D1F5;\">";
 	            widgetContent += "<div class=\"quoteDetailTitle\">Partner info</div><li/>";
 	            
 	            widgetContent += "<li class=\"mblDswQuoteDetailResellerListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
	            if(this.lob == "FCT") {
	            	if(this.payerCustNum != '') {
	            		widgetContent += "<div class=\"quoteDetailHeight\"><label class=\"quoteDetailLabel\" style=\"margin-top: 0px;\">Payer(FCT): </label><span class=\"quoteDetailValue\" style=\"margin-top: 0px;\">" + this.payerCustName + "</span></div>";
	            	}
	            } else {
	            	if(this.rselCustName != '' && this.payerCustName != '') {
	    	            widgetContent += "<div class=\"quoteDetailHeight\"><label class=\"quoteDetailLabel\" style=\"margin-top: 0px;\">Reseller: </label><span class=\"quoteDetailValue\" style=\"margin-top: 0px;\">" + this.rselCustName + "</span></div>";
			            widgetContent += "<div class=\"quoteDetailHeight\"><label class=\"quoteDetailLabel\">Site#:  </label><span class=\"quoteDetailValue\">" + this.reslCustNum + "</span></div>";
			            widgetContent += "<div class=\"quoteDetailHeight\" style=\"margin-top: 10px;\"><label class=\"quoteDetailLabel\">Distributor: </label><span class=\"quoteDetailValue\">" + this.payerCustName + "</span></div>";
	            	}
	            }
        		widgetContent += "<div class=\"quoteDetailHeight\"><label class=\"quoteDetailLabel\">Site#:  </label><span class=\"quoteDetailValue\">" + this.payerCustNum + "</span></div>";
	            widgetContent += "</li></ul>";
           	} 
            this.domNode.innerHTML = widgetContent;
		},
		
		replaceReg: function(str) {
			var reg = /\b(\w)|\s(\w)/g;
			str = str.toLowerCase(); 
       		return str.replace(reg,function(m){return m.toUpperCase()}) 
		}
	});
});

