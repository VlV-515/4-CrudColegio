create DATABASE `crud`;
use `crud`;
create table Alumnos(
    `idAlumno` int(10) NOT NULL AUTO_INCREMENT,
    `nombreAlumno` text NOT NULL,
    `apellidosAlumno` text NOT NULL,
    `generoAlumno` VARCHAR(1) NOT NULL,
    `fechaNacimientoAlumno` DATE NOT NULL,
    PRIMARY KEY(`idAlumno`)
);
INSERT INTO Alumnos (
        `idAlumno`,
        `nombreAlumno`,
        `apellidosAlumno`,
        `generoAlumno`,
        `fechaNacimientoAlumno`
    )
VALUES (
        1,
        'Jorge',
        'Tirado Moreno',
        'H',
        '1993-08-20'
    );
create table Profesor(
    `idProfesor` int(10) NOT NULL AUTO_INCREMENT,
    `nombreProfesor` text NOT NULL,
    `apellidosProfesor` text NOT NULL,
    `generoProfesor` VARCHAR(1) NOT NULL,
    PRIMARY KEY (`idProfesor`)
);
INSERT INTO Profesor (
        `idProfesor`,
        `nombreProfesor`,
        `apellidosProfesor`,
        `generoProfesor`
    )
VALUES (
        1,
        'Profesor',
        'Jimenez',
        'H'
    );
create table Grado(
    `idGrado` int(10) NOT NULL AUTO_INCREMENT,
    `nombreGrado` text NOT NULL,
    `idProfesor` int(10) NOT NULL,
    PRIMARY KEY (`idGrado`)
);
INSERT INTO Grado (idGrado, nombreGrado, idProfesor)
VALUES (1, 'Primero', 1);