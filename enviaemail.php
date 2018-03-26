<?php
	use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    $nomeDestinatario = $_POST["nomeDestinatario"];
    $emailDestinatario = $_POST["emailDestinatario"];
    $assunto = $_POST["assunto"];
    $mensagem = $_POST["mensagem"];
    $email = $_POST["email"];

    $mail = new PHPMailer();

    $mail->SMTPOptions = array(
        'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
        )
    );

    $mail->IsSMTP();
    $mail->Charset = "UTF-8";
    $mail->ContentType = "Content-Type: text/html";
    $mail->Encoding = "base64";
    $mail->SMTPAuth = true;

    $mail->SMTPSecure = "ssl";

    $mail->Host = "smtp.pisco.net.br";
    $mail->Port = 465;
    $mail->Username = $email;
    $mail->Password = "3edsw21qa";
    $mail->SetFrom($email, "PISCO SOFTWARE");

    $mail->AddAddress($emailDestinatario, $nomeDestinatario);
    $mail->IsHTML(true);

    $mail->Subject = $assunto;
    $mail->MsgHTML($mensagem);

    if($mail->Send()) {
        return 1;
    } else {
        return 0;
    }
