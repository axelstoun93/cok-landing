<?php
require 'lib/PHPMailer-master/src/Exception.php';
require 'lib/PHPMailer-master/src/PHPMailer.php';
require 'lib/PHPMailer-master/src/SMTP.php';
require 'config.php';
class mail
{
    private $mail;
    private $data = [];
    private $config;
    function __construct($data)
    {
         $this->config = config::getInstance();
         $this->mail = new PHPMailer\PHPMailer\PHPMailer();
         $this->mail->CharSet = $this->config->encodingMail;
         $this->dataValidate($data);
    }
    function dataValidate($data)
    {

        if(!empty($data) && count($data) > 0)
        {
            if(is_array($data))
            {
                foreach ($data as $key => $val)
                {
                    $this->data[$key] = $this->validate($val);
                }
            }else
            {
                $this->data = $this->validate($data);
            }
        }
        $this->data = (object)$this->data;
    }
    function validate($data)
    {
        $step = trim($data);
        $stepTwo = stripslashes($step);
        $stepTree = strip_tags($stepTwo);
        return $stepTree;
    }
    function askQuestion()
    {
        if(!empty($this->data->name) and !empty($this->data->email))
        {

            $this->mail->setFrom('no-reply@cokbeauty.ru', "ЦОК");
            $this->mail->addAddress($this->config->sendMail, $this->config->sendMail);
            $this->mail->Subject = 'Задать вопрос';
            $this->mail->isHTML(true);
            $this->mail->Body =
                "
                <b>Имя: </b> {$this->data->name}<br>
                <b>E-mail: </b> {$this->data->email}<br>
                <b>Телефон: </b> {$this->data->phone}<br>
                <b>Сообщение: </b> {$this->data->messages}<br>
            ";
            $this->mail->send();
            if($this->mail->send())
            {
                return json_encode(['status'=> $this->mail->send(),'messages' => 'Вы успешно отправили форму' , 'class' =>'alert-success' ]);
            }else
            {
                return json_encode(['status'=> $this->mail->send(), 'messages' => 'Произошла ошибка при отправки данных!' , 'class' =>'alert-danger' ]);
            }
        }else
        {
            return json_encode(['status'=> false, 'messages' => 'Произошла ошибка при отправки данных!' , 'class' =>'alert-danger' ]);
        }
    }
    function callBack()
    {
        if(!empty($this->data->name) and !empty($this->data->email))
        {
            $this->mail->setFrom('no-reply@cokbeauty.ru', "ЦОК");
            $this->mail->addAddress($this->config->sendMail, $this->config->sendMail);
            $this->mail->Subject = 'Обратный звонок';
            $this->mail->isHTML(true);
            $this->mail->Body =
                "
                <b>Имя: </b> {$this->data->name}<br>
                <b>E-mail: </b> {$this->data->email}<br>
                <b>Телефон: </b> {$this->data->phone}<br>
            ";
            $this->mail->send();
            if($this->mail->send())
            {
                return json_encode(['status'=> $this->mail->send() ,'messages' => 'Вы успешно отправили форму, мы свяжемся с вами в ближайшее время.', 'class' =>'alert-success' ]);
            }else
            {
                return json_encode(['status'=> $this->mail->send() , 'messages' => 'Произошла ошибка при отправки данных!', 'class' =>'alert-danger' ]);
            }

        }else
        {
            return json_encode(['status'=> false , 'messages' => 'Произошла ошибка при отправки данных!', 'class' =>'alert-danger' ]);
        }
    }
    function __call($name, $arguments)
    {
       return false;
    }
    function viewData()
    {
        print_r($this->data);
    }
}
if(!empty($_GET['method'] && !empty($_POST)))
{
    $mail = new Mail($_POST);
    $method = $_GET['method'];
    echo $mail->$method();
}

