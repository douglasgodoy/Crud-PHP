<?php

namespace Controller;

// use Src\classes\Routes;

class Controller //extends Routes
{
    public function __construct()
    {
        // echo 'a';
    }

    public static function callAPI($url)
    {
        $ch = curl_init($url);
        \curl_setopt_array($ch, [
            CURLOPT_HTTPHEADER => [
                "Accept: application/vnd.github.v3+json",
                "Content-Type: text/plain",
                "User-Agent: Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36
                (KHTML, like Gecko) Chrome/47.0.2526.111 YaBrowser/16.3.0.7146 Yowser/2.5 Safari/537.36"
            ],
        ]);
        \curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        \curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response = curl_exec($ch);
        curl_close($ch);

        $array = \json_decode($response, true);

        $filter = [
            'imageUrl' => $array['avatar_url'],
            'nome' => $array['name'],
            'bio' => $array['bio'],
            'empresaAtual' => $array['company'],
            'localizacao' => $array['location']
        ];
        return $filter;
    }
}
