(function(){
	this.Rut = function(){
		this.data=arguments[0].data;
		var defaults = {
			external_dv: false,
			id_dv: null,
			format:true,
			validate:true
		};
		if (arguments[0].options && typeof arguments[0].options === "object"){
			this.options = extendDefaults(defaults, arguments[0].options);
		}
	}
	
	Rut.prototype.format = function(){
		var sum = 0;
		var val=this.data.rut.value;
		if(this.options.external_dv != false){
			var dv=document.getElementById(this.options.id_dv).value;
			var rut=val;
		}
		else{
			var digits = val.split("-");
			if(digits.length>1){
				var rut = digits[0].split('.').join("");
				var dv = digits[1];
			}
			else{
				var clean = val.split('.').join("");
				var rut = clean.substring(0, val.length-1);
				var dv = clean.substring(val.length-1, val.length);
			}
		}
		var regRut = new RegExp(/^\d{3,}$/);
		var regVer = new RegExp(/^[\dkK]$/);
		if(regRut.exec(rut) && regVer.exec(dv)){
			if(this.options.validate == true){
				var rA = rut.split('');
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
				if(digV == dv.toLowerCase()){
					//console.log("RUT valido.");
					return JSON.stringify({"res" : true, "msg" : "RUT valido."});
				}
				else{
					//console.log("RUT no concuerda con digito verificador.");
					return JSON.stringify({"res" : false, "msg" : "RUT no concuerda con digito verificador."});
				}
			}
			else{
				//console.log("RUT con formato correcto, pero sin validación.");
					return JSON.stringify({"res" : true, "msg" : "RUT con formato correcto, pero sin validación."});
			}
		}
		else{
			//console.log("RUT con formato incorrecto.");
			return JSON.stringify({"res" : false, "msg" : "RUT con formato incorrecto."});
		}
	}
	
	
	function extendDefaults(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}



}());