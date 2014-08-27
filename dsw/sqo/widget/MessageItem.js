define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dijit/_WidgetBase"
], function(declare, lang, domConstruct, WidgetBase){

    return	declare("dsw.sqo.widget.MessageItem", [WidgetBase], {
    	messageId: "",
    	quoteNumber: "",
        message: "",
        readFlag: "",
        messageType: "",
        baseClass: "",

		buildRendering: function(){
			var text = "";
			var innerDiv = domConstruct.create("DIV");
			innerDiv.innerHTML = this.message;
			text = innerDiv.innerText;
			
			this.inherited(arguments);
			var widgetContent = "";
			if (this.readFlag == 0) {
				widgetContent += "<div class=\"mblListItemLabel\" style=\"display: block;font-weight:bold;\">" + text +"</div>";
			} else if (this.readFlag == 1) {
				widgetContent += "<div class=\"mblListItemLabel\" style=\"display: block;font-weight:normal;\">" + text +"</div>";
			} else {
				widgetContent += "<div class=\"mblListItemLabel\" style=\"display: block;font-weight:bold;\">" + text +"</div>";
			}
            this.domNode.innerHTML = widgetContent;
		}
	});
});

