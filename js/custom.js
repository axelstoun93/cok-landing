(function () {
    $( document ).ready(function () {
        hoverAnimate();
        function hoverAnimate() {
            var choiceBlocks = $('.choice-block');
            var animateBlock = $('.single-icon');
            $(choiceBlocks).hover(function() {
                if($(this).children('div').hasClass('pulse animated'))
                {
                    $(this).children('div').removeClass('pulse animated');
                }else
                    {
                        $(this).children('div').addClass('pulse animated');
                    }
        });
            // Определяем была анимация или нет если была то больше не запускаем
        }
        //Работодатель или специалист ?
        choiceSelect();
        function choiceSelect() {
            var choiceBlock = $('.choice-block');
            var pageName = false;
            var specialtyBlock = $('.specialty');
            var dynamicBlock = $('#dynamic');
            choiceBlock.click(function (e) {
                pageName = $(this).parent().attr('id');
                $.ajax({
                    type: "GET",
                    url: '/loadPage',
                    data: {pageName: pageName},
                    dataType: "html",
                    success: function (result) {
                        dynamicBlock.hide();
                        specialtyBlock.empty().append(result);
                        if (specialtyBlock.is(':hidden')) {
                            specialtyBlock.fadeIn('slow');
                        }
                        scrollTo(specialtyBlock);
                    },
                    error: function () {
                        alert('Произошла ошибка при загрузки данных')
                    }

                });
            })
        }
        //Выбрать специальность
        choiceSpecialty();
        function choiceSpecialty() {
            var pageName = false;
            var dynamicBlock = $('#dynamic');
            $(document).on('click','.specialty-block',function () {
                pageName = $(this).parent().attr('id');
                if(pageName == 'hairdresser' || pageName == 'hairdresser-employer'){
                $.ajax({
                    type: "GET",
                    url: '/loadPage',
                    data: {pageName: pageName},
                    dataType: "HTML",
                    success: function (result) {
                        dynamicBlock.empty().append(result);
                        if (dynamicBlock.is(':hidden')) {
                            dynamicBlock.fadeIn('slow');
                        }
                        scrollTo(dynamicBlock);
                    },
                    error: function () {
                        alert('Произошла ошибка при загрузки данных')
                    }

                });
                }
            })
        }



        sendForm();
        function sendForm() {
            $('.call-back-form').submit(function( event ) {
                event.preventDefault();
                var form = $(this);
                var dataForm = form.serializeArray();
                var sendUrl  = form.attr('action');
                var notificationBlock =  $('#notification-modal');
                var notificationContent =  $('.notification-block');
                $('#notification-popup-close').click(function () {
                    $.magnificPopup.close();
                });
                $.magnificPopup.close();
                $.ajax({
                    type: "POST",
                    url: sendUrl,
                    data: dataForm,
                    dataType: "json",
                    success: function (result) {
                        if(result.status)
                        {
                            $.magnificPopup.open({
                                items: {
                                    src: notificationBlock
                                },
                                type: 'inline',
                                showCloseBtn: false,
                                callbacks: {
                                    open: function() {
                                        $( ".alert" ).remove();
                                        notificationContent.append('<div class="alert '+result.class+'" role="alert">'+ result.messages+'</div>');
                                        form.trigger('reset');
                                    }
                                }
                            });
                        }else
                        {
                            $( ".alert" ).remove();
                            notificationContent.append('<div class="alert '+result.class+'" role="alert">'+ result.messages+'</div>');
                            form.trigger('reset');
                        }
                    },
                    error: function () {
                        alert('Произошла ошибка при отправки данных')
                    }
                });
            });
        }
//функция автоскролинга до элемента
function scrollTo(elem) {
    $('html, body').animate({
        scrollTop: elem.offset().top
    }, 1000);

}


    })


    
})();