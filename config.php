<?php
class config {
    
    //mail settings
    public $sendMail = 'axelstoun@mail.ru'; // Указываем получаетей письма
    public $encodingMail = 'UTF-8';
    
    
    
    protected static $_instance;
    private function __construct() {
    }

    public static function getInstance() {
        if (self::$_instance === null) {
            self::$_instance = new self;
        }

        return self::$_instance;
    }
    private function __clone() {
    }
    private function __wakeup() {
    }
}