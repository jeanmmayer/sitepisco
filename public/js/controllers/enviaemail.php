<?php
    $to      = 'jean.mayer@pisco.net.br';
    $subject = 'the subject';
    $message = 'hello';
    $headers = 'From: jean.mayer@pisco.net.br' . "\r\n" .
        'Reply-To: jean.mayer@pisco.net.br' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);
