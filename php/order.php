<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$resp['Success'] = true;
$resp['name'] = true;
$resp['phone'] = true;
if (strlen($name) > 0 && strlen($phone) == 18) {
    mail('fedorov-max89@mail.ru', 'Заказ бургера', 'Сообщение от пользователя: '.$name);
} else {
    if (strlen($name) == 0){
        $resp['name'] = false;
    }
    if (strlen($phone) != 18){
        $resp['phone'] = false;
    }
    $resp['Success'] = false;
}

echo json_encode($resp);
?>