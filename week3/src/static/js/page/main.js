require([
    "jquery",
    "../comment/template",
    "swiper",
    "ban",
    "tab"


], function($, template, swiper, ban, tab) {

    $.ajax({
        url: "/api/get_index",
        type: "get",
        dataType: "json",
        success: function(data) {
            console.log(data);
            template('#tpl', { data: data.data }, '.text')
            ban()
            tab()
        }
    })
})