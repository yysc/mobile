define([
	"dojo/_base/declare",
	"dojo/dom",
	"dijit/registry",
	"dojox/mobile/IconContainer",
	"dojox/mobile/_EditableIconMixin"
], function(declare, dom, registry, iconContainer, editableIconMixin){
	return declare("dsw.sqo.widget.EditableIconContainer", [iconContainer, editableIconMixin], {
		_currentIcon: null,
		
		deleteIconClicked: function(e){
			var item = this._currentIcon = registry.getEnclosingWidget(e.target);
			showSimpleDialog("Are you sure you want to delete [ " + item.label + " ]?", "Cancel", "Remove", hideSimpleDialog, removeIcon);
			return false;
		},
		
		deleteCurrentIcon: function(){
			if(this._currentIcon){
				this.deleteItem(this._currentIcon);
				this._currentIcon = null;
			}
		}
	});
});

