define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dijit/_WidgetBase", "dijit/_TemplatedMixin"
], function(declare, lang, domConstruct, WidgetBase, TemplatedMixin){

    return	declare("dsw.sqo.widget.QuoteSearchResultItem", [WidgetBase, TemplatedMixin], {
        webQuoteNum: "",
	    quoteTitle : "",
	    submittedDate: "",
	    quotePriceTot: "",
	    quoteOverallStatuses: [],
	    quoteStatus: [],
	    currencyDscr: "",
        custName: "",
        effDate: "",
        quoteExpDate: "",

        baseClass: "",

        templateString: "<div>" +
        	"<div class='contentInItem'>" +
        	"<div data-dojo-attach-point='statusDiv' class='status'></div>" +
        	"<div data-dojo-attach-point='cusNameDiv' class='customer'>${custName}</div>" +
        	"<div><span data-dojo-attach-point='quoteNumDiv' class='quoteNumber'><font style='font-weight:bold'>Quote# </font>${webQuoteNum}</span>" +
        	"<span style='float:right;'><span data-dojo-attach-point='favoriteDiv' style='padding-right: 18px'></span>" +
        	"<span><button style='margin-top: 0; top: 2px;' class='mblDomButtonArrow mblDomButton'></button></span></span></div>" +
        	"<div class='price'><span class=\"quoteDetailLabel\">${currencyDscr}</span> ${quotePriceTot}</div>" +
        	"<div data-dojo-attach-point='startDateDiv'><label class='submittedTimeLabel'>Submitted: </label><span class='submittedTime'>${submittedDate}</span></div>" +
        	"<div data-dojo-attach-point='startDateDiv'><label class='startTimeLabel'>Start: </label><span class='time'>${effDate}</span></div>" +
        	"<div data-dojo-attach-point='startDateDiv'><label class='expiresTimeLabel'>Expires: </label><span class='time'>${quoteExpDate}</span></div>" +
        	"<div data-dojo-attach-point='descriptionDiv' class='description'></div>" +
	        "</div></div>"
	});
});

