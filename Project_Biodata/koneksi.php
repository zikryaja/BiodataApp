<?php
$koneksi = mysqli_connect("localhost", "root", "", "biodata_app");

if (!$koneksi) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>