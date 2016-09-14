if (!Cookies.get('SACSID')) {
    document.location.href = 'https://tsaad-api.appspot.com/redirect/' + document.location.href;
}

// TODO add lib to do this!!!

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var cookie = getParameterByName('cookie');
if (cookie) {
    Cookies.set('SACSID', cookie);
    document.location.href = document.location.origin;
}

yawp.config(function(c) {
    c.baseUrl('https://tsaad-api.appspot.com/api');
    c.defaultFetchOptions({
        credentials: true
    });
});


pages = [];

$(document).ready(function() {
    var hash = window.location.hash.substring(2).split(":");
    if (hash != "") {
        try {
            window.setTimeout(function() {
                pages[hash[0]](hash[1]);
            }, 100);
        } catch (e) {
            console.warn("pagina non ecziste!!")
        }
    }
    $(window).on('hashchange', function(e) {
        var hash = window.location.hash.substring(2).split(":");
        pages[hash[0]](hash[1]);
    });
});

function Page(name, open) {
    this.name = name;
    this.main = $('main');
    pages[this.name] = function(parameter, payload) {

        window.location.hash = parameter ? "/" + this.name + ":" + parameter : "/" + this.name;
        this.main.html('');
        var content = open.bind(this)(parameter, payload);
        console.log(content);

    }.bind(this);
}
