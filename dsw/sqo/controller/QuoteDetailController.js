define([
    "dojo/_base/lang", 
    "dijit/registry", 
    "../ViewLoader", 
    "../Structure", 
    "dojo/query", 
    "dojox/mobile/RoundRectList",
    "dojox/mobile/RoundRectCategory",
    "dojox/mobile/EdgeToEdgeCategory",
    "dojox/mobile/ListItem", 
    "dojo/on",
    "dojo/dom-construct",
    "dsw/sqo/widget/QuoteOverall",
    "dojox/mobile/ProgressIndicator",
    "dsw/sqo/widget/CustomerPartner",
    "dsw/sqo/widget/PartPrice",
    "dsw/sqo/widget/SpecialBid",
    "dsw/sqo/widget/PartList",
    "dsw/sqo/widget/SpecialBidStatusInfo",
    "dojox/mobile/parser",
    "dojo/dom-class",
    "dojo/dom"
], function(lang, registry, viewLoader, structure, query, RoundRectList, RoundRectCategory, EdgeToEdgeCategory, ListItem,
		on, domConstruct, QuoteOverall, ProgressIndicator, CustomerPartner, PartPrice, SpecialBid, PartList,SpecialBidStatusInfo, parser, domClass, dom){
	lang.getObject("dsw.sqo.controller.QuoteDetailController", true);
    
	dsw.sqo.controller.QuoteDetailController = {
		init: function(moduleInitParameters){
	        var quoteNum = moduleInitParameters.webQuoteNum;
	        
	        var userId = dsw.sqo.model.User.id;
	        var userAccessLevel = dsw.sqo.model.User.sqoAccessLevel;
	        var specialBidFlag = true;
	        var self = this;
	        
	        var prog = ProgressIndicator.getInstance();
	        domConstruct.place(prog.domNode,registry.byId('overallInfoView').containerNode);
	        prog.start();

	        this.callGetQuoteDetailService("getQuoteOverall", quoteNum, userId, function(response){
	            prog.stop();
	            // create Customer and Partner view start
	            var userAccessObj = response.invocationResult.userAccess;
	            if(userAccessLevel != 5){
	                query(".approveActionIcon").forEach(function(item){
	                    item.style.display = "none";
	                });
	            } else {
	            	if (userAccessObj != undefined && userAccessObj.canApprove){
	                    query(".approveActionIcon").forEach(function(item){
	                        item.style.display = "block";
	                    });
	            	}
	            }
	            var specialBidReasons = "";
	            var sbFlag = response.invocationResult.specialBidFlag;
	            if(sbFlag == 0){
	            	specialBidFlag = false;
	            } else {
		            self.callGetQuoteDetailService("getQuoteSpecialBidReason", quoteNum, userId, function(rep){
//		            	busyInd.hide();
//		            	prog.stop();
		            	var failure = false;
		            	if (rep.invocationResult.result && rep.invocationResult.result.returnCode ==0) {
		            		failure = true;			            		
		            	} else {
		            		specialBidReasons= rep.invocationResult.speclBidReasons;
		            	}
		            	if (registry.byId('specialBidScrollView')) {
			       			var sbListItem = new ListItem({
		    					className : "mblDswSpecialBidJustListItem"
		    				});
			       		 var speclBidReasonsString="";
			 			 if(specialBidReasons != undefined && specialBidReasons.length >0){
			 	            for (var i=0;i< specialBidReasons.length; i++){
			 	            	var reason = specialBidReasons[i];
			 	            	if(i==0){
									speclBidReasonsString += "<li style=\"list-style:disc\">" +reason.code + "</li>";
	            				} else {
	            					speclBidReasonsString += "<li style=\"list-style:disc; margin-top: 5px;\">" + reason.code + "</li>";
	            				}
			 	            }
			 			} else {
			 				speclBidReasonsString ="";
			 			}
			 			 if (speclBidReasonsString =="") {
			 				 if (failure) {
			 					sbListItem.domNode.innerHTML = "<div class=\"specialBidWarning\"></div><div class=\"charposition\">Failed to load special bid reason. Pls reload again!</div>"; 
			 				 } else {
			 					sbListItem.domNode.innerHTML = "<p><span class='specialBidContentBoldValue'>"+ "There are no special bid reason." +"</span></p>"; 
			 				 }
			 				
			 			 } else {
			 				var content = "<ul  class=\"specialBidReasonList\">" + speclBidReasonsString + "</ul>";
			       			sbListItem.domNode.innerHTML =content; 
			       				//"<div class='specialBidTitleValue'>The quote requires approval for the following reasons:</div><p><span class='specialBidContentBoldValue'>"+ speclBidReasonsString +"</span></p>";				       			
	            		 }
			       			dom.byId("specialBidReason").innerHTML = sbListItem.domNode.innerHTML;
		            	}
		            	
		            },function(error){
		            	 alert("Just let you know that I'm still loading quote special bid reason in the backend...");
		            });
	            }
	            if(!specialBidFlag){
	       			//destroyRecursive special bid approver page
	       			var specialBidStatusInfoView = registry.byId('specialBidStatusInfoView');
                	if (specialBidStatusInfoView) {
                		specialBidStatusInfoView.destroyRecursive();
                	}
                	registry.byId('swipeDots').reset();
	            }
	            registry.byId('swipeDots').set("style", "display:block");
	            
	            var overallStatus = response.invocationResult.quoteOverallStatuses;
	            var viewOverallStatus = showStatus(overallStatus);
	            var currencyDscr = response.invocationResult.currencyDscr;
	            var quotePriceTotalVal = response.invocationResult.quotePriceTot;
	            var fulfillmentSrc = response.invocationResult.fulfillmentSrc;
	            var lobCode = response.invocationResult.lob;
	            var priceCountry = "";
	            var quoteOverallObj = {
	                webQuoteNum: response.invocationResult.webQuoteNum,
		            quoteTitle : response.invocationResult.quoteTitle,
	                custName : response.invocationResult.custName,
	                city : response.invocationResult.city,
	                country : response.invocationResult.country,
	                currencyDscr : response.invocationResult.currencyDscr,
	                submittedDate : response.invocationResult.submittedDate,
	                effDate : response.invocationResult.effDate,
	                quoteExpDate : response.invocationResult.quoteExpDate,
	                quotePriceTot : response.invocationResult.quotePriceTot,
	                quoteOverallStatuses : viewOverallStatus,
	                
	                soldToCustNum : response.invocationResult.soldToCustNum,
	                fulfillmentSrc: response.invocationResult.fulfillmentSrc,
	                reslCustNum: response.invocationResult.reslCustNum,
	                rselCustName: response.invocationResult.rselCustName,
		            payerCustNum: response.invocationResult.payerCustNum,
	                payerCustName: response.invocationResult.payerCustName,
	                lob: response.invocationResult.lob,
	                lobDscr: response.invocationResult.lobDscr,
	                address: response.invocationResult.address,
	                contactName: response.invocationResult.contactName,
	                contactPhone: response.invocationResult.contactPhone
	            };
	            
	            var headerTitle = "Quote number<br/>" + quoteOverallObj.webQuoteNum;
		        var backTempView = registry.byId("customerHeadView");
		        backTempView.set("label", headerTitle);
		        
		        backTempView = registry.byId("partListHeadView");
		        backTempView.set("label", headerTitle);
		        
		        backTempView = registry.byId("spcialHeadView");
		        backTempView.set("label", headerTitle);
		        
		        backTempView = registry.byId("spcialStatusHeadView");
		        if(backTempView){
		            backTempView.set("label", headerTitle);
		        }
	            
	            var quoteOverallWidget = new QuoteOverall(quoteOverallObj); 
	            var quoteOverallWidgetContainer = domConstruct.create("DIV"); 
	            quoteOverallWidgetContainer.innerHTML = quoteOverallWidget.domNode.innerHTML;
	            parser.parse(quoteOverallWidgetContainer);
	            registry.byId('overallInfoScrollView').containerNode.innerHTML = quoteOverallWidgetContainer.innerHTML;
	            // create Customer and Partner view end
	            
	            domConstruct.place(prog.domNode,registry.byId('partListScrollView').containerNode);
	            prog.start();
	            self.callGetQuoteDetailService("getQuotePartPrice", quoteNum, userId, function(response){
	            	prog.stop();
	            	// create Part and pricing view start
	            	priceCountry = response.invocationResult.priceCountry;
	                var partListObjectVal = {                 
	                        softwareQuoteLineItems:response.invocationResult.softwareQuoteLineItems,
	                        saasQuoteLineItems: response.invocationResult.saasQuoteLineItems,
	                        monthlyLicensingLineItems: response.invocationResult.monthlyLicensingLineItems,               		
	                		webQuoteNum: response.invocationResult.webQuoteNum,
	                		currencyDscr : currencyDscr,
	                        quotePriceTot : quotePriceTotalVal,
	                        quoteOverallStatuses : viewOverallStatus
	                    };
	                
	                var partListWidget = new PartList(partListObjectVal);
	                
	                var partListWidgetContainer = domConstruct.create("DIV"); 
	                partListWidgetContainer.innerHTML = partListWidget.domNode.innerHTML;
	                registry.byId('partListScrollView').containerNode.innerHTML = partListWidgetContainer.innerHTML;
	                parser.parse(registry.byId('partListScrollView').containerNode);
	                
	                var partLineItemSeqObj = query("#partListScrollView li");
		       		partLineItemSeqObj.forEach(function(item){
		       			var seqNumObj = query(".softwareHiddenPartItem", item);
	       				on(item, "click", function(){
	       					goToPartLineItemPage(quoteNum,seqNumObj[0].innerHTML,currencyDscr,quotePriceTotalVal,fulfillmentSrc,lobCode,priceCountry);
	                    });
		            });
	                // create Part and pricing view end
	                
		            //for every quote details load, we will pre-load line item details
		            callGetPartListWithDetails(quoteNum, userId);
		       		
		       		if(specialBidFlag) {
			       		domConstruct.place(prog.domNode,registry.byId('specialBidScrollView').containerNode);
			            prog.start();
			       		self.callGetQuoteDetailService("getQuoteSpecialBid", quoteNum, userId, function(response){
			       			prog.stop();

			                var specialBidObj = {
			                    speclBidReasons: specialBidReasons,
			                    speclBidJstfs: response.invocationResult.speclBidJstfs,
			                    speclBidApprvrDtl: response.invocationResult.speclBidApprvrDtl,
			                    webQuoteNum: response.invocationResult.webQuoteNum,
	                			currencyDscr : currencyDscr,
	                        	quotePriceTot : quotePriceTotalVal
			                };
			                var specialBidWidget = new SpecialBid(specialBidObj);
			                var specialBidWidgetContainer = domConstruct.create("DIV");
			                specialBidWidgetContainer.innerHTML = specialBidWidget.domNode.innerHTML;
			                parser.parse(specialBidWidgetContainer);
			                registry.byId('specialBidScrollView').containerNode.innerHTML = specialBidWidgetContainer.innerHTML;
			                if(specialBidObj.speclBidJstfs != ''){
			                    var specialBidJstfsView = dom.byId("jstfTxt");						
			                	var jstfSummary = specialBidJstfsView.innerHTML;
			                				                	
			                	var jf = document.getElementById("jstfFrame");
								jf.scrolling = "no";	
								var childHeight = 0;
								if(jf.contentWindow.document){
									jf.contentWindow.document.body.innerHTML = jstfSummary;
									jf.contentWindow.document.body.style.marginTop = "0";
									jf.contentWindow.document.body.style.marginBottom = "0";
									childHeight = jf.contentWindow.document.body.offsetHeight;
								} else {
									jf.contentDocument.body.innerHTML = jstfSummary;
									jf.contentDocument.body.style.marginTop = "0";
									jf.contentDocument.body.style.marginBottom = "0";
									childHeight = jf.contentDocument.body.offsetHeight;
								}
											                									
			                	jf.style.height = childHeight + "px";
	            				if(childHeight > JSTFS_DISPLAY_LIMIT){
	            					jf.style.height = JSTFS_DISPLAY_LIMIT + "px";
	            					var jstfsDiv = domConstruct.create("DIV", {
	            						id: "jstfsDiv",
	            						className: "specialBidContentValue",
	            						style: "float: right",
										innerHTML: "<a id=\"jstfsLink\" href=\"javascript:expandJstfs()\" class=\"specialBidJustLink\">...more</a>",
									});
	            					domConstruct.place(jstfsDiv, dom.byId("jstfListItem"));					
	            				}
	            				
	            				document.getElementById("jstfTxt").remove();
	            			}
			                
			                var specialBidApprovrVal = self.buildStatusColor(response.invocationResult.speclBidApprvrDtl);
		                	var specialBidStatusInfoObj = {
				                 		speclBidReasons :specialBidReasons,
				                        speclBidApprvrDtl: specialBidApprovrVal,
				                        speclBidJstf: response.invocationResult.speclBidJstfs,
				                        webQuoteNum: response.invocationResult.webQuoteNum,
	                					currencyDscr : currencyDscr,
	                        			quotePriceTot : quotePriceTotalVal
				             };
	                		var specialBidStatusInfoWidget = new SpecialBidStatusInfo(specialBidStatusInfoObj);
		                    var specialBidStatusInfoWidgetContainer = domConstruct.create("DIV");
		                    specialBidStatusInfoWidgetContainer.innerHTML = specialBidStatusInfoWidget.domNode.innerHTML;
		                    parser.parse(specialBidStatusInfoWidgetContainer);
		                    
		                    registry.byId('specialBidStatusInfoScrollView').containerNode.innerHTML = specialBidStatusInfoWidgetContainer.innerHTML;
		                    if (specialBidReasons == "") {
		                    	dom.byId("specialBidReason").innerHTML = "<div class=\"specialBidLoadGif\"></div>";
		                    	//dom.byId("specialBidReason").innerHTML = "<div class=\"specialBidWarning\"></div><div class=\"charposition\">Failed to load special bid reason. Pls try to reload again!</div>";
		                    }
		                    
			       		},function(error){
			                alert("Just let you know that I'm still loading quote special bid in the backend...");
			            });
		       		} else {
		       			var specialBidScrollView = registry.byId('specialBidScrollView');
		       			specialBidScrollView.addChild(new EdgeToEdgeCategory({
		       				label : "Quote value: " + quotePriceTotalVal +" "+ currencyDscr,
		       				className : "mblEdgeToEdgeCategory specialBidCategoryTitleFont specialBidFirstCategoryTitle"
		                }));
		       			specialBidScrollView.addChild(new EdgeToEdgeCategory({
		       				label : "Special bid details",
		       				className : "mblEdgeToEdgeCategory specialBidCategoryTitleFont specialBidFirstCategoryTitle"
		                }));
		       			var sbRoundRectLists = new RoundRectList({});
		       			var sbListItem = new ListItem({
	    					className : "mblDswSpecialBidJustListItem"
	    				});
		       			sbListItem.domNode.innerHTML = "<p><span class='specialBidContentBoldValue'>This quote does not require special bid approval.</span></p>";
		       			sbRoundRectLists.addChild(sbListItem);
		       			specialBidScrollView.addChild(sbRoundRectLists);
		       			specialBidScrollView.startup();
		       			//destroyRecursive special bid approver page
		       			var specialBidStatusInfoView = registry.byId('specialBidStatusInfoView');
	                	if (specialBidStatusInfoView) {
	                		specialBidStatusInfoView.destroyRecursive();
	                	}	                	
	                	registry.byId('swipeDots').set("style", "display:block");
		       		}
	            },function(error){
	                alert("Just let you know that I'm still loading quote part and price in the backend...");
	            });
	        },function(error){
	            alert("Just let you know that I'm still loading quote overall info in the backend...");
	        });
		},
        
        callGetQuoteDetailService: function(procedure, quoteNum, userId, successCallback, failureCallback){
    	    var invocationData = {
				adapter: "QuoteAdapter",
				procedure: procedure,
				parameters: [quoteNum, userId]
			};
    	    WL.Client.invokeProcedure(invocationData, {
                onSuccess: successCallback,
                onFailure: failureCallback
            });
        },
		
        callGetPartListWithDetails: function(quoteNum, userId, successCallback, failureCallback){
    	    var invocationData = {
				adapter: "QuoteAdapter",
				procedure: "getPartListWithDetails",
				parameters: [quoteNum, userId]
			};
    	    WL.Client.invokeProcedure(invocationData, {
                onSuccess: successCallback,
                onFailure: failureCallback
            });
        },
        
        buildStatusColor:function(speclBidApprvrDtl){
        	var reSpeclBidApprvrDtlArr = new Array();
        	if (speclBidApprvrDtl!=undefined && speclBidApprvrDtl.length>0 ){
        		for(var i=0; i<speclBidApprvrDtl.length; i++){
        			var userAction = speclBidApprvrDtl[i].userAction;
        			var code = speclBidApprvrDtl[i].userActionCode;
            		if(userAction != 'undefined' && userAction != ''){
            			userAction = userAction.trim();
            		}
            		if(code == 'APPRVL_PENDG' || code  == 'ADD_APRVR_COMMENT'){
            			speclBidApprvrDtl[i].userAction = '<font style="color:#dd731c;">' + userAction + '</font>';
            		}else if(code == 'RETURN_FOR_ADD_INFO' || code  == 'RETURN_FOR_CHANGES'){
            			speclBidApprvrDtl[i].userAction = '<font style="color:#838329;">' + userAction + '</font>';
            		}else if(code == 'REJECT'){
            			speclBidApprvrDtl[i].userAction = '<font style="color:#d9182d;">' + userAction + '</font>';
            		}else if(code == 'APPROVE'){
            			speclBidApprvrDtl[i].userAction = '<font style="color:#17af4b;">' + userAction + '</font>';
            		}
            		reSpeclBidApprvrDtlArr[i] = speclBidApprvrDtl[i];
        		}
        	}
        	return reSpeclBidApprvrDtlArr;
    	}
        
	};
	return dsw.sqo.controller.QuoteDetailController;
});

