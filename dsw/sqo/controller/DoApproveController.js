define([
    "dojo/_base/lang", 
    "../ViewLoader", 
    "../Structure",
    "dijit/registry", 
    "dojo/dom",
    "dojo/on",
    "dojo/query",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojox/mobile/ProgressIndicator"
], function(lang,viewLoader,structure, registry, dom, on, query, domClass, domConstruct, ProgressIndicator){
	lang.getObject("dsw.sqo.controller.DoApproveController", true);
	
	dsw.sqo.controller.DoApproveController = {
		init: function(moduleInitParameters){
            var quoteNum = moduleInitParameters.webQuoteNum;
            var approvalLevel = moduleInitParameters.approvalLevel;
            var action = moduleInitParameters.action;
            var self = this;
            on(registry.byId("doApproveBtn"), "click",  function(evt){
            	var prog = ProgressIndicator.getInstance();
            	domConstruct.place(prog.domNode, registry.byId('doApproveView').containerNode);
            	prog.start(); // start the progress indicator
                var comment = registry.byId("approveCommentBox").value; 
                self.callApproveActionService(quoteNum, dsw.sqo.model.User.id, approvalLevel, dsw.sqo.model.User.sqoAccessLevel, action, comment, function(){
                	prog.stop(); // stop the progress indicator
                    registry.byId('doApproveView').performTransition("quoteListView", 1, "slide");
                }, function(error){
                	prog.stop(); // stop the progress indicator
                    alert("Oops, falied to do approve action");
                    registry.byId('doApproveView').performTransition("quoteListView", 1, "slide");
                } );
            });
        },
        
        callApproveActionService: function(quoteNum, userId, approvalLevel, accessLevel, action, comment, successCallback, failureCallback){
    	    var invocationData = {
				adapter: "QuoteAdapter",
				procedure: "approveActions",
				parameters: [quoteNum, userId, approvalLevel, accessLevel + '', action, comment, ""]
			};
    	    WL.Client.invokeProcedure(invocationData, {
                onSuccess: successCallback,
                onFailure: failureCallback
            });
        }
        
	};
	return dsw.sqo.controller.DoApproveController;
});
