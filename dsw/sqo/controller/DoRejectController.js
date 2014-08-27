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
	lang.getObject("dsw.sqo.controller.DoRejectController", true);
	
	dsw.sqo.controller.DoRejectController = {
		init: function(moduleInitParameters){
            var quoteNum = moduleInitParameters.webQuoteNum;
            var approvalLevel = moduleInitParameters.approvalLevel;
            var action = moduleInitParameters.action;
            var self = this;
            var commentBox = registry.byId("rejectCommentBox"); 
            on(registry.byId("doRejectBtn"), "click",  function(evt){
            	var prog = ProgressIndicator.getInstance();
            	domConstruct.place(prog.domNode, registry.byId('doRejectView').containerNode);
            	prog.start(); // start the progress indicator
                var comment = commentBox.value; 
                var rejectReason = "";
                query("input[name='rejectReason']").forEach(function(item){
                    if(item.checked){
                        rejectReason = item.value;
                    }
                }); 
                self.callRejectActionService(quoteNum, dsw.sqo.model.User.id, approvalLevel, dsw.sqo.model.User.sqoAccessLevel, action, comment, rejectReason, function(){
                	prog.stop(); // stop the progress indicator
                    registry.byId('doRejectView').performTransition("quoteListView", 1, "slide");
                }, function(error){
                	prog.stop(); // stop the progress indicator
                    alert("Oops, falied to do reject action");
                    registry.byId('doRejectView').performTransition("quoteListView", 1, "slide");
                } );
            }); 
            query("input[name='rejectReason']").forEach(function(item){
                    var box = query('#rejectCommentBoxDiv')[0];
                    on(item, "click", function(evt){        
                            query(".rejectReasonLargeItem").forEach(function (liItem){
                                    domClass.remove(liItem, "rejectReasonLargeItem");
                                    domClass.add(liItem,"rejectReasonItem");
                                });

                             if(item.checked){
                                 var reasonItem = item.parentElement.parentElement;
                                 
                                 domClass.remove(reasonItem, "rejectReasonItem");
                                 domClass.add(reasonItem,"rejectReasonLargeItem");
                                 domConstruct.place(box, reasonItem );
                             }
                        });
                }); 

        },
        
        callRejectActionService: function(quoteNum, userId, approvalLevel, accessLevel, action, comment, rejectReason, successCallback, failureCallback){
    	    var invocationData = {
				adapter: "QuoteAdapter",
				procedure: "approveActions",
				parameters: [quoteNum, userId, approvalLevel, accessLevel + '', action, comment, rejectReason]
			};
    	    WL.Client.invokeProcedure(invocationData, {
                onSuccess: successCallback,
                onFailure: failureCallback
            });
        }
	};
	return dsw.sqo.controller.DoRejectController;
});
