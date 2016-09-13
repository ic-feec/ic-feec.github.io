pages = [];

yawp.config(function (c) {
    c.baseUrl('https://tsaad-api.appspot.com/api');
    c.defaultFetchOptions({
        credentials: true
    });
});

//ativar sidenav
$('.abrir-menu').sideNav();

$('#little-sidenav a').on('click', function(){
	var page = $(this).attr('class');
	pages[page]();
    $('.abrir-menu').trigger('click');
})



