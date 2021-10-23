<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require './libs/Exception.php';
require './libs/PHPMailer.php';
require './libs/SMTP.php';

$name = $_POST['firstName'];
$email = $_POST['email'];
$object = $_POST['object'];

try {
	$mail = new PHPMailer();
	$mail->isSMTP();
	$mail->CharSet = "UTF-8";
	$mail->SMTPAuth = true;

	$mail->Host = 'Host';
	$mail->Username = 'Username';
	$mail->Password = 'Pass';
    $mail->SMTPOptions = array(
     'ssl' => array(
         'verify_peer' => false,
         'verify_peer_name' => false,
         'allow_self_signed' => true
     )
);
	$mail->Port = 465;
	$mail->setFrom('Username', 'Portfolio');

	$mail->isHTML(true);
	$mail->Subject = 'New Client!';
	$mail->Body = 'Client name - ' . $name . '<br>' . 'Email - ' . $email . '<br>' . 'Object - ' . $object;
	$mail->send();
} catch (Exception $e) {
    echo $mail->ErrorInfo;
}