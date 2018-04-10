(function () {
    $( document ).ready(function () {
      
        addReviewsController();
        //Добовляем кнопки управления к комментам на динамике 
        function addReviewsController() {
            var CommentCount =  $(".reviews .carousel-item").length;
            for (var i = 0; CommentCount > i; ++i)
            {
                if(i == 0)
                {
                    $('#reviews-controller').append('<li data-target="#reviewsIndicators" data-slide-to="'+i+'" class="active"></li>');
                }else
                {
                    $('#reviews-controller').append('<li data-target="#reviewsIndicators" data-slide-to="'+i+'"></li>');
                }
                
            }
        }

        //Активируем фото-карусель
        $('.photo').owlCarousel({
            center: true,
            items:2,
            loop:true,
            margin:10,
            responsive:{
                600:{
                    items:4
                }
            }
        });

        //Функция смены шагов
        selectBottomStep();
        selectBottomStepMobile()
        function selectBottomStepMobile() {
            $("#mobile-select").change(function(){
                showHideBlock($(this).val())
            });
        }
        function selectBottomStep() {
            var select = $(".pc-step a");
            var selectBottom = $('.step-buttons-bottom a');
            select.click(function (e) {
                e.preventDefault();
                var bottomCount =  select.length;
                var step = $(this).attr('id');
                for(var i = 0; bottomCount > i;i++)
                {
                    if($(select[i]).attr('id') == step)
                    {
                        $(select[i]).addClass("active");
                        $(selectBottom [i]).addClass("active");
                        showHideBlock(step);
                    }else
                    {
                        if($(select[i]).hasClass("active"))
                        {
                            $(select[i]).removeClass("active");
                            $(selectBottom[i]).removeClass("active");
                        }
                    }
                }
            });

            selectBottom.click(function (e) {
                e.preventDefault();
                /*
                var bottomCount =  selectBottom.length;
                var step = $(this).attr('id');
                for(var i = 0; bottomCount > i;i++)
                {
                    if($(selectBottom[i]).attr('id') == step)
                    {
                        $(select[i]).addClass("active");
                        $(selectBottom [i]).addClass("active");
                        showHideBlock(step);
                    }else
                    {
                        if($(selectBottom[i]).hasClass("active"))
                        {
                            $(select[i]).removeClass("active");
                            $(selectBottom[i]).removeClass("active");
                        }
                    }
                }
                 */
            })

        }
        function showHideBlock(e) {
            var select = $('.step-block-content > div');
            var count = select.length;
            for(var i = 0 ;count > i ; i++)
            {
                if($(select[i]).attr('class') == e)
                {
                    $(select[i]).fadeIn('slow')
                }else
                {
                    $(select[i]).fadeOut()
                }
            }
        }

    })
})();