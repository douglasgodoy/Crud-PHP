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
        $github = $_POST['githubUsername'];
        $url = "https://api.github.com/users/$github";
        $verificar = $this->verificaUsuarioExiste();

        if ($verificar['erro'] === true) {
            echo json_encode($verificar);
            exit();
        }
        $data = Controller::callAPI($url);

        $cadastrar = $this->insert(
            $this->insertCadSql(),
            $this->valCadSql($data)
        );
        $response = $this->tratarMensagemRetorno($cadastrar);
        echo \json_encode($response);
    }

    private function tratarMensagemRetorno(int $insert)
    {
        if ($insert > 0) {
            return [
                'erro' => false,
                'message' => 'Cadastrado realizado com Sucesso!',
                'github' => $_POST['githubUsername'],
                'dadosGit' => $this->getGithub()
            ];
        }
        return [
            'erro' => true,
            'message' => 'Erro ao Cadastrar, por favor tente novamente!',
            'github' => $_POST['githubUsername']
        ];
    }

    public function getGithub()
    {
        $github = $_POST['githubUsername'];
        $url = "https://api.github.com/users/$github";
        $response =  Controller::callAPI($url);

        $filter = [
            $response['nome'],
            $response['imageUrl'],
            $response['empresaAtual'],
        ];
        return $filter;
    }

    public function verificaUsuarioExiste()
    {
        $comando = $this->command('SELECT emailusuario FROM dados_usu WHERE emailusuario = :EMAIL', [
            ':EMAIL' => $_POST['email']
        ]);

        $comandoGit = $this->command('SELECT github FROM dados_usu WHERE github = :github', [
            ':github' => $_POST['githubUsername']
        ]);

        if (count($comando) || count($comandoGit)) {
            $response = [
                'erro' => true,
                'message' => 'E-mail e/ou Git já possui cadastro em nossa base!',
            ];
        } else {
            $response = [
                'erro' => false,
            ];
        }
        return $response;
    }

    public function valCadSql($data)
    {
        return [
            ':EMAIL' => $_POST['email'],
            ':PASS' => $_POST['password'],
            ':ANIVERSARIO' => $_POST['dtNasc'],
            ':SEXO' => $_POST['sexo'],
            ':GIT' => $_POST['githubUsername'],
            ':CAMINHOIMG' => $data['imageUrl'],
            ':NOMEGIT' => $data['nome'],
            ':EMPRESA' => $data['empresaAtual'],
            ':ENDERECO' => $data['localizacao'],
        ];
    }

    public function insertCadSql()
    {
        return 'INSERT INTO dados_usu (
                emailusuario,
                senhausuario,
                dtNascimento,
                sexo,
                github,
                imgGithub,
                nomeGit,
                empresaAtual,
                localidade
            ) VALUES (
                :EMAIL,
                :PASS,
                :ANIVERSARIO,
                :SEXO,
                :GIT,
                :CAMINHOIMG,
                :NOMEGIT,
                :EMPRESA,
                :ENDERECO
            );';
    }
}
