define([
    "dojo/_base/lang"
], function(lang){
	lang.getObject("dsw.sqo.model.User", true);
	
	dsw.sqo.model.User = {
        id: "",
        password: "",
        firstName: "",
        lastName: "",
        sqoAccessLevel: "",
        uniqueID: "",
        loggedIn: false
	};
	return dsw.sqo.model.User;
});
