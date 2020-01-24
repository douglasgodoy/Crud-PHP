<?php

namespace Controller;

session_start();

use Src\Classes\Routes;
use Config\Sql;

class Home extends Sql
{
    protected $idUsuario;
    protected $img;
    protected $nome;
    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        $rota = new Routes();
        $rota->getView();
        $this->setDadosUsuario(
            $_SESSION['id'],
            $_SESSION['urlImg'],
            $_SESSION['nomeGit']
        );
    }
    public function dadosUsu()
    {
    }
    public function getId()
    {
        return $this->idUsuario;
    }
    public function setDadosUsuario($id, $img, $nome)
    {
        $this->idUsuario = $id;
        $this->img = $img;
        $this->nome = $nome;
    }
    public function deletarProjeto()
    {
        $idProjeto = filter_input(INPUT_POST, 'idProjeto', FILTER_SANITIZE_STRING);
        $comando = $this->insert('DELETE FROM projetos WHERE idprojeto = :ID;', [
            ':ID' => $idProjeto
        ]);
        $resposta = $this->tratarMensagemRetorno($comando);
        echo json_encode($resposta);
    }
    private function tratarMensagemRetorno(int $insert)
    {
        if ($insert > 0) {
            return [
                'erro' => false,
                'message' => "Projeto excluído com Sucesso!",
            ];
        }
        return [
            'erro' => true,
            'message' => 'Erro ao excluir, por favor tente novamente!',
        ];
    }
}
