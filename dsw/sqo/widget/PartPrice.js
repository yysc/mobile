define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dijit/_WidgetBase",
    "dojox/mobile/RoundRectCategory",
    "dojox/mobile/ContentPane"
], function(declare, lang, domConstruct, WidgetBase){
    return	declare("dsw.sqo.widget.PartPrice", [WidgetBase], {
        softwareQuoteLineItems: [],
        saasQuoteLineItems: [],
        quoteType: "",
        baseClass: "",
        
		buildRendering: function(){
			this.inherited(arguments);
            var widgetContent = "";
            
            if(this.quoteType != "SaaS"){
                 widgetContent += "<ul data-dojo-type=\"dojox/mobile/EdgeToEdgeList\" class=\"softwarePartList\" id=\"softwarePartList\">";
                 for(var i=0; i< this.softwareQuoteLineItems.length; i++){
                    var softwareQuoteLineItem = this.softwareQuoteLineItems[i];
                    if(i == 0){
                        widgetContent += "<li data-dojo-type=\"dojox/mobile/ListItem\" class=\"softwarePartItem firstPartItem\">";
                    }else{
                        widgetContent += "<li data-dojo-type=\"dojox/mobile/ListItem\" class=\"softwarePartItem\">";
                    }
                    widgetContent += "<span class=\"mblDswListItemBlockLabel\">" + softwareQuoteLineItem.partDscrLong + "</span>";
                    widgetContent += "<span class=\"partPriceValue\">"+ softwareQuoteLineItem.prratdLocalExtndPrice + "</span>";
                    widgetContent += "<div class=\"partDiscountValue\">"+ softwareQuoteLineItem.lineDiscPct + "%</div></li>";
                 
                    widgetContent += "<li data-dojo-type=\"dojox/mobile/ListItem\" class=\"softwareHiddenPartItem\">";
                    widgetContent += "<p><label class=\"mblDswListItemBlockLabel\">Part number</label>";
                    widgetContent += "<span class=\"quoteDetailValue\">" + softwareQuoteLineItem.partNum + "</span></p>";
                    widgetContent += "<p><label class=\"mblDswListItemBlockLabel\">Part description</label>";
                    widgetContent += "<span class=\"quoteDetailValue\">" + softwareQuoteLineItem.partDscrLong  + "</span></p>";
                    widgetContent += "<p><label class=\"mblDswListItemBlockLabel\">Quantity</label>";
                    widgetContent += "<span class=\"quoteDetailValue\">" + softwareQuoteLineItem.partQty + "</span></p>";
                    widgetContent += "<p><label class=\"mblDswListItemBlockLabel\">Extended price</label>";
                    widgetContent += "<span class=\"quoteDetailValue\">" + softwareQuoteLineItem.prratdLocalExtndPrice + "</span></p>";
                    widgetContent += "<p><label class=\"mblDswListItemBlockLabel\">Bid extended price</label>";
                    widgetContent += "<span class=\"quoteDetailValue\">" + softwareQuoteLineItem.prratdDiscdLocalExtndPrice + "</span></p></li>";
                 }
                 widgetContent += "</ul>";
            }
                   
            if(this.quoteType != "Software"){
                 widgetContent += "<ul data-dojo-type=\"dojox/mobile/EdgeToEdgeList\" class=\"saasPartList\" id=\"saasPartList\">";
                 for(var i=0; i< this.saasQuoteLineItems.length; i++){
                    var saasQuoteLineItem = this.saasQuoteLineItems[i];
                    if(i == 0){
                        widgetContent += "<li data-dojo-type=\"dojox/mobile/ListItem\" class=\"saasPartLevelOneItem firstPartItem\">";
                    }else{
                        widgetContent += "<li data-dojo-type=\"dojox/mobile/ListItem\" class=\"saasPartLevelOneItem\">";
                    }
                    
                    widgetContent += "<span class=\"mblDswListItemBlockLabel\">" + saasQuoteLineItem.brandName + "</span>";
                    widgetContent += "<span class=\"saasPartLevelOneValue\">" + saasQuoteLineItem.provisioningID + "</span></li>";
                    
                    for(var j=0; j<saasQuoteLineItem.configurations.length; j++){
                        var configuration = saasQuoteLineItem.configurations[j];
                        widgetContent += "<li data-dojo-type=\"dojox/mobile/ListItem\" class=\"saasPartLevelTwoItem\">";
                        widgetContent += "<span class=\"mblDswListItemBlockLabel\">" + configuration.pidDscr + "</span>";
                        widgetContent += "<span class=\"saasPartLevelTwoValue\">"+ configuration.configID + "</span>";
                        widgetContent += "<div class=\"saasPartLevelTwoIcon\">&nbsp;</div></li>";
                        for(var k=0; k<configuration.partList.length; k++){
                            var part = configuration.partList[k];
                            widgetContent += "<li data-dojo-type=\"dojox/mobile/ListItem\" class=\"saasPartLevelThreeItem\">";
                            widgetContent += "<span class=\"mblDswListItemLabel\">Part number: </span>";
                            widgetContent += "<span class=\"saasPartLevelThreeValue\">" + part.partNum+ "</span>";
                            widgetContent += "<div class=\"saasPartLevelThreeIcon\">" + part.lineDiscPct + "%</div></li>";
                            
                            widgetContent += "<li data-dojo-type=\"dojox/mobile/ListItem\" class=\"saasPartLevelFourItem\">";
                            widgetContent += "<span class=\"saasPartLevelFourText\">" + part.partDscrLong + "</span>";
                            widgetContent += "<div class=\"saasPartLevelFourDateContainer\">";
                            widgetContent += "<span class=\"mblDswListItemLabel\">Quantity: </span>";
                            widgetContent += "<span class=\"saasPartLevelFourValue\">" + part.partQty + "</span></div>";
                            widgetContent += "<div class=\"saasPartLevelFourDateContainer\">";
                            widgetContent += "<span class=\"mblDswListItemLabel\">Extended price: </span>";
                            widgetContent += "<span class=\"saasPartLevelFourValue\">" + part.prratdLocalExtndPrice + "</span></div>";
                            widgetContent += "<div class=\"saasPartLevelFourDateContainer\">";
                            widgetContent += "<span class=\"mblDswListItemLabel\">Bid extended price: </span>";
                            widgetContent += "<span class=\"saasPartLevelFourValue\">" + part.prratdDiscdLocalExtndPrice + "</span></div>";
                            widgetContent += "<div class=\"saasPartLevelFourDateContainer\">";
                            widgetContent += "<span class=\"mblDswListItemLabel\">Start date: </span>";
                            widgetContent += "<span class=\"saasPartLevelFourValue\">" + part.startDate + "</span></div>";
                            widgetContent += "<div class=\"saasPartLevelFourDateContainer\">";
                            widgetContent += "<span class=\"mblDswListItemLabel\">End date: </span>";
                            widgetContent += "<span class=\"saasPartLevelFourValue\">" + part.endDate + "</span></div></li>";
                        }
                    }
                    
                 }
                 widgetContent += "</ul>";
            }
           
            this.domNode.innerHTML = widgetContent;
		}
	});
});

