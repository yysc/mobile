define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dijit/_WidgetBase",
    "dojox/mobile/EdgeToEdgeCategory",
    "dojox/mobile/ContentPane",
    "dojox/mobile/RoundRect"
], function(declare, lang, domConstruct, WidgetBase){

    return	declare("dsw.sqo.widget.SpecialBid", [WidgetBase], {
        speclBidReasons: [],
        speclBidJstfs: [],
        speclBidApprvrDtl: [],
        webQuoteNum: "",
        currencyDscr : "",
        quotePriceTot: "",
        baseClass: "",

		buildRendering: function(){
			this.inherited(arguments);

			var speclBidReasonsString="";
			if(this.speclBidReasons != undefined){
	            for (var i=0;i< this.speclBidReasons.length; i++){
	            	var reason = this.speclBidReasons[i];
	            	if(i==0){
	            		speclBidReasonsString += "<li style=\"list-style:disc;\">" + reason.code + "</li>";
	            	} else {
	            		speclBidReasonsString += "<li style=\"list-style:disc; margin-top: 5px;\">" + reason.code + "</li>";
	            	}
	            }
			}
			
			var speclBidJstfsString = "";
			var speclBidEditHistory = "";
			if(this.speclBidJstfs != undefined){
	            for (var i=0; i<this.speclBidJstfs.length; i++){
	            	var jstf = this.speclBidJstfs[i];
        			
	            	if(i % 2 == 0){
                        speclBidEditHistory += "<li class=\"mblDswSpecialBidJustListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
                    }else{
                        speclBidEditHistory += "<li style=\"background-color:#e6e7e8\" class=\"mblDswSpecialBidJustListItem\" data-dojo-type=\"dojox/mobile/ListItem\">";
                    } 
	            	if(i == this.speclBidJstfs.length - 1){
	            		speclBidEditHistory += "<div class=\"specialBidContentValue\">Added by "+jstf.modByUserName + "</div>";
	            	}else{
	            		speclBidEditHistory += "<div class=\"specialBidContentValue\">Updated by "+jstf.modByUserName + "</div>";
	            	}
	            	
	            	speclBidEditHistory += "<div class=\"specialBidContentValue\" style=\"margin-top: 5px\">"+jstf.modDate + "</div></li>";
	            	
	            	if(i == 0){
	            		speclBidJstfsString = "<iframe id='jstfFrame'></iframe><div id='jstfTxt'>" + jstf.quoteTxt + "</div>";
	            	}
	            }	            	
			}

            var widgetContent = "<h2 data-dojo-type=\"dojox/mobile/EdgeToEdgeCategory\" class=\"specialBidCategoryTitleFont specialBidFirstCategoryTitle\">Quote value: " + this.quotePriceTot +" "+ this.currencyDscr +"</h2>";
            widgetContent += "<h2 data-dojo-type=\"dojox/mobile/EdgeToEdgeCategory\" class=\"specialBidCategoryTitleFont specialBidFirstCategoryTitle\">Special bid details</h2>";
            widgetContent += "<ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
            
            if (speclBidReasonsString == "") {
				widgetContent += "<li class=\"mblDswSpecialBidJustListItem\" data-dojo-type=\"dojox/mobile/ListItem\" style=\"background-color:#82D1F5\">";
				widgetContent += "<div class=\"specialBidCategoryTitleFont\">Approval reason(s)</div></li>";
				widgetContent += "<li class=\"mblDswSpecialBidJustListItem\" data-dojo-type=\"dojox/mobile/ListItem\"  id=\"specialBidReason\">";
				widgetContent += "<ul class=\"specialBidReasonList\"><li style=\"list-style:disc\">There are no special bid reason.</li></ul>";
			} else {
				widgetContent += "<li class=\"mblDswSpecialBidJustListItem\" data-dojo-type=\"dojox/mobile/ListItem\" style=\"background-color:#82D1F5\">";
				widgetContent += "<div class=\"specialBidCategoryTitleFont\">Approval reason(s)</div></li>";
				widgetContent += "<li class=\"mblDswSpecialBidJustListItem\" data-dojo-type=\"dojox/mobile/ListItem\" id=\"specialBidReason\">";
				widgetContent += "<ul class=\"specialBidReasonList\">" + speclBidReasonsString + "</ul>";
			}
            
            widgetContent += "</li></ul>";
            
            if (speclBidJstfsString !="") {
                 widgetContent += "<ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
                 widgetContent += "<li class=\"mblDswSpecialBidJustListItem\" data-dojo-type=\"dojox/mobile/ListItem\" style=\"background-color:#82D1F5\">";
                 widgetContent += "<div class=\"specialBidCategoryTitleFont\">Justification summary</div></li>";
                 widgetContent += "<li class=\"mblDswSpecialBidJustListItem\" data-dojo-type=\"dojox/mobile/ListItem\" id=\"jstfListItem\">";
                 widgetContent += speclBidJstfsString;
                 widgetContent += "</li></ul>";
            }
           
            if (speclBidEditHistory != "") {
                 widgetContent += "<ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
                 widgetContent += "<li class=\"mblDswSpecialBidJustListItem\" data-dojo-type=\"dojox/mobile/ListItem\" style=\"background-color:#82D1F5\">";
                 widgetContent += "<div class=\"specialBidCategoryTitleFont\">Edit history</div></li>";
                 widgetContent += speclBidEditHistory;
                 widgetContent += "</ul>";
            }
            
            this.domNode.innerHTML = widgetContent;
		}
	});
});

