<?php
// Nhúng PHPMailer
require __DIR__ . '/../assets/vendor/php-email-form/src/PHPMailer.php';
require __DIR__ . '/../assets/vendor/php-email-form/src/SMTP.php';
require __DIR__ . '/../assets/vendor/php-email-form/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Nhận dữ liệu từ form
$name     = $_POST['name'] ?? '';
$date     = $_POST['date'] ?? '';
$identity = $_POST['identity'] ?? '';
$email    = $_POST['email'] ?? '';
$phone    = $_POST['phone'] ?? '';
$time     = $_POST['time'] ?? '';
$message  = $_POST['message'] ?? '';

// Tạo đối tượng mailer
$mail = new PHPMailer(true);

try {
    // Cấu hình SMTP của Mắt Bão
    $mail->isSMTP();
    $mail->Host       = 'smtp.emailserver.vn'; // Host của Mắt Bão
    $mail->SMTPAuth   = true;
    $mail->Username   = 'noreply@hoichogiaoduc.edu.vn'; // Email bạn tạo
    $mail->Password   = 'hoichogiaoduc'; // Mật khẩu email
    $mail->SMTPSecure = 'tls'; // TLS hoặc 'ssl' nếu bạn dùng port 465
    $mail->Port       = 587; // Hoặc 465 nếu dùng SSL

    // Gửi từ và gửi đến
    $mail->setFrom('noreply@hoichogiaoduc.edu.vn', 'Hội Chợ Giáo Dục');
    $mail->addAddress('hoichogiaoduc.edu.vn@gmail.com', 'Admin'); // Người nhận

    // Nội dung email
    $mail->isHTML(true);
    $mail->Subject = 'Đăng ký tham dự Hội Chợ Giáo Dục';
    $mail->Body    = "
        <h3>Thông tin đăng ký mới:</h3>
        <ul>
            <li><strong>Họ và tên:</strong> $name</li>
            <li><strong>Ngày sinh:</strong> $date</li>
            <li><strong>CCCD:</strong> $identity</li>
            <li><strong>Email:</strong> $email</li>
            <li><strong>Điện thoại:</strong> $phone</li>
            <li><strong>Khung giờ:</strong> $time</li>
            <li><strong>Lời nhắn:</strong> $message</li>
        </ul>
    ";

    // Gửi email
    $mail->send();
    echo 'OK'; // Form sẽ nhận được phản hồi này nếu thành công
} catch (Exception $e) {
    echo 'Lỗi gửi mail: ' . $mail->ErrorInfo;
}
