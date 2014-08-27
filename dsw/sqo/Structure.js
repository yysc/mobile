define([
    "dojo/_base/lang"
], function(lang){
	lang.getObject("dsw.sqo.Structure", true);
	
	dsw.sqo.Structure = {
		views: {
		    quoteListView: {
                id: "quoteListView",
                viewUrl: "views/quoteList.html",
                jsModule: "dsw/sqo/controller/QuoteListController",
                containsMenuWidget: "mainNavigation"
		    },
            searchView: {
                id: "searchView",
                viewUrl: "views/sqoSearch.html",
                jsModule: "dsw/sqo/controller/SearchController"
            },
            searchResultView: {
                id: "searchResultView",
                viewUrl: "views/searchResult.html",
                jsModule: "dsw/sqo/controller/SearchResultContorller"
            },
            searchResultQuoteDetailView: {
                id: "searchResultQuoteDetailView",
                viewUrl: "views/searchReslutQuoteDetail.html",
                jsModule: "dsw/sqo/controller/SearchResultQuoteDetailController",
                containsMenuWidget: "searchResultPartTypeNavigation"
            },
            quoteDetailView: {
                id: "quoteDetailView",
                viewUrl: "views/quoteDetail.html",
                jsModule: "dsw/sqo/controller/QuoteDetailController",
                containsMenuWidget: "partTypeNavigation"
            },
            approveActionListView: {
                id: "approveActionListView",
                viewUrl: "views/approveActionList.html",
                jsModule: "dsw/sqo/controller/ApproveActionListController"
            },
            doApproveView: {
                id: "doApproveView",
                viewUrl: "views/doApprove.html",
                jsModule: "dsw/sqo/controller/DoApproveController"
            },
            doRejectView: {
                id: "doRejectView",
                viewUrl: "views/doReject.html",
                jsModule: "dsw/sqo/controller/DoRejectController"
            },
            partLineItemView: {
                id: "partLineItemView",
                viewUrl: "views/partLineItem.html",
                jsModule: "dsw/sqo/controller/PartLineItemController",
            }
        }
	};
	return dsw.sqo.Structure;
});
