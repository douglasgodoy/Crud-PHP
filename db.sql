CREATE DATABASE usuarios_crud;
use usuarios_crud;
CREATE TABLE `dados_usu` (
	`idusuario` INT(11) NOT NULL AUTO_INCREMENT,
    `emailusuario` VARCHAR(64) NOT NULL,
    `senhausuario` VARCHAR(256) NOT NULL,
    `dtregistro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `dtNascimento` TIMESTAMP NOT NULL,
    `sexo` VARCHAR(1),
    `github` VARCHAR(150),
    PRIMARY KEY (`idusuario`)
);
UPDATE dados_usu SET dtNascimento = '1998-10-02' WHERE idusuario = 1;


DELETE FROM dados_usu WHERE github ='douglasgodoy1998';


SELECT * FROM dados_usu;
SELECT * FROM dados_usu WHERE idusuario = 1;


INSERT INTO dados_usu (emailusuario, senhausuario, dtNascimento, sexo, github) VALUES ('emailbanco','123456','02-10-1998','M','aaaa');