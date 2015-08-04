
//= require jquery

$().ready(function () {
    $('.header').append(
        $('<a />')
        .append($('<i />').addClass('icon-arrow-down'))
        .addClass('section-collapse')
        .addClass('expanded')
        //.text('collapse')
        .on('click', function(event) {
            event.preventDefault();
            if($(this).hasClass('expanded')) {
                //collapse
                //$(this).text('expand');
                $(this).find('i').removeAttr('class').addClass('icon-arrow-up');
                $(this).parent().next('.section').slideUp(300);
            } else {
                //expand
                //$(this).text('collapse');
                $(this).find('i').removeAttr('class').addClass('icon-arrow-down');
                $(this).parent().next('.section').slideDown(300);
            }
            $(this).toggleClass('expanded');

        })
    );

    $('.get-location').on('click', function(event) {
        event.preventDefault();
        $(this).addClass('disabled').html('<i class="icon-loading"></i>');
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $('#space_lat').val(position.coords.latitude);
                $('#space_lng').val(position.coords.longitude);
                $('.get-location').removeClass('disabled').html('use my location');
            });
        }
    });
    $('.term-times .field>label>input[type=checkbox], .holiday-times .field>label>input[type=checkbox]').each(function(index, el) {
        console.log($(this).parents('.field').nextAll('.times:first'));
        if(!!$(this).is(':checked')) {
            $(this).parents('.field').next('.closed').addClass('hidden');
            $(this).parents('.field').nextAll('.times:first').removeClass('hidden');
        } else {
            $(this).parents('.field').next('.closed').removeClass('hidden');
            $(this).parents('.field').nextAll('.times:first').addClass('hidden');
        }
    });
    $('.term-times .field>label>input[type=checkbox], .holiday-times .field>label>input[type=checkbox]').on('change', function(event) {
        console.log($(this).is(':checked'));
        if(!!$(this).is(':checked')) {
            $(this).parents('.field').next('.closed').addClass('hidden');
            $(this).parents('.field').nextAll('.times:first').removeClass('hidden');
        } else {
            $(this).parents('.field').next('.closed').removeClass('hidden');
            $(this).parents('.field').nextAll('.times:first').addClass('hidden');
        }
    });
    $('input[type=time]').each(function(index, el) {
        if($(this).val() == "") $(this).val('00:00');
    });
    $('.times input[type=checkbox]').on('change', function(event) {
        if($(this).is(':checked')) {
            $(this).parents('.times').find('input[type="time"]:first').attr('disabled', 'disabled').val('00:00')
            $(this).parents('.times').find('input[type="time"]:last').attr('disabled', 'disabled').val('23:59');
        } else {
            $(this).parents('.times').find('input[type="time"]:first').removeAttr('disabled').val('00:00')
            $(this).parents('.times').find('input[type="time"]:last').removeAttr('disabled').val('00:00');
        }
    });

    if(showHolidayTimes !== undefined && showHolidayTimes == false) {
        $('.holiday-times').slideUp(300);

    } else {
        $('#show-holiday-times').html('hide holiday times').addClass('active')
    }
    $('#show-holiday-times').on('click', function(event) {
        event.preventDefault();
        if(!!$(this).hasClass('active')) {
            $(this).removeClass('active').html('show holiday times')
            $('.holiday-times').slideUp(300);
        } else {
            $(this).addClass('active').html('hide holiday times')
            $('.holiday-times').slideDown(300);
        }
    });
})
