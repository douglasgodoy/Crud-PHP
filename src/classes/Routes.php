<?php

namespace Src\Classes;

use Src\Classes\Request;
// use App\Controller\Controller
class Routes
{
    private $controlador;
    private $metodo;
    private $args;
    public function __construct()
    {
        $this->url = explode('/', rtrim($_GET['url']), FILTER_SANITIZE_URL);
        $this->controlador = isset($this->url[0]) && $this->url[0] ? $this->url[0] : 'login';
        $this->metodo = isset($this->url[1]) && $this->url[1] ? $this->url[1] : 'login';
        $this->args = isset($this->url[2]) && $this->url[2] ? $this->url[2] : [];
    }

    public function getView()
    {
        $nameRoute = $this->controlador;
        $this->rota = [
            "" => "login",
            "login" => "login",
            "home" => "index",
            "index" => "index"
        ];
        array_key_exists($nameRoute, $this->rota) &&
            file_exists('../app/View/' . $this->rota[$nameRoute] . '.phtml') ?
            $view = "../app/View/{$this->rota[$nameRoute]}.phtml" :
            $view = "../app/View/error.phtml";

        $quebra = explode('/', $view);
        $getPage = explode('.', $quebra[3]);
        $_SERVER['pagina'] = $getPage[0];

        $this->startView($view);
    }

    public function startView(string $tela): void
    {
        require_once('../app/View/cabecalho.phtml');
        require_once $tela;
        require_once('../app/View/rodape.phtml');
    }

    public function req() // Função para fazer requisições, tanto ajax quanto POST
    {
        $this->controller = 'Controller\\' . \ucfirst($this->controlador);
        if (!class_exists($this->controller)) {
            $this->getView();
            exit();
        }
        if (method_exists($this->controller, $this->metodo)) {
            $response = call_user_func_array([new $this->controller(), $this->metodo], [$this->args]);
            print $response;
        };
    }
}
