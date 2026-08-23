<?php

require "koneksi.php";
/** @var mysqli $koneksi */

$username = $_POST["username"] ?? "";

$username = $_POST["username"] ?? "";
$email = $_POST["email"] ?? "";
$password = $_POST["password"] ?? "";

if ($username == "" || $email == "" || $password == "") {
    die("Username, email, dan password harus diisi.");
}

$cek = mysqli_query(
    $koneksi,
    "SELECT * FROM `users` WHERE `username` = '$username'"
);

if (mysqli_num_rows($cek) > 0) {
    $berhasil = false;
    $pesan = "Username sudah digunakan!";
} else {

    $query = mysqli_query(
        $koneksi,
        "INSERT INTO `users` (`username`, `email`, `password`)
         VALUES ('$username', '$email', '$password')"
    );

    if ($query) {
        $berhasil = true;
        $pesan = "Akun berhasil dibuat!";
    } else {
        $berhasil = false;
        $pesan = "Sign Up gagal: " . mysqli_error($koneksi);
    }
}

mysqli_close($koneksi);

?>

<!doctype html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0; min-height: 100vh;
            display: flex; justify-content: center; align-items: center;
            font-family: "Poppins", sans-serif;
            background: #f5f5f5;
        }
        .card {
            width: 90%; max-width: 700px;
            background: white; border-radius: 20px; overflow: hidden;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
        }
        .header { padding: 45px; text-align: center; background: #6577ff; color: white; }
        .header h1 { margin: 0; font-size: 32px; }
        .header p { margin: 10px 0 0; opacity: 0.7; }
        .content { padding: 45px; text-align: center; }
        .icon {
            width: 80px; height: 80px; margin: 0 auto 25px;
            display: flex; align-items: center; justify-content: center;
            border-radius: 50%; background: #f1f1f1; font-size: 38px;
        }
        .content h2 { margin: 0 0 10px; font-size: 25px; }
        .content p { color: #666; line-height: 1.7; }
        .username {
            display: inline-block; margin-top: 10px; padding: 10px 25px;
            border-radius: 10px; background: #f1f1f1; font-weight: 600;
        }
        .button {
            display: inline-block; margin-top: 25px; padding: 12px 28px;
            border-radius: 10px; background: #6577ff; color: white;
            text-decoration: none; transition: 0.2s;
        }
        .button:hover { opacity: 0.75; }
        .error { color: #d00; }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1>Sign Up</h1>
            <p>Create your account</p>
        </div>
        <div class="content">
            <?php if ($berhasil): ?>
                <div class="icon">✓</div>
                <h2>Sign Up Berhasil!</h2>
                <p>Akun kamu berhasil dibuat.</p>
                <p>Username kamu:</p>
                <div class="username"><?= htmlspecialchars($username); ?></div>
                <br>
                <a href="index.php" class="button">Sign In</a>
            <?php else: ?>
                <div class="icon">!</div>
                <h2 class="error">Sign Up Gagal</h2>
                <p><?= htmlspecialchars($pesan); ?></p>
                <a href="index.php" class="button">Kembali</a>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>