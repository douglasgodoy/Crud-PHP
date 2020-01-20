<?php

namespace Controller;

use Config\Sql;
use Src\Classes\Routes;

class Login extends Sql
{
    public function __construct()
    {
        parent::__construct();
    }
    public function login()
    {
        $rota = new Routes();
        $rota->getView();
    }

    public function validateLogin()
    {
        $valida = $this->command(
            "SELECT * FROM dados_usu WHERE emailusuario = :EMAIL AND senhausuario = :PASSWORD",
            [
                ':EMAIL' => $_POST['email'],
                ':PASSWORD' => $_POST['pass']
            ]
        );

        if (count($valida)) {
            $response = [
                'erro' => false,
                'message' => 'Parabéns!',
            ];
        } else {
            $response = [
                'erro' => true,
                'message' => 'Login Inválido!',
            ];
        };
        echo json_encode($response);
    }
}
