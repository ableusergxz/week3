define(["zepto"], function() {
    function tab() {
        //tab
        $(function() {
            var mySwiper = new Swiper('.tab', {
                    onSlideChangeEnd: function(swiper) {
                        var j = mySwiper.activeIndex;
                        $('.maple-tab li, .maple-tab2 li').removeClass('active').eq(j).addClass('active');
                    }
                })
                /*列表切换*/
            $('.maple-tab li, .maple-tab2 li').on('click', function(e) {
                e.preventDefault();
                //得到当前索引
                var i = $(this).index();
                $('.maple-tab li, .maple-tab2 li').removeClass('active').eq(i).addClass('active');
                mySwiper.slideTo(i, 1000, false);
            });
        });
    }
    return tab;
})