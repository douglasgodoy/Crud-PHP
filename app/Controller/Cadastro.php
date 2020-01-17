<?php

namespace Controller;

use Config\Sql;

class Cadastro extends Sql
{
    public function __construct()
    {
        parent::__construct();
    }

    public function cadastrarUsuario()
    {
        $cadastrar = $this->insert(
            'INSERT INTO dados_usu (emailusuario, senhausuario, dtNascimento, sexo, github) VALUES (
            :EMAIL,
            :PASS,
            :ANIVERSARIO,
            :SEXO,
            :GIT
        );',
            [
                ':EMAIL' => $_POST['email'],
                ':PASS' => $_POST['password'],
                ':ANIVERSARIO' => $_POST['dtNasc'],
                ':SEXO' => $_POST['sexo'],
                ':GIT' => $_POST['githubUsername']
            ]
        );

        if ($cadastrar > 0) {
            $response = [
                'erro' => false,
                'message' => 'Cadastrado realizado com Sucesso!',
                'github' => $_POST['githubUsername']
            ];
        } else {
            $response = [
                'erro' => true,
                'message' => 'Erro ao Cadastrar, por favor tente novamente!',
                'github' => $_POST['githubUsername']
            ];
        }
        echo \json_encode($response);
    }
}
