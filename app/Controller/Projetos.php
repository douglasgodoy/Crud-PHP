<?php

namespace Controller;

use Config\Sql;
use Src\Classes\Routes;

class Projetos extends Sql
{
    protected $titulo;
    protected $techs;
    protected $desc;
    protected $img = [];
    protected $id;

    public function __construct()
    {
        parent::__construct();
        session_start();
    }

    public function cadastro()
    {
        $this->setDadosForm();
        $cadastro = $this->insert(
            $this->insertProjeto(),
            $this->valuesInsert()
        );
        $response = $this->tratarMensagemRetorno($cadastro, 'cadastrado');

        echo json_encode($response);
    }

    public function main()
    {
        // (new Routes())->getView();
        $rotas = new Routes();
        $rotas->getView();
    }

    public function listar(): void
    {
        $projetos = $this->command('SELECT * FROM projetos WHERE idusuario = :ID;', [
            ':ID' => $_SESSION['id']
        ]);
        echo json_encode($projetos);
    }

    public function setDadosForm()
    {
        $this->titulo = $_POST['titulo'];
        $this->techs = $_POST['techs'];
        $this->desc = $_POST['descricao'];
        $this->img = $_POST['print'];
        $this->id = $_SESSION['id'];
    }
    public function listEdit()
    {
        $projeto = $this->command('SELECT * FROM projetos WHERE idprojeto = :ID;', [
            ':ID' => $_POST['id']
        ]);
        echo json_encode($projeto);
    }
    public function edit(): void
    {
        $projeto = $this->insert(
            'UPDATE projetos SET
            titulo = :TITULO,
            techs = :TECHS,
            descricao = :DESCRICAO,
            urlImgs = :IMG
            WHERE idprojeto = :ID',
            [
                ':TITULO' => $_POST['titulo'],
                ':TECHS' => $_POST['techs'],
                ':DESCRICAO' => $_POST['descricao'],
                ':IMG' => $_POST['img'],
                ':ID' => $_POST['idProjeto'],
            ]
        );
        $response = $this->tratarMensagemRetorno($projeto, 'alterado');
        echo json_encode($response);
    }
    private function insertProjeto()
    {
        return 'INSERT INTO projetos (
                    idusuario,
                    titulo,
                    techs,
                    descricao,
                    urlImgs
                ) VALUES (
                    :ID,
                    :TITULO,
                    :TECHS,
                    :DESCRICAO,
                    :URLIMG
                );';
    }

    private function valuesInsert()
    {
        return [
            ':ID' => $this->getId(),
            ':TITULO' => $this->getTitulo(),
            ':TECHS' => $this->getTechs(),
            ':DESCRICAO' => $this->getDesc(),
            ':URLIMG' => $this->getImg()
        ];
    }

    private function tratarMensagemRetorno(int $insert, string $tipo)
    {
        if ($insert > 0) {
            return [
                'erro' => false,
                'message' => 'Projeto ' . $this->getTitulo() . " $tipo com Sucesso!",
            ];
        }
        return [
            'erro' => true,
            'message' => 'Erro ao Cadastrar, por favor tente novamente!',
        ];
    }

    public function getTitulo()
    {
        return $this->titulo;
    }
    public function getTechs()
    {
        return $this->techs;
    }
    public function getDesc()
    {
        return $this->desc;
    }
    public function getImg()
    {
        return $this->img;
    }
    public function getId()
    {
        return $this->id;
    }
}
