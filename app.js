yawp.config(function (c) {
    c.baseUrl('https://tsaad-api.appspot.com/api');
    c.defaultFetchOptions({
        credentials: true
    });
});

Cookies.set('SACSID', 'your cookie here');

//ativar sidenav
$('.abrir-menu').sideNav();



