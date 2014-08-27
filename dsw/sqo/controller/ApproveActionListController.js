define([
    "dojo/_base/lang", 
    "../ViewLoader", 
    "../Structure",
    "dijit/registry", 
    "dojo/dom",
    "dojo/on",
    "dojo/query",
    "dojo/dom-class"
], function(lang,viewLoader,structure, registry, dom, on, query, domClass){
	lang.getObject("dsw.sqo.controller.ApproveActionListController", true);
	
	dsw.sqo.controller.ApproveActionListController = {
		init: function(moduleInitParameters){
           var webQuoteNum = moduleInitParameters.webQuoteNum;
           var approvalLevel = moduleInitParameters.approvalLevel;
           var self = this;

           on(dom.byId('approveBtn'), "click", function(){
                   self.displayComment("doApproveView",webQuoteNum,approvalLevel,"APPROVE");
           });
           on(dom.byId('rejectBtn'), "click", function(){
                   self.displayComment("doRejectView",webQuoteNum,approvalLevel,"REJECT");
           });
           on(dom.byId('saveAsDraftBtn'), "click",  function(evt){
                   self.displayComment("doApproveView",webQuoteNum,approvalLevel,"SAVE_DRAFT");
            });
            on(dom.byId('returnForInfoBtn'), "click",  function(evt){
                   self.displayComment("doRejectView",webQuoteNum,approvalLevel,"RETURN_FOR_ADD_INFO");
            });
            on(dom.byId('returnForChangeBtn'), "click",  function(evt){
                   self.displayComment("doRejectView",webQuoteNum,approvalLevel,"RETURN_FOR_CHANGES");
            });
        },
          displayComment: function(viewName, webQuoteNum, approvalLevel,action){
                var approveActionListView = registry.byId('approveActionListView');
                viewLoader.load(structure.views[viewName],{webQuoteNum: webQuoteNum, approvalLevel:approvalLevel, action: action}, function(){
                        approveActionListView.performTransition(viewName, 1, 'slide');
                });

            }
        
	};
	return dsw.sqo.controller.ApproveActionListController;
});
