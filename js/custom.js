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
                    },
                    error: function () {
                        alert('Произошла ошибка при загрузки данных')
                    }

                });
                }
            })
        }
        
        
        sendForm();
        //Функция отправки данных с форм
        function sendForm() {
            $('.send-form').submit(function( event ) {
                alert( "Handler for .submit() called." );
                event.preventDefault();
            });
        }
    })
    
})();