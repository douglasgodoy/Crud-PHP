<?php


require_once("../vendor/autoload.php");
require_once('../config/config.php');

use Src\classes\Routes;

$rota = new Routes();
$rota->req();
