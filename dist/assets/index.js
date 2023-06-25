$(document).ready(function () {
    var rangeSlider = function () {
        var slider = $('.age-rating'),
            range = $('.age-rating input[type="range"]'),
            value = $('.range-value');
        slider.each(function () {
            value.each(function () {
                var value = $(this).prev().attr('value');
                $(this).html(value);
            });
            range.on('input', function () {
                $(this).prev(value).html(`${this.value}+`);
            });
        });
    };
    rangeSlider();
});
