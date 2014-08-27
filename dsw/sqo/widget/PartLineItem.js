define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dijit/_WidgetBase",
    "dojox/mobile/RoundRectCategory",
    "dojox/mobile/ContentPane",
    "dojox/mobile/RoundRect"
], function(declare, lang, domConstruct, WidgetBase){

    return	declare("dsw.sqo.widget.PartLineItem", [WidgetBase], {
        lineItem: [],
		currencyDscr: "",
		quotePriceTot: "",
		serviceBrand: "",
        baseClass: "",

		buildRendering: function(){
			this.inherited(arguments);

			var commonLineItemInfo="";
				commonLineItemInfo += "<div><span class=\"quoteDetailLabel\" style=\"padding-right:15px; margin-bottom: 5px; display: block;\">"+ this.lineItem.partDscrLong + "</span></div>";
				commonLineItemInfo += "<div><span class=\"quoteDetailLabel\">" + "Part #: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.partNum + "</span></div>";
				if (this.lineItem.partQty) {
					commonLineItemInfo += "<div><span class=\"quoteDetailLabel\">" + "Part qty: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.partQty + "</span></div>";
				}
			var ytyGrowth = "";
            if (this.lineItem.showYtyGrowth==true) {
            	ytyGrowth += "<div><span class=\"quoteDetailLabel\">" + "YTY growth at the line item level: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.ytyGrowthPCT + "%</span></div>";
            	if (this.lineItem.ytyImpliedGrowthFlg && this.lineItem.ytyOverallGrowthFlg) {
                	var growthDesc = "";
                	if (this.lineItem.ytyImpliedGrowthFlg > 0) {
                		growthDesc = "Included in ";
                	} else {
                		growthDesc = "Excluded from ";
                	}
                	growthDesc += "overall growth and ";
                	if (this.lineItem.ytyOverallGrowthFlg > 0) {
                		growthDesc += "included in ";
                	} else {
                		growthDesc += "excluded from ";
                	}
                	growthDesc += "implied growth";
                	ytyGrowth += "<div><span class=\"quoteDetailLabel\">" + "Implied growth and overall growth: " + "</span><span class=\"quoteDetailValue\">" + growthDesc + "</span></div>";
                }
            }
            
						
			
			var miscLineItemInfo="";
			miscLineItemInfo += "<div><span class=\"quoteDetailLabel\">"+ "Discount percent: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.lineDiscPct + "%</span></div>";
            	
            if(this.lineItem.prratdLocalExtndPrice){
				miscLineItemInfo += "<div><span class=\"quoteDetailLabel\">"+ "Extended price: " + "</span><span class=\"quoteDetailValue\">" + this.currencyDscr + " " + this.lineItem.prratdLocalExtndPrice + "</span></div>";
            }
            if(this.lineItem.prratdDiscdLocalExtndPrice){
            	miscLineItemInfo += "<div><span class=\"quoteDetailLabel\">"+ "Bid extended price: " + "</span><span class=\"quoteDetailValue\">" + this.currencyDscr + " " + this.lineItem.prratdDiscdLocalExtndPrice + "</span></div>";
            }
			if (this.lineItem.crad) {
				miscLineItemInfo+="<div><span class=\"quoteDetailLabel\">"+ "CRAD date: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.crad + "</span></div>";
			}
			if (this.lineItem.ibmCommitedDate) {
				miscLineItemInfo+="<div><span class=\"quoteDetailLabel\">"+ "IBM committed date: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.ibmCommitedDate + "</span></div>";
			}	
			
			if( this.lineItem.applianceInfo ) {
				miscLineItemInfo+="<div><span class=\"quoteDetailLabel\">"+ "Appliance info: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.applianceInfo + "</span></div>";
			}
			if (this.lineItem.bidTotalCommit) {
				miscLineItemInfo+="<div><span class=\"quoteDetailLabel\">"+ "Bid total commit: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.bidTotalCommit + "</span></div>";
			}
			if (this.serviceBrand && (this.lineItem.SAASFlag == true)) {
				miscLineItemInfo+="<div><span class=\"quoteDetailLabel\">"+ "Service brand: " + "</span><span class=\"quoteDetailValue\">" + this.serviceBrand + "</span></div>";
			}
			if (this.lineItem.configurationID && this.lineItem.MonthlyLicensingFlag != true) {
				miscLineItemInfo+="<div><span class=\"quoteDetailLabel\">"+ "Configuration ID: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.configurationID + "</span></div>";
			}			
			if (this.lineItem.billingFreqency) {
				miscLineItemInfo+="<div><span class=\"quoteDetailLabel\">"+ "Billing freqenncy: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.billingFreqency + "</span></div>";
			}
			
			if (this.lineItem.term) {
				miscLineItemInfo+="<div><span class=\"quoteDetailLabel\">"+ "Term: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.term + "</span></div>";
			}
			if (this.lineItem.renewalEndDate) {
				miscLineItemInfo+="<div><span class=\"quoteDetailLabel\">"+ "Renewal end date: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.renewalEndDate + "</span></div>";
			}
			if (this.lineItem.totalCommit) {
				miscLineItemInfo+="<div><span class=\"quoteDetailLabel\">"+ "Total commit: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.totalCommit + "</span></div>";
			}
			if(this.lineItem.startDate){
				miscLineItemInfo += "<br/><div><span class=\"quoteDetailLabel\">"+ "Start date: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.startDate + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
			}
			if(this.lineItem.endDate){
				miscLineItemInfo += "<span class=\"quoteDetailLabel\">"+ "End date: " + "</span><span class=\"quoteDetailValue\">" + this.lineItem.endDate + "</span></div>";
			}		
			
			var widgetContent = "<h2 data-dojo-type=\"dojox/mobile/EdgeToEdgeCategory\" class=\"partLineItemCategoryTitleFont quoteDetailFirstCategoryTitle\">Quote value: " + this.quotePriceTot +" "+ this.currencyDscr +"</h2>";
            widgetContent += "<h2 data-dojo-type=\"dojox/mobile/EdgeToEdgeCategory\" class=\"partLineItemCategoryTitleFont quoteDetailFirstCategoryTitle\">Line item details</h2>";
			 widgetContent += "<ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
                widgetContent += "<li style=\"background-color:#e6e7e8\" class=\"mblDswQuoteDetailJustListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
                widgetContent += "<p>" + commonLineItemInfo;
                widgetContent += "</p>";
                widgetContent += "</li></ul>";
				
                if (ytyGrowth && ytyGrowth.length >0) {
                	widgetContent += "<ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
                    widgetContent += "<li class=\"mblDswQuoteDetailJustListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
                    widgetContent += "<p>" + ytyGrowth;
                    widgetContent += "</p>";
                    widgetContent += "</li></ul>";
                }
                if (miscLineItemInfo && miscLineItemInfo.length>0) {
                	widgetContent += "<ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
                    widgetContent += "<li class=\"mblDswQuoteDetailJustListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
                    widgetContent += "<p>" + miscLineItemInfo;
                    widgetContent += "</p>";
                    widgetContent += "</li></ul>";
                }
                       
            this.domNode.innerHTML = widgetContent;
		}
	});
});

