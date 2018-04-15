<?php
class page
{
    private  $dirPages = __DIR__.'/pages';

    function index()
    {
        include 'pages/index.html';
    }
    // Функция получения страници по имени для ajax
    function getPage($name)
    {
        $pageName = $name;
        ob_start();
        include  $this->dirPages.'/'.$pageName.'.html';
        $res =  ob_get_contents();
        ob_clean();
        return $res;
    }
}
