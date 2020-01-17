<?php

namespace Config;

class Sql
{
    protected $conn;

    public function __construct()
    {
        $this->conn = new \PDO("mysql:host=localhost:3308;dbname=usuarios_crud", "root", "");
        $this->conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $this->conn->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
    }

    private function setParams($statment, $parameters = [])
    {
        foreach ($parameters as $key => $value) {
            $this->setParam($statment, $key, $value);
        }
    }

    private function setParam($statment, $key, $value)
    {
        $statment->bindParam($key, $value);
    }

    public function query($rawQuery, $params = [])
    {
        $stmt = $this->conn->prepare($rawQuery);
        $this->setParams($stmt, $params);
        $stmt->execute();
        return $stmt;
    }

    public function command($rawQuery, $params = []): array
    {
        $stmt = $this->query($rawQuery, $params);
        return $stmt->fetchAll();
    }

    public function insert($rawQuery, $params = [])
    {
        $stmt = $this->query($rawQuery, $params);
        return $stmt->rowCount();
    }
}
