<?php
//Añadimos los header
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application/json; charset=UTF-8");
//importa coneccion
require('connection.php');
//!SECCION: ALUMNOS
//*CASO: Todos los alumnos
if (isset($_GET['alumnos'])) {
    //Creamos la cosulta
    $sql = mysqli_query($connection, 'SELECT * FROM Alumnos');
    //Verificamos que contenga registros
    if (mysqli_num_rows($sql) > 0) {
        $data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        echo json_encode($data);
        exit();
    }
    echo json_encode(['msg' => 'error', 'reason' => 'No se pudieron obtener los alumnos']);
    exit();
}
//*CASO: Un solo alumno
if (isset($_GET['alumno'])) {
    //Obtenemos el id a consultar
    $id = $_GET['alumno'];
    //Creamos la cosulta
    $sql = mysqli_query($connection, "SELECT * FROM Alumnos WHERE idAlumno=$id");
    //Verificamos que contenga registros
    if (mysqli_num_rows($sql) > 0) {
        $data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        echo json_encode($data);
        exit();
    }
    echo json_encode(['msg' => 'error', 'reason' => 'Error obteniendo el alumno']);
    exit();
}
//*CASO: Agregar alumno
if (isset($_GET['alumnoNuevo'])) {
    //Debemos obtener la data
    $data = json_decode(file_get_contents("php://input"));
    $nombreAlumno = $data->nombreAlumno;
    $apellidosAlumno = $data->apellidosAlumno;
    $generoAlumno = $data->generoAlumno;
    $fechaAlumno = $data->fechaNacimientoAlumno;
    //Verificamos que no vengan vacios
    if ($nombreAlumno != "" && $apellidosAlumno != "" && $generoAlumno != "" && $fechaAlumno != "") {
        //Creamos la consulta
        $sql = mysqli_query(
            $connection,
            "INSERT INTO Alumnos (nombreAlumno,apellidosAlumno,generoAlumno,fechaNacimientoAlumno)
        VALUES ('$nombreAlumno','$apellidosAlumno', '$generoAlumno', '$fechaAlumno')"
        );
        //Verificamos que sea true
        if ($sql) {
            echo json_encode(["msg" => "ok"]);
            exit();
        }
    }
    echo json_encode(['msg' => 'error', 'reason' => 'Error agregado el alumno']);
    exit();
}
//*CASO: Editar alumno
if (isset($_GET['alumnoEditar'])) {
    //Debemos obtener la data
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->idAlumno;
    $nombreAlumno = $data->nombreAlumno;
    $apellidosAlumno = $data->apellidosAlumno;
    $generoAlumno = $data->generoAlumno;
    $fechaAlumno = $data->fechaNacimientoAlumno;
    //Verificamos que no vengan vacios
    if ($id != "" && $nombreAlumno != "" && $apellidosAlumno != "" && $generoAlumno != "" && $fechaAlumno != "") {
        //Creamos la consulta
        $sql = mysqli_query(
            $connection,
            "UPDATE Alumnos SET nombreAlumno='$nombreAlumno', apellidosAlumno='$apellidosAlumno', generoAlumno='$generoAlumno', fechaNacimientoAlumno='$fechaAlumno' WHERE idAlumno=$id"
        );
        //Verificamos que sea true
        if ($sql) {
            echo json_encode(["msg" => "ok"]);
            exit();
        }
    }
    echo json_encode(['msg' => 'error', 'reason' => 'Error editando el alumno']);
    exit();
}
//*CASO: Eliminar alumno
if (isset($_GET['alumnoBorrar'])) {
    //Obtenemos el id
    $id = $_GET['alumnoBorrar'];
    //Verificamos que no venga vacio
    if ($id != "") {
        //creamos la consulta
        $sql = mysqli_query($connection, "DELETE FROM Alumnos WHERE idAlumno=$id");
        //Verificamos que sea true
        if ($sql) {
            echo json_encode(["msg" => "ok"]);
            exit();
        }
    }
    echo json_encode(['msg' => 'error', 'reason' => 'Error eliminando el alumno']);
    exit();
}




//!SECCION: PROFESORES
//*CASO: Todos los Profesores
if (isset($_GET['profesores'])) {
    //Creamos la cosulta
    $sql = mysqli_query($connection, 'SELECT * FROM Profesor');
    //Verificamos que contenga registros
    if (mysqli_num_rows($sql) > 0) {
        $data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        echo json_encode($data);
        exit();
    }
    echo json_encode(['msg' => 'error', 'reason' => 'No se pudieron obtener los profesores']);
    exit();
}
//*CASO: Un solo profesor
if (isset($_GET['profesor'])) {
    //Obtenemos el id a consultar
    $id = $_GET['profesor'];
    //Creamos la cosulta
    $sql = mysqli_query($connection, "SELECT * FROM Profesor WHERE idProfesor=$id");
    //Verificamos que contenga registros
    if (mysqli_num_rows($sql) > 0) {
        $data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        echo json_encode($data);
        exit();
    }
    echo json_encode(['msg' => 'error', 'reason' => 'Error obteniendo el profesor.']);
    exit();
}
//*CASO: Agregar profesor
if (isset($_GET['profesorNuevo'])) {
    //Debemos obtener la data
    $data = json_decode(file_get_contents("php://input"));
    $nombreProfesor = $data->nombreProfesor;
    $apellidosProfesor = $data->apellidosProfesor;
    $generoProfesor = $data->generoProfesor;
    //Verificamos que no vengan vacios
    if ($nombreProfesor != "" && $apellidosProfesor != "" && $generoProfesor != "") {
        //Creamos la consulta
        $sql = mysqli_query(
            $connection,
            "INSERT INTO Profesor (nombreProfesor,apellidosProfesor,generoProfesor)VALUES ('$nombreProfesor','$apellidosProfesor','$generoProfesor')"
        );
        //Verificamos que sea true
        if ($sql) {
            echo json_encode(["msg" => "ok"]);
            exit();
        }
    }
    echo json_encode(['msg' => 'error', 'reason' => 'Error agregado el profesor']);
    exit();
}
//*CASO: Editar profesor
if (isset($_GET['profesorEditar'])) {
    //Debemos obtener la data
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->idProfesor;
    $nombreProfesor = $data->nombreProfesor;
    $apellidosProfesor = $data->apellidosProfesor;
    $generoProfesor = $data->generoProfesor;

    //Verificamos que no vengan vacios
    if ($id != "" && $nombreProfesor != "" && $apellidosProfesor != "" && $generoProfesor != "") {
        //Creamos la consulta
        $sql = mysqli_query(
            $connection,
            "UPDATE Profesor SET nombreProfesor='$nombreProfesor', apellidosProfesor='$apellidosProfesor', generoProfesor='$generoProfesor' WHERE idProfesor=$id"
        );
        //Verificamos que sea true
        if ($sql) {
            echo json_encode(["msg" => "ok"]);
            exit();
        }
    }
    echo json_encode(['msg' => 'error', 'reason' => 'Error editando el profesor']);
    exit();
}
//*CASO: Eliminar profesor
if (isset($_GET['profesorBorrar'])) {
    //Obtenemos el id
    $id = $_GET['profesorBorrar'];
    //Verificamos que no venga vacio
    if ($id != "") {
        //creamos la consulta
        $sql = mysqli_query($connection, "DELETE FROM Profesor WHERE idProfesor=$id");
        //Verificamos que sea true
        if ($sql) {
            echo json_encode(["msg" => "ok"]);
            exit();
        }
    }
    echo json_encode(['msg' => 'error', 'reason' => 'Error eliminando el profesor']);
    exit();
}

//!SECCION: GRADOS
//*CASO: Todos los Grados
if (isset($_GET['grados'])) {
    //Creamos la cosulta
    $sql = mysqli_query($connection, 'SELECT * FROM Grado');
    //Verificamos que contenga registros
    if (mysqli_num_rows($sql) > 0) {
        $data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        echo json_encode($data);
        exit();
    }
    echo json_encode(['msg' => 'error', 'reason' => 'No se pudieron obtener los grados']);
    exit();
}
//*CASO: Un solo grado
if (isset($_GET['grado'])) {
    //Obtenemos el id a consultar
    $id = $_GET['grado'];
    //Creamos la cosulta
    $sql = mysqli_query($connection, "SELECT * FROM Grado WHERE idGrado=$id");
    //Verificamos que contenga registros
    if (mysqli_num_rows($sql) > 0) {
        $data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        echo json_encode($data);
        exit();
    }
    echo json_encode(['msg' => 'error', 'reason' => 'Error obteniendo el grado.']);
    exit();
}
//*CASO: Agregar grado
if (isset($_GET['gradoNuevo'])) {
    //Debemos obtener la data
    $data = json_decode(file_get_contents("php://input"));
    $nombreGrado = $data->nombreGrado;
    $idProfesor = $data->idProfesor;
    //Verificamos que no vengan vacios
    if ($nombreGrado != "" && $idProfesor != "") {
        //Creamos la consulta
        $sql = mysqli_query(
            $connection,
            "INSERT INTO Grado (nombreGrado,idProfesor)VALUES ('$nombreGrado','$idProfesor')"
        );
        //Verificamos que sea true
        if ($sql) {
            echo json_encode(["msg" => "ok"]);
            exit();
        }
    }
    echo json_encode(['msg' => 'error', 'reason' => 'Error agregado el grado']);
    exit();
}
//*CASO: Editar grado
if (isset($_GET['gradoEditar'])) {
    //Debemos obtener la data
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->idGrado;
    $nombreGrado = $data->nombreGrado;
    $idProfesor = $data->idProfesor;
    //Verificamos que no vengan vacios
    if ($nombreGrado != "" && $idProfesor != "") {
        //Creamos la consulta
        $sql = mysqli_query(
            $connection,
            "UPDATE Grado SET nombreGrado='$nombreGrado', idProfesor=$idProfesor WHERE idGrado=$id"
        );
        //Verificamos que sea true
        if ($sql) {
            echo json_encode(["msg" => "ok"]);
            exit();
        }
    }
    echo json_encode(['msg' => 'error', 'reason' => 'Error editando el grado']);
    exit();
}
//*CASO: Eliminar grado
if (isset($_GET['gradoBorrar'])) {
    //Obtenemos el id
    $id = $_GET['gradoBorrar'];
    //Verificamos que no venga vacio
    if ($id != "") {
        //creamos la consulta
        $sql = mysqli_query($connection, "DELETE FROM Grado WHERE idGrado=$id");
        //Verificamos que sea true
        if ($sql) {
            echo json_encode(["msg" => "ok"]);
            exit();
        }
    }
    echo json_encode(['msg' => 'error', 'reason' => 'Error eliminando el grado']);
    exit();
}
