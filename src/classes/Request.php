<?php

// namespace Src\Classes;

// use Src\Classes\Routes;

// class Request extends Routes
// {
//     private $controlador = "login";
//     private $metodo = "logina";
//     private $args = [];
//     private $pasta = '';

//     public function __construct()
//     {
//         $cont = new Routes();
//         $cont = $this->parserUrl();
//         count($cont) ? $this->controlador = $cont[0] : null;
//         $this->definirRota();
//     }

//     private function definirRota(): void
//     {
//         $m = $this->getMetodo();
//         $a = $this->getArgs();
//     }
//     public function getControlador()
//     {
//         return $this->controlador;
//     }

//     public function getMetodo()
//     {
//         return $this->metodo;
//     }

//     public function getArgs()
//     {
//         return $this->args;
//     }

//     public function getPasta()
//     {
//         return $this->pasta;
//     }
// }
