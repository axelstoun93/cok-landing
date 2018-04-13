<?php
include 'Page.php';
$page = new Page();
if(!empty($_GET['pageName']) && $_GET['pageName'] != false)
{
    echo  $page->getPage($_GET['pageName']);
}