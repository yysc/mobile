define([
    "dojo/_base/lang"
], function(lang){
	lang.getObject("dsw.sqo.model.Filter", true);
	
	dsw.sqo.model.Filter = {
        status: "*",
        date: "1W",
        code: "0",
        country: ""
	};
	return dsw.sqo.model.Filter;
});
