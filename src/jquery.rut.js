(function(){
	jQuery.fn.rut = function(user_options){
		var defaults = {
			external_dv: false,
			id_dv: null,
			format:true,
			validate:true
		};
		if (user_options && typeof user_options === "object"){
			var options = $.extend(defaults, user_options);
		}
		if(options.external_dv==true)
		{
			digitov=$('#'+options.id_dv).val();
			var res= jQuery.rut.limpiar($(this).val(),digitov);
		} else {
			var res= jQuery.rut.limpiar($(this).val(),null);
		}
		if(options.validate==true)
		{
			return jQuery.rut.validar(res);
		}
		else
		{
			return jQuery.rut.formato(res);
		}
	}
})(jQuery);
	
jQuery.rut = {
	limpiar: function(val,dv){
		if(dv==null){
			var digits = val.split("-");
			if(digits.length>1){
				var val = digits[0];
				var dv = digits[1];
			}
			else{
				var dv = val.substring(val.length-1, val.length);
				var val = val.substring(0, val.length-1);
			}
		}
		var rut= val.split('.').join("");
		return({"rut":rut,"dv":dv});
	},
	validar: function(data){
		var sum = 0;
		formatter=jQuery.rut.formato(data);
		if(formatter.res){
				var rA = data.rut.split('');
				var c = rA.length-1;
				for(x = c ; x>=0 ; x--){
					var f = isNaN(f) ? 9 :  (f < 4 ? 9 : f);
					sum = sum + (parseInt(rA[x]) * parseInt(f--));
				}
				digV = sum % 11;
				if(digV == 10){
					digV = "k";
				}
				else if(digV ==11){
					digV=0;
				}
				if(digV == data.dv.toLowerCase()){
					//console.log("RUT valido.");
					return JSON.stringify({"res" : true, "msg" : "RUT valido."});
				}
				else{
					//console.log("RUT no concuerda con digito verificador.");
					return JSON.stringify({"res" : false, "msg" : "RUT no concuerda con digito verificador."});
				}
		}else{
			//console.log("RUT con formato incorrecto.");
			return JSON.stringify({"res" : false, "msg" : "RUT con formato incorrecto."});
		}
	},
	formato: function(data){
		var regRut = new RegExp(/^\d{3,}$/);
		var regVer = new RegExp(/^[\dkK]$/);
		if(regRut.exec(data.rut) && regVer.exec(data.dv)){
			//console.log("RUT con formato correcto.");
			return JSON.stringify({"res" : true, "msg" : "RUT con formato correcto."});
		}else{
			//console.log("RUT con formato incorrecto.");
			return JSON.stringify({"res" : false, "msg" : "RUT con formato incorrecto."});
		}
	}
}