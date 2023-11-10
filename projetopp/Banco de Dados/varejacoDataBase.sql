DROP SCHEMA IF EXISTS Varejaco;
CREATE SCHEMA IF NOT EXISTS Varejaco DEFAULT CHARACTER SET utf8 ;
USE Varejaco; 

CREATE TABLE IF NOT EXISTS Usuario (
  `idUsuario` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(200) NOT NULL,
  `nome` VARCHAR(200) NOT NULL,
  `senha` VARCHAR(20) NOT NULL,
  `telefone` VARCHAR(15) NOT NULL,
  `foto` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
  ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Categoria (
  `idCategoria` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Supermercado (
  `idSupermercado` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(250) NOT NULL,
  `descricao` TEXT NOT NULL,
  PRIMARY KEY (`idSupermercado`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Promocao (
  `idPromocao` INT(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` INT(11) NOT NULL,
  `idCategoria` INT(11) NOT NULL,
  `idSupermercado` INT(11) NOT NULL,
  `nome` VARCHAR(200) NOT NULL,
  `valor` DECIMAL(19,2) NOT NULL,
  `dataInicio` DATE,
  `dataTermino` DATE,
  `relevancia` DECIMAL(19,2) NOT NULL,
  `status` VARCHAR(13) NOT NULL,
  `descricao` TEXT NOT NULL,
  `foto` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idPromocao`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8; 

CREATE TABLE IF NOT EXISTS Favorito (
  `idFavorito` INT(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` INT(11) NOT NULL,
  `idPromocao` INT(11) NOT NULL,
  PRIMARY KEY (`idFavorito`, `idUsuario`, `idPromocao`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Avaliacao (
  `idAvaliacao` INT(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` INT(11) NOT NULL,
  `idPromocao` INT(11) NOT NULL,
  `nota` INT(11) NOT NULL,
  PRIMARY KEY (`idAvaliacao`, `idUsuario`, `idPromocao`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO Usuario (email, nome, senha, telefone, foto) VALUES ("anaelisakb@gmail.com", "Ana Elisa Ferreira Fernandes", "Analinda", "(31) 99512-2057", "Ainda sem foto");
INSERT INTO Usuario (email, nome, senha, telefone, foto) VALUES ("jv11102014@gmail.com", "João Vitor Marques Costa", "thujvana123", "(31) 98624-5247", "Ainda sem foto");
INSERT INTO Usuario (email, nome, senha, telefone, foto) VALUES ("thuliomarco3@gmail.com", "Thúlio Marco de Oliveira Fernandes", "thulio261172", "(31) 97112-0107", "Ainda sem foto");

INSERT INTO Categoria (nome) VALUES ('Hortifruti');
INSERT INTO Categoria (nome) VALUES ('Mercearia');
INSERT INTO Categoria (nome) VALUES ('Eletrônicos');
INSERT INTO Categoria (nome) VALUES ('Cosméticos');
INSERT INTO Categoria (nome) VALUES ('Açougue');
INSERT INTO Categoria (nome) VALUES ('Papelaria');
INSERT INTO Categoria (nome) VALUES ('Padaria');
INSERT INTO Categoria (nome) VALUES ('Casa e Cozinha');
INSERT INTO Categoria (nome) VALUES ('Pet');
INSERT INTO Categoria (nome) VALUES ('Congelados');
INSERT INTO Categoria (nome) VALUES ('Produtos de Bebê');
INSERT INTO Categoria (nome) VALUES ('Limpeza');
INSERT INTO Categoria (nome) VALUES ('Fitness');

INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Teixeirão', 'R. Rosa, 341 - Primavera, Timóteo - MG');
INSERT INTO Supermercado (nome, descricao) VALUES ('Central Supermercados', 'Av. Ana Moura, 4457 - Ana Moura, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Arthuso', 'Av. Ana Moura, 4110 - Ana Moura, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Brasil Supermercados - Timirim', 'Av. José Viana da Silva, 110 - Timirim, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Só Laranja Supermercado', 'Av. Monsenhor Rafael, 4 - Timirim, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Brasil Supermercados - Bromélias', 'Av. Jovino Augusto da Silva, 210 - Bromélias, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Avenida', 'Av. Ana Moura, 1159 - Alvorada, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Brasil Supermercados - Timirim', 'Av. José Viana da Silva, 110, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Bretas Supermercado - Acesita', 'Alameda Trinta e Um de Outubro, 135, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Souza', 'Av. Ana Moura, 1205 - Alvorada, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Olaria', 'Av. Acesita, 200 - Olaria, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Santa Maria', 'R. Cento e Trinta e Um, 672 - Santa Maria, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Coelho Diniz - Timóteo', 'R. Vinte de Novembro, 285 - Centro, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Consul Quitandinha', 'R. Antônio Silva, 18 - Quitandinha, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Dultra Supermercado', 'Av. Alexandre Torquetti, 362 - Santa Terezinha, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Duvale - Cachoeira do Vale', 'BR-381, 2470 - Núcleo Industrial, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado M Dias', 'R. Satélite, 774 - Novo Tempo, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Mercearia Vale Verde', 'Av. Amazonas, 741 - Alvorada, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Bretas - São José', 'Av. Castelo Branco, 07 - São José, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('BIGPLUS SUPERMERCADO', 'R. Alemanha - Ana Rita, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Sacolão Central', 'R. Sete de Setembro, 119 - Centro Sul, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Lana', 'Av. Acesita, 3872 - Centro Sul, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Brasil Supermercados - Limoeiro', 'Avenida Pinheiros, 701 - Limoeiro, Timóteo');
INSERT INTO Supermercado (nome, descricao) VALUES ('Mineirão Atacarejo', 'R. Dr. Querubino, 342 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Coelho Diniz - Fabriciano', 'R. Maria Matos, 100 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Duvale Supermercados - Fabriciano', 'Av. Gov. José de Magalhães Pinto, 1384 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Villefort Atacado e Varejo - Fabriciano', 'R. São Sebastião, 1.080 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Brasil Supermercados - Fabriciano', 'Av. Geraldo Inácio, 954 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Bretas Atacarejo - Fabriciano', 'Av. Gov. José de Magalhães Pinto, 1897 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado do Bezinho', 'Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Valadares - Smart', 'R. Dezesseis, 110 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado JR', 'R. Guarani, 149 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Santa Maria', 'Av. Corcovado, 278 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Extra Mercado', 'Av. Roldão Alves Tôrres, 208 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Farias Supermercados', 'R. Brasil, 26 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado do Mancheta', 'Av. Dom Oscár, 42 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Pimentel', 'R. Cinco, 293 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado e Sacolão Total', 'R. Pedro Soares, 331 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Recanto Verde', 'Av. Germânio, 203 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Mercado Big Show', 'R. Juscelino Kubitscheck, 445 - Loja B - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Peixoto', 'R. Marte, 423 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Varejão Popular', 'R. Rubéns Siqueira Maia, 2377 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Alves', 'R. Alípio José da Silva, 351 - Coronel Fabriciano');
INSERT INTO Supermercado (nome, descricao) VALUES ('Mineirão Atacarejo', 'Av. Castelo Branco, 911 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Duvale Supermercados - Cidade Nobre', 'Av. Monteiro Lobato, 463 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Bretas Atacarejo - Hiper Ipatinga', 'Rua, Avendia Mª Jorge São de Sales, 155 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Garcia - Canaã', 'Av. Selim José de Sales, 1569 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Brasil Supermercados - Cidade Nobre', 'Av. Felipe dos Santos, 1113 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Brasil Supermercados - Panorama', 'R. Serra Dourada, 85 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Bretas Atacarejo - Canaã', 'Av. Selim José de Sales, 1985 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Machado Supermercado', 'Av. Minas Gerais, 267 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Mateus', 'Av. das Flores, 578 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Batista Supermercado', 'Av. Luísa M Nascimbene, 781 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Moreira', 'R. Filisteu, 247 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Ferreira Barbosa Supermercado', 'Av. Selim José de Sales, 2352 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Faioli Supermercado', 'Rua Turquesa, 300 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Alegrense', 'Av. Luísa M Nascimbene, 475 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Compre Mais', 'Av. Luísa M Nascimbene, 727 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Correa', 'Av. Fernando de Noronha, 740 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Supermercado Vale do Aço', 'R. Blumenau, 300 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Coelho Diniz - Novo Cruzeiro', 'R. Cláudio de Macedo Moura, 677 - Ipatinga');
INSERT INTO Supermercado (nome, descricao) VALUES ('Freitas Supermercado', 'R. Goiânia, 640 - Ipatinga');