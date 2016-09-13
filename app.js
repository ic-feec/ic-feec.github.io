pages = [];

yawp.config(function (c) {
    c.baseUrl('https://tsaad-api.appspot.com/api');
    c.defaultFetchOptions({
        credentials: true
    });
});

$(document).ready(function () {
	var hash = window.location.hash.substring(2).split(":");
	if(hash != ""){
		try{
			window.setTimeout(function(){
				pages[hash[0]](hash[1]);
			}, 100);			
		}catch(e){
			console.warn("pagina non ecziste!!")
		}
	}
	$(window).on('hashchange', function(e){
		var hash = window.location.hash.substring(2).split(":");
		pages[hash[0]](hash[1]);
	});
});
function Page(name, open){
	this.name = name;
	this.main = $('main');
	pages[this.name] = function(parameter, payload){
		
		window.location.hash = parameter ?  "/" + this.name + ":" + parameter : "/" + this.name ;
		this.main.html('');
		var content = open.bind(this)(parameter, payload);
		console.log(content);
		
	}.bind(this);
}