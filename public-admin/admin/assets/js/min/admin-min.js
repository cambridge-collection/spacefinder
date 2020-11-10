function unload() {
    window.onbeforeunload = function(e) {
        return 'You have made changes which have not been saved. Are you sure you wish to leave?';
    };
}

$().ready(function () {
    showHolidayTimes = null;

    $('input').on('change', function(event) {
        event.preventDefault();
        unload();
    });
    $('.remove_nested_fields').click(function(event) {
        unload();
    });

    $('form').on('submit', function(event) {
        window.onbeforeunload = null;
    });

    $('.pre-fill input').on('focus', function(event) {
        event.preventDefault();
        $(this).parent().addClass('focus')
    }).on('blur', function(event) {
        event.preventDefault();
        $(this).parent().removeClass('focus')
    });
    $('#edit-space-link').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        $(this).css('border', 'none').nextAll('a').css('overflow', 'hidden').animate({width:0, 'padding-left':0, 'padding-right':0}, {
            speed: 300,
            complete: function() {
                $(this).css('display', 'none');
                $this.animate({height:140}, 300);
                $('#spaces').slideDown(300);
            }
        });
    });
    $('#edit-space').on('click', function(event) {
        event.preventDefault();
        window.location = '/spaces/' + $('#spaces-list').val() + '/edit';
    });
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
    $('.header .title').on('click', function(event) {
        event.preventDefault();
        $(this).parent('.header').find('a.section-collapse').trigger('click');
    });

    $('.header.admin-dark a.section-collapse').trigger('click');

    $('#delete-space').on('click', function(event) {
        event.preventDefault();
        $('.delete-space-overlay .space-name').html($('#space_name').val());
        $('.delete-space-overlay').fadeIn('300');
    });

    $('.delete-space-overlay a.cancel-delete').on('click', function(event) {
        event.preventDefault();
        $('.delete-space-overlay').fadeOut('300');
    });

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

    if(showHolidayTimes !== null && showHolidayTimes !== undefined && showHolidayTimes == false) {
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


