let supports_storage = supports_html5_storage();

if (supports_storage) {
    let theme = localStorage.theme;
    if (theme) {
      set_theme(theme);
    }
} else {
    /* Don't annoy user with options that don't persist */
    $('#theme-dropdown').hide();
}

jQuery(function($)  {
    $('#theme-dropdown').change( function() {
        $(this).find(":selected").each(function () {
            let theme_name = $(this).attr('rel').split(' ');
            // skin="skin-blue" box="box-primary" tab="nav-tabs-custom-primary" toogle="toogle-primary" slider="blue"
            let theme = {
                skin: theme_name[0],
                box: theme_name[1],
                tab: theme_name[2],
                toogle: theme_name[3],
                slider: theme_name[4]
            }
            console.log(theme.skin, theme.box, theme.tab, theme.toogle, theme.slider);
            set_theme(theme);
        });
    });
});

function set_theme(theme) {
    
    $("#body").removeClass (function (index, className) {
        return (className.match (/(^|\s)skin-\S+/g) || []).join(' ');
    }).addClass(theme.skin);
    $(".box").removeClass (function (index, className) {
        return (className.match (/(^|\s)box-\S+/g) || []).join(' ');
    }).addClass(theme.box);
    $(".nav-tabs-custom").removeClass (function (index, className) {
        return (className.match (/(^|\s)nav-tabs-custom-\S+/g) || []).join(' ');
    }).addClass(theme.tab);
    $(".toogle-checkbox").removeClass (function (index, className) {
        return (className.match (/(^|\s)toogle-\S+/g) || []).join(' ');
    }).addClass(theme.toogle);
    $("#data-slider-id").removeClass (function (index, className) {
        return (className.match (/(^|\s)data-slider-\S+/g) || []).join(' ');
    }).addClass(theme.slider);

    if (supports_storage) {
        localStorage.theme = theme;
    }
}

function supports_html5_storage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
}


