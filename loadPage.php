<?php
include 'page.php';
$page = new page();
if(!empty($_GET['pageName']) && $_GET['pageName'] != false)
{
    echo  $page->getPage($_GET['pageName']);
}