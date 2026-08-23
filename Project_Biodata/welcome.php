<?php

require "koneksi.php";

if (!$koneksi) {
    die("Koneksi database gagal: " . mysqli_connect_error());
}

$username = $_POST["username"] ?? "";
$password = $_POST["password"] ?? "";

$query = mysqli_query(
    $koneksi,
    "SELECT * FROM `users`
     WHERE `username` = '$username'
     AND `password` = '$password'"
);

if (!$query) {
    die("Query gagal: " . mysqli_error($koneksi));
}

if (mysqli_num_rows($query) == 0) {
    header("Location: index.php?error=Username%20atau%20password%20salah!");
    exit;
}

$user = mysqli_fetch_assoc($query);
$user_id = $user["id"];

?>

<!DOCTYPE html>
<html lang="id">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Welcome</title>

    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
        rel="stylesheet"
    >

    <style>

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            min-height: 100vh;

            display: flex;
            align-items: center;
            justify-content: center;

            font-family: "Poppins", sans-serif;

            background: #f5f5f5;
        }

        .welcome-card {
            width: 90%;
            max-width: 900px;

            background: white;

            border-radius: 20px;

            overflow: hidden;

            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
        }

        .welcome-header {
            padding: 45px;

            background: #6577ff;

            color: white;

            text-align: center;
        }

        .welcome-header h1 {
            margin: 0;

            font-size: 36px;
        }

        .welcome-header p {
            margin-top: 10px;

            opacity: 0.7;
        }

        .welcome-content {
            padding: 50px;

            text-align: center;
        }

        .welcome-content h2 {
            margin-bottom: 10px;

            font-size: 28px;
        }

        .welcome-content p {
            color: #666;
        }

        .username {
            display: inline-block;

            margin-top: 15px;

            padding: 10px 25px;

            border-radius: 10px;

            background: #f0f0f0;

            font-weight: 600;
        }

        .back-button {
            display: inline-block;

            margin-top: 30px;
            margin-right: 10px;

            padding: 12px 25px;

            border-radius: 10px;

            background: #6577ff;

            color: white;

            text-decoration: none;

            transition: 0.2s;
        }

        .back-button:hover {
            opacity: 0.8;
        }

        .biodata-button {
            display: inline-block;

            margin-top: 30px;

            padding: 12px 25px;

            border-radius: 10px;

            background: #22c55e;

            color: white;

            text-decoration: none;

            transition: 0.2s;
        }

        .biodata-button:hover {
            opacity: 0.8;
        }

    </style>

</head>

<body>

    <div class="welcome-card">

        <div class="welcome-header">

            <h1>
                Welcome Back!
            </h1>

            <p>
                Login berhasil
            </p>

        </div>


        <div class="welcome-content">

            <h2>
                Halo, <?= htmlspecialchars($username); ?> 👋
            </h2>

            <p>
                Selamat datang di halaman utama.
            </p>

            <p>
                Kamu berhasil masuk menggunakan akun:
            </p>

            <div class="username">
                <?= htmlspecialchars($username); ?>
            </div>

            <br>

            
            <a    href="http://localhost:3000/biodata/<?= $user_id; ?>"
                class="biodata-button"
            >
                Isi Biodata
            </a>

            
            <a    href="index.php"
                class="back-button"
            >
                Kembali ke Login
            </a>

        </div>

    </div>

</body>

</html>

<?php
mysqli_close($koneksi);
?>