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
        
        
    })
})();