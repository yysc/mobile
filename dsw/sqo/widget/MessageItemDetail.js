define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dijit/_WidgetBase"
], function(declare, lang, domConstruct, WidgetBase){

    return	declare("dsw.sqo.widget.MessageItemDetail", [WidgetBase], {
        message: "",
        baseClass: "",

		buildRendering: function(){
			this.inherited(arguments);
			var widgetContent = "<ul data-dojo-type=\"dojox/mobile/RoundRectList\">";
			widgetContent += "<li class=\"mblDswQuoteDetailCustomerListItem\" data-dojo-type=\"dojox/mobile/ListItem\" style=\"padding-top:5px;\">";
			widgetContent += this.message;
			widgetContent += "</li></ul>";
            this.domNode.innerHTML = widgetContent;
		}
	});
});

