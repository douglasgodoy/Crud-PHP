<?php

namespace Controller;

use Config\Sql;
use Src\Classes\Routes;

class Login extends Sql
{
    public function __construct()
    {
        session_start();
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
            "SELECT * FROM dados_usu WHERE github = :EMAIL AND senhausuario = :PASSWORD",
            [
                ':EMAIL' => $_POST['github'],
                ':PASSWORD' => $_POST['pass']
            ]
        );
        if (count($valida)) {
            $this->setDadosSessao(
                $valida[0]['idusuario'],
                $valida[0]['imgGithub'],
                $valida[0]['nomeGit']
            );
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

    public function setDadosSessao($id, $img, $nome)
    {
        $_SESSION['id'] = $id;
        $_SESSION['urlImg'] = $img;
        $_SESSION['nomeGit'] = $nome;
    }

    public function logoff()
    {
        session_destroy();
    }
}
