<?php

namespace Controller;

session_start();

use Src\Classes\Routes;
// use Config\Sql;

class Home //extends Sql
{
    protected $idUsuario;
    protected $img;
    protected $nome;
    public function __construct()
    {
        // parent::__construct();
        $rota = new Routes();
        $rota->getView();
        $this->index();
    }
    public function index()
    {

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
}
