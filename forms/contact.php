<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../assets/vendor/phpmailer/PHPMailer.php';
require '../assets/vendor/phpmailer/SMTP.php';
require '../assets/vendor/phpmailer/Exception.php';

$receiving_email_address = 'hoichogiaoduc.edu.vn@gmail.com';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['subject']) || empty($_POST['message'])) {
        die('All fields are required.');
    }

    $mail = new PHPMailer(true);

    try {
        // Cấu hình SMTP
		$mail->CharSet = 'UTF-8';

        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'hoichogiaoduc.edu.vn@gmail.com'; // Email của bạn
         $mail->Password   = 'ppxq ebos tnzl plaj';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Thông tin email
        $mail->setFrom('hoichogiaoduc.edu.vn@gmail.com', $_POST['name']);
        $mail->addAddress($receiving_email_address);
        $mail->Subject = $_POST['subject'];

        // Nội dung email
        $mail->Body = "From: {$_POST['name']}\n"
            . "Email: {$_POST['email']}\n"
            . "Phone: {$_POST['phone']}\n"
            . "Message: {$_POST['message']}";

        // Gửi email
        if ($mail->send()) {
            echo 'Email sent successfully!';
        } else {
            echo 'Failed to send email.';
        }
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }
} else {
    die('Invalid request.');
}
?>
