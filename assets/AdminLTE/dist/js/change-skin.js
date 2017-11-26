var supports_storage = supports_html5_storage();

if (supports_storage) {
    var theme = localStorage.theme;
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
            var theme_name = $(this).attr('rel');
            var theme = theme_name;
            set_theme(theme);
        });
    });
});

function set_theme(theme) {
    
    $("#body").removeClass (function (index, className) {
        return (className.match (/(^|\s)skin-\S+/g) || []).join(' ');
    }).addClass(theme);
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


