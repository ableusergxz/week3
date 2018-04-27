define(
    ["jquery", "handlebars"],

    function($, handlebars) {

        return function(id, data, content) {

            var tpl = /#/g.test(id) ? $(id).html() : id; //2,获取模板内容

            var template = handlebars.compile(tpl); //3,传递模板，生成编译方法

            var html = template(data); //4,传递数据，返回编译后的内容

            if (content) {

                $(content).html(html)

            } else {

                return html
            }
        }
    }
)