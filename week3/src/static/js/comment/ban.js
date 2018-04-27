define(['swiper'], function() {
    function ban() {
        new Swiper('.banner', {
            autoplay: 1000,
            loop: true
        })
    }
    return ban
})