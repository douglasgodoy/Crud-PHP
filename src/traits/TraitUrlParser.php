<?php

namespace Src\Traits;

trait TraitUrlParser
{
    //DIVIDE A URL EM ARRAY
    public function parserUrl()
    {
        return explode('/', rtrim($_GET['url']), FILTER_SANITIZE_URL);
    }
}
