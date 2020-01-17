<?php

namespace Src\classes\Usuario;

use Config\Conn\Sql;

class Usuario extends Sql
{
    protected $login;
    protected $senha;

    public function __construct($login = "", $senha = "")
    {
        $this->setLogin($login);
        $this->setSenha($senha);
    }

    public function setLogin($value)
    {
        return $this->login = $value;
    }
    public function setSenha($value)
    {
        return $this->senha = $value;
    }

    public function getLogin()
    {
        return $this->login;
    }

    public function getSenha()
    {
        return $this->senha;
    }
}
