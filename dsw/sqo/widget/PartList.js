define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dijit/_WidgetBase",
    "dojox/mobile/EdgeToEdgeCategory",
    "dojox/mobile/ContentPane",
    "dojox/mobile/ListItem",
    "dojox/mobile/EdgeToEdgeList"
], function(declare, lang, domConstruct, WidgetBase){
    return	declare("dsw.sqo.widget.PartList", [WidgetBase], {
        
        softwareQuoteLineItems: [],
        saasQuoteLineItems: [],
		monthlyLicensingLineItems: [],
        webQuoteNum: "",
        currencyDscr : "",
        quotePriceTot: "",
        quoteOverallStatuses:"",
        baseClass: "",
      
		buildRendering: function() {
			this.inherited(arguments);
	        
            var widgetContent = "<h2 data-dojo-type=\"dojox/mobile/EdgeToEdgeCategory\" class=\"partLineItemCategoryTitleFont quoteDetailFirstCategoryTitle\">Quote value: " + this.quotePriceTot +" "+ this.currencyDscr +"</h2>";
            widgetContent += "<h2 data-dojo-type=\"dojox/mobile/EdgeToEdgeCategory\" class=\"partLineItemCategoryTitleFont quoteDetailFirstCategoryTitle\">Line items</h2>";
            widgetContent += "<div data-dojo-type=\"dojox/mobile/Accordion\">";
            
			if(this.softwareQuoteLineItems &&  this.softwareQuoteLineItems.length >0){
				widgetContent += "<div data-dojo-type=\"dojox/mobile/ContentPane\" data-dojo-props='label:&quot;Software:&quot;'>";
                widgetContent += "<ul data-dojo-type=\"dojox/mobile/EdgeToEdgeList\"  id=\"softwarePartList\">";
//				widgetContent +="<li data-dojo-type=\"dojox/mobile/ListItem\" class=\"quoteDetailCategoryTitleFont quoteDetailFirstCategoryTitle\">Software:</li>";
                for(var i=0; i< this.softwareQuoteLineItems.length; i++){
                	var softwareQuoteLineItem = this.softwareQuoteLineItems[i];
					//widgetContent += "<div style="visibility: none;" id=\"lineItemSeqNum\">" + softwareQuoteLineItem.quoteLineItemSeqNum + "</div>";
                    
                    if(i % 2== 0){
                        widgetContent += "<li class=\"mblDswPartListListItem\"  data-dojo-props=\'noArrow:\"true\", clickable:\"true\", moveTo:\"#\"\' data-dojo-type=\"dojox/mobile/ListItem\">";
                    }else{
                        widgetContent += "<li style=\"background-color:#e6e7e8\" class=\"mblDswPartListListItem\"  data-dojo-props=\'noArrow:\"true\", clickable:\"true\", moveTo:\"#\"\' data-dojo-type=\"dojox/mobile/ListItem\">";
                    }       
                    widgetContent += "<div class='mblListItemRightIcon'><button class='mblDomButtonArrow mblDomButton'></button></div>";
                    widgetContent += "<label class=\'mblDswPartListItemBlockDescLabel\'>" + softwareQuoteLineItem.partDscrLong + "</label>";
					widgetContent += "<label class=\'softwareHiddenPartItem\'>" + softwareQuoteLineItem.partLineItemSeqNum + "," + softwareQuoteLineItem.serviceBrand + "</label>";
					widgetContent += "<div><label class=\"mblDswPartListItemBlockLabel\">Part #: </label><span class=\"mblDswPartListItemBlockValue\">" + softwareQuoteLineItem.partNum + "</span></div>";
					if (softwareQuoteLineItem.partQty =="" || softwareQuoteLineItem.partQty =="undefined" ) {
						widgetContent += "<div><label class=\"mblDswPartListItemBlockLabel\">Qty: </label><span class=\"mblDswPartListItemBlockValue\"> N/A</span></div>";
					} else {
						widgetContent += "<div><label class=\"mblDswPartListItemBlockLabel\">Qty: </label><span class=\"mblDswPartListItemBlockValue\">" + softwareQuoteLineItem.partQty + "</span></div>";
					}
                    
                    widgetContent += "<div><label class=\"mblDswPartListItemBlockLabel\">" + this.currencyDscr +": </label><span class=\"mblDswPartListItemBlockValue\">" + softwareQuoteLineItem.prratdLocalExtndPrice + "</span></div></li>"; 
                }
                widgetContent += "</ul>";
                widgetContent += "</div>";
            }
			if(this.monthlyLicensingLineItems &&  this.monthlyLicensingLineItems.length >0){
				widgetContent += "<div data-dojo-type=\"dojox/mobile/ContentPane\" data-dojo-props='label:&quot;Monthly Licensing:&quot;'>";
				widgetContent += "<ul data-dojo-type=\"dojox/mobile/EdgeToEdgeList\"  id=\"mothlyLicensingPartList\">";
//				widgetContent +="<li data-dojo-type=\"dojox/mobile/ListItem\" class=\"quoteDetailCategoryTitleFont quoteDetailFirstCategoryTitle\">Monthly Licensing:</li>";
                for(var i=0; i< this.monthlyLicensingLineItems.length; i++){
                    var monthlyLicensingPartList = this.monthlyLicensingLineItems[i];
				
                    if(i % 2== 0){
                        widgetContent += "<li class=\"mblDswPartListListItem\" data-dojo-props=\'noArrow:\"true\", clickable:\"true\", moveTo:\"#\"\' data-dojo-type=\"dojox/mobile/ListItem\">";
                    }else{
                        widgetContent += "<li style=\"background-color:#e6e7e8\" class=\"mblDswPartListListItem\"  data-dojo-props=\'noArrow:\"true\", clickable:\"true\", moveTo:\"#\"\' data-dojo-type=\"dojox/mobile/ListItem\">";
                    }      
                    widgetContent += "<div class='mblListItemRightIcon'><button  style='width:48px;' class='mblDomButtonArrow mblDomButton'></button></div>";
                    widgetContent += "<label class=\'mblDswPartListItemBlockDescLabel\'>" + monthlyLicensingPartList.partDscrLong + "</label>";
					widgetContent += "<label class=\'softwareHiddenPartItem\'>" + monthlyLicensingPartList.partLineItemSeqNum  + "," + monthlyLicensingPartList.serviceBrand + "</label>";
					widgetContent += "<div><label class=\"mblDswPartListItemBlockLabel\">Part #: </label><span class=\"mblDswPartListItemBlockValue\">" + monthlyLicensingPartList.partNum + "</span></div>";
					if (monthlyLicensingPartList.partQty =="" || monthlyLicensingPartList.partQty =="undefined" ) {
						widgetContent += "<div><label class=\"mblDswPartListItemBlockLabel\">Qty: </label><span class=\"mblDswPartListItemBlockValue\"> N/A</span></div>";
					} else {
						widgetContent += "<div><label class=\"mblDswPartListItemBlockLabel\">Qty: </label><span class=\"mblDswPartListItemBlockValue\">" + monthlyLicensingPartList.partQty + "</span></div>";
					}
                   
                    widgetContent += "<div><label class=\"mblDswPartListItemBlockLabel\">" + this.currencyDscr +": </label><span class=\"mblDswPartListItemBlockValue\">" + monthlyLicensingPartList.prratdLocalExtndPrice + "</span></div></li>"; 
                }
                widgetContent += "</ul>";
                widgetContent += "</div>";
            }
			if(this.saasQuoteLineItems &&  this.saasQuoteLineItems.length >0){
				widgetContent += "<div data-dojo-type=\"dojox/mobile/ContentPane\" data-dojo-props='label:&quot;SaaS:&quot;'>";
				widgetContent += "<ul data-dojo-type=\"dojox/mobile/EdgeToEdgeList\" >";
//				widgetContent +="<li data-dojo-type=\"dojox/mobile/ListItem\" class=\"quoteDetailCategoryTitleFont quoteDetailFirstCategoryTitle\">SaaS:</li>";
				for(var x=0; x< this.saasQuoteLineItems.length; x++){
					var configurations = this.saasQuoteLineItems[x].configurations;
					if(configurations &&  configurations.length >0){	
						for(var i=0; i< configurations.length; i++){
				            var partLineItems = configurations[i].partList;
				            for(var j=0; j< partLineItems.length; j++){
				            	var saasQuoteLineItem = partLineItems[j];
		                        if(j % 2== 0){
		                            widgetContent += "<li class=\"mblDswPartListListItem\"  data-dojo-props=\'noArrow:\"true\", clickable:\"true\", moveTo:\"#\"\' data-dojo-type=\"dojox/mobile/ListItem\">";
		                        }else{
		                            widgetContent += "<li style=\"background-color:#e6e7e8\" class=\"mblDswPartListListItem\"  data-dojo-props=\'noArrow:\"true\", clickable:\"true\", moveTo:\"#\"\' data-dojo-type=\"dojox/mobile/ListItem\">";
		                        }              
		                        widgetContent += "<div class='mblListItemRightIcon'><button  style='width:48px;' class='mblDomButtonArrow mblDomButton'></button></div>";
		                        widgetContent += "<label class=\'mblDswPartListItemBlockDescLabel\'>" + saasQuoteLineItem.partDscrLong + "</label>";
								widgetContent += "<label class=\'softwareHiddenPartItem\'>" + saasQuoteLineItem.partLineItemSeqNum + "," + saasQuoteLineItem.serviceBrand +  "</label>";
		     					widgetContent += "<div><label class=\"mblDswPartListItemBlockLabel\">Part #: </label><span class=\"mblDswPartListItemBlockValue\">" + saasQuoteLineItem.partNum + "</span></div>";
		                        
		                        if (saasQuoteLineItem.partQty =="" || saasQuoteLineItem.partQty =="undefined" ) {
		                        	widgetContent += "<div><label class=\"mblDswPartListItemBlockLabel\">Qty: </label><span class=\"mblDswPartListItemBlockValue\"> N/A</span></div>";
				     			} else {
				     				widgetContent += "<div><label class=\"mblDswPartListItemBlockLabel\">Qty: </label><span class=\"mblDswPartListItemBlockValue\">" + saasQuoteLineItem.partQty + "</span></div>";
				     			}
				                widgetContent += "<div><label class=\"mblDswPartListItemBlockLabel\">" + this.currencyDscr +": </label><span class=\"mblDswPartListItemBlockValue\">" + saasQuoteLineItem.prratdLocalExtndPrice + "</span></div></li>"; 
				            }                     
						}     
				    }
				}
				widgetContent += "</ul>";
				widgetContent += "</div>";
			}
			widgetContent += "</div>";
			
            this.domNode.innerHTML = widgetContent;
		}
	});
});

