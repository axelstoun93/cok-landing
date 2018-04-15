(function () {
    $( document ).ready(function () {


        addReviewsController();

//Добовляем кнопки управления к комментам на динамике
        function addReviewsController() {
            var CommentCount = $(".reviews .carousel-item").length;
            for (var i = 0; CommentCount > i; ++i) {
                if (i == 0) {
                    $('#reviews-controller').append('<li data-target="#reviewsIndicators" data-slide-to="' + i + '" class="active"></li>');
                } else {
                    $('#reviews-controller').append('<li data-target="#reviewsIndicators" data-slide-to="' + i + '"></li>');
                }

            }
        }

//Активируем фото-карусель
        $('.photo').owlCarousel({
            center: true,
            items: 2,
            loop: true,
            margin: 10,
            responsive: {
                600: {
                    items: 4
                }
            }
        });
//Функция смены шагов
        selectBottomStep();
        selectBottomStepMobile();

        function selectBottomStepMobile() {
            $("#mobile-select").change(function () {
                showHideBlock($(this).val())
            });
        }

        function selectBottomStep() {
            var select = $(".pc-step a");
            var selectBottom = $('.step-buttons-bottom a');
            select.click(function (e) {
                e.preventDefault();
                var bottomCount = select.length;
                var step = $(this).attr('id');
                for (var i = 0; bottomCount > i; i++) {
                    if ($(select[i]).attr('id') == step) {
                        $(select[i]).addClass("active");
                        $(selectBottom [i]).addClass("active");
                        showHideBlock(step);
                    } else {
                        if ($(select[i]).hasClass("active")) {
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
            for (var i = 0; count > i; i++) {
                if ($(select[i]).attr('class') == e) {
                    $(select[i]).fadeIn('slow')
                } else {
                    $(select[i]).fadeOut()
                }
            }
        }

// Функции отображения  модельного окна вопросов
        clickQuestionBottoms();

        function clickQuestionBottoms() {
            $('.question').click(function () {
                // Получаем id по которому будем искать нужный div блок и отоброжать его
                var Class = $(this).children('.question-number').attr('id');
                showHideQuestions(Class);
                var el = $('#examples-of-questions');
                if (el.length) {
                    $.magnificPopup.open({
                        items: {
                            src: el
                        },
                        type: 'inline',
                        showCloseBtn: false,
                        callbacks: {
                            open: function() {
                                    animateQuestions(Class)
                            }
                        }
                    });
                }
            });
            $('#white-popup-close').click(function () {
                $.magnificPopup.close();
            })
        }

// Функции отображения  блоков с вопросами
        function showHideQuestions(name) {
            //Имя класса который нужно отобразить
            var className = name;
            //подсчитывае все блоки чтобы пройтись циклом и скрыть не нужные
            var allBlock = $('.answer-block > div');
            var countBlock = allBlock.length;
            for (var i = 0; countBlock > i; i++) {
                //Эказатель на текущем элементе
                var currentClass = allBlock[i];
                //Имя текущего клаcса
                var currentClassName = $(currentClass).attr('class');
                if (currentClassName == className) {
                    //Если полученное имя совподает с классам текущего элемента то отображаем
                    $(currentClass).show();
                } else {
                    //Если име не совподает то скрываем элемент
                    $(currentClass).hide()
                }
            }
        }
        function animateQuestions(name) {

            switch(name) 
            {
                case 'question-1':
                    questionOne();
                    break;
                /*
                case 'question-2':
                    questionTwo();
                    break;
                */
            }
            
            function questionOne()
            {
                var correctAnswer = $('.question-answer > p')[1];
                setTimeout(function () {
                    if(!$(correctAnswer).hasClass('correct-answer'))
                    {
                        $(correctAnswer).addClass('correct-answer');
                    }
                },1000);
            }
            function questionTwo()
            {
                var spanWords = $('.question-answer-two  span');
                var duration = 2000;
                var word = ['с','л','о','в','о'];
                setTimeout(function () {
                    $(spanWords).empty();
                    $(word).each(function (index) {
                        $(spanWords).delay(duration * index).append(word[index]);
                });
            },2000);
            }
            function questionThree()
            {

            }
            function questionFour()
            {

            }
                


        }
    })
})();

