-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2021 at 07:33 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `persediaan`
--
CREATE DATABASE IF NOT EXISTS `persediaan` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `persediaan`;

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode_barang` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `merek_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gudang_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `rak` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `kode_barang`, `nama`, `jenis_id`, `merek_id`, `gudang_id`, `rak`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'S00001', 'Spandek 6 Meter', '2', '1', '1', '', '2021-03-03 08:28:34', '2021-04-18 19:39:43', NULL),
(2, 'B00002', 'Batu', '1', '1', '1', '', '2021-03-09 06:01:18', '2021-03-13 08:11:23', NULL),
(3, 'B00003', 'Batu', '1', '1', '1', '', '2021-03-09 06:02:10', '2021-03-13 08:12:30', NULL),
(4, 'E00004', 'Emir', '2', '1', '1', '', '2021-03-09 09:00:35', '2021-03-13 08:06:28', NULL),
(5, '100005', '123123', '1', '1', '1', '', '2021-03-10 21:24:40', '2021-03-11 05:36:41', NULL),
(6, 'a00006', 'asdasd', '1', '1', '1', '', '2021-03-10 21:54:16', '2021-03-13 08:12:41', NULL),
(7, 'B00007', 'Beton', '1', '1', '1', '', '2021-03-11 01:31:40', '2021-03-13 08:12:25', NULL),
(8, 'X00008', 'xzczxcz', '2', '1', '1', '', '2021-03-11 01:45:58', '2021-03-11 01:45:58', NULL),
(9, '100009', '123', '1', '1', '1', '', '2021-03-11 01:56:49', '2021-03-11 01:56:49', NULL),
(10, 'A00010', 'asdasd', '1', '1', '1', '', '2021-03-11 02:17:39', '2021-03-13 08:12:28', '2021-03-13 08:12:28'),
(11, 'Y00011', 'YOYOYO', '2', '2', '1', '', '2021-03-13 02:23:46', '2021-03-13 08:12:52', '2021-03-13 08:12:52'),
(12, 'B00012', 'BATOK', '2', '2', '1', '', '2021-03-13 02:25:32', '2021-03-13 02:25:32', NULL),
(13, 'S00013', 'sadasd', '2', '1', '1', '', '2021-03-13 02:27:39', '2021-03-13 02:27:39', NULL),
(14, 'D00014', 'da', '3', '2', '1', '', '2021-03-13 06:02:35', '2021-03-13 06:02:35', NULL),
(15, 'A00015', 'aku', '2', '2', '1', '', '2021-03-13 06:06:53', '2021-03-13 06:06:53', NULL),
(16, 'L00016', 'lukiki', '2', '2', '1', '', '2021-03-13 06:09:09', '2021-03-13 06:09:09', NULL),
(17, 'L00017', 'lulu', '2', '2', '1', '', '2021-03-13 06:09:29', '2021-03-13 06:09:29', NULL),
(18, 'I00018', 'in', '2', '2', '1', '', '2021-03-13 06:11:33', '2021-04-18 19:21:40', NULL),
(19, 'D00019', 'David', '1', '3', '1', '', '2021-03-13 07:44:18', '2021-04-18 19:36:37', '2021-04-18 19:36:37'),
(20, 'A00020', 'asdasd', '1', '1', '1', '', '2021-03-13 07:46:34', '2021-04-18 19:36:29', '2021-04-18 19:36:29'),
(21, 'A00021', 'asdasd', '1', '1', '1', '', '2021-03-13 07:46:36', '2021-04-18 19:17:36', '2021-04-18 19:17:36'),
(22, 'A00022', 'asdasd', '1', '1', '1', '', '2021-03-13 07:46:38', '2021-04-18 19:21:20', '2021-04-18 19:21:20'),
(23, 'A00023', 'asdasd', '1', '1', '1', '', '2021-03-13 07:46:38', '2021-04-18 19:16:05', '2021-04-18 19:16:05'),
(24, 'A00024', 'asdasd', '1', '1', '1', '', '2021-03-13 07:46:46', '2021-04-18 19:17:17', '2021-04-18 19:17:17'),
(25, 'A00025', 'asdasd', '1', '1', '1', '', '2021-03-13 07:47:39', '2021-04-18 19:16:41', '2021-04-18 19:16:41'),
(26, 'A00026', 'asdasd', '1', '1', '1', '', '2021-03-13 07:47:49', '2021-04-18 19:15:59', '2021-04-18 19:15:59'),
(27, 'B00027', 'BESI BETON', '1', '1', '1', '', '2021-03-13 07:57:24', '2021-03-13 08:12:48', '2021-03-13 08:12:48'),
(28, 'D00027', 'Detik', '1', '1', '2', 'BA-1', '2021-03-13 18:44:35', '2021-04-18 19:24:45', '2021-04-18 19:24:45'),
(29, 'B00029', 'Botak', '1', '2', '2', 'asdasd', '2021-03-13 18:48:49', '2021-03-13 18:48:49', NULL),
(30, 'B00030', 'Botak', '1', '2', '2', 'asdasd', '2021-03-13 18:49:10', '2021-03-13 18:49:54', '2021-03-13 18:49:54'),
(31, 'J00030', 'Jakarta', '3', NULL, '3', NULL, '2021-03-13 18:57:48', '2021-03-13 18:57:48', NULL),
(32, 'J00032', 'Jakarta', '3', '2', '3', 'asdasd', '2021-03-13 18:57:54', '2021-04-18 19:14:50', '2021-04-18 19:14:50');

-- --------------------------------------------------------

--
-- Table structure for table `detail_penjualan`
--

CREATE TABLE `detail_penjualan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `master_penjualan_id` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_barang_id` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlah` double NOT NULL,
  `harga` double NOT NULL,
  `diskon` double NOT NULL,
  `total` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detail_penjualan`
--

INSERT INTO `detail_penjualan` (`id`, `master_penjualan_id`, `kode_barang_id`, `jumlah`, `harga`, `diskon`, `total`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '15', 'X00008', 5, 10000, 0, 50000, '2021-04-10 03:20:06', '2021-04-10 03:20:06', NULL),
(2, '15', 'S00001', 2, 100000, 0, 200000, '2021-04-10 03:20:06', '2021-04-10 03:20:06', NULL),
(3, '16', 'X00008', 5, 10000, 0, 50000, '2021-04-10 05:57:35', '2021-04-10 05:57:35', NULL),
(4, '16', '100009', 5, 10000, 0, 50000, '2021-04-10 05:57:35', '2021-04-10 05:57:35', NULL),
(5, '16', 'S00001', 3, 100000, 0, 300000, '2021-04-10 05:57:35', '2021-04-10 05:57:35', NULL),
(6, '17', 'S00001', 1, 100000, 0, 100000, '2021-04-10 06:01:07', '2021-04-10 06:01:07', NULL),
(7, '17', '100009', 1, 10000, 0, 10000, '2021-04-10 06:01:07', '2021-04-10 06:01:07', NULL),
(8, '18', 'S00001', 5, 100000, 0, 500000, '2021-04-10 06:18:30', '2021-04-10 06:18:30', NULL),
(9, '19', 'X00008', 5, 10000, 0, 50000, '2021-04-10 07:53:29', '2021-04-10 07:53:29', NULL),
(10, '19', 'S00001', 5, 100000, 0, 500000, '2021-04-10 07:53:29', '2021-04-10 07:53:29', NULL),
(11, '20', 'S00001', 5, 100000, 0, 500000, '2021-04-10 07:55:10', '2021-04-10 07:55:10', NULL),
(12, '20', 'X00008', 10, 5000, 0, 50000, '2021-04-10 07:55:10', '2021-04-10 07:55:10', NULL),
(13, '20', 'L00016', 5, 25000, 0, 125000, '2021-04-10 07:55:10', '2021-04-10 07:55:10', NULL),
(14, '21', 'S00001', 1, 100000, 0, 100000, '2021-04-11 20:03:14', '2021-04-11 20:03:14', NULL),
(15, '22', 'S00001', 1, 100000, 0, 100000, '2021-04-11 20:07:57', '2021-04-11 20:07:57', NULL),
(16, '23', 'S00001', 1, 100000, 0, 100000, '2021-04-11 20:14:54', '2021-04-11 20:14:54', NULL),
(17, '24', 'S00001', 1, 100000, 0, 100000, '2021-04-11 20:28:37', '2021-04-11 20:28:37', NULL),
(18, '25', 'S00001', 5, 100000, 0, 500000, '2021-04-15 05:08:21', '2021-04-15 05:08:21', NULL),
(19, '26', 'S00001', 5, 100000, 0, 500000, '2021-04-18 17:31:28', '2021-04-18 17:31:28', NULL),
(20, '26', 'X00008', 3, 10000, 0, 30000, '2021-04-18 17:31:28', '2021-04-18 17:31:28', NULL),
(21, '27', 'S00001', 1, 100000, 0, 100000, '2021-04-18 17:37:31', '2021-04-18 17:37:31', NULL),
(22, '28', 'S00001', 1, 100000, 0, 100000, '2021-04-18 17:39:50', '2021-04-18 17:39:50', NULL),
(23, '29', 'S00001', 1, 100000, 0, 100000, '2021-04-18 17:41:07', '2021-04-18 17:41:07', NULL),
(24, '30', 'X00008', 10, 10000, 0, 100000, '2021-04-18 17:41:32', '2021-04-18 17:41:32', NULL),
(25, '31', 'X00008', 5, 10000, 0, 50000, '2021-04-18 17:42:15', '2021-04-18 17:42:15', NULL),
(26, '32', 'B00007', 5, 10000, 0, 50000, '2021-04-18 22:47:17', '2021-04-18 22:47:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gudang`
--

CREATE TABLE `gudang` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gudang`
--

INSERT INTO `gudang` (`id`, `nama`, `alamat`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Tidak di tentukan', '', NULL, NULL, NULL),
(2, 'Gudang Bandung', 'Bandung', NULL, NULL, NULL),
(3, 'Jakarta', 'asdasd', '2021-03-13 18:57:23', '2021-03-13 18:57:23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `harga_jual`
--

CREATE TABLE `harga_jual` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode_barang` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `satuan_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `catatan` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `harga_jual`
--

INSERT INTO `harga_jual` (`id`, `kode_barang`, `satuan_id`, `harga`, `catatan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'S00013', '3', '2000', 'sadad', '2021-03-13 02:27:39', '2021-03-13 02:27:39', NULL),
(2, 'S00013', '1', '1000', NULL, '2021-03-13 02:27:39', '2021-03-13 02:27:39', NULL),
(3, 'a00006', '1', '100000', NULL, '2021-03-13 03:51:11', '2021-03-13 03:51:11', NULL),
(5, 'B00007', '2', '10000', 'fhdh', '2021-03-13 04:01:41', '2021-03-13 04:01:41', NULL),
(6, 'B00007', '1', '10000', 'dfgdgf', '2021-03-13 04:05:19', '2021-03-13 04:05:19', NULL),
(7, 'B00007', '2', '5000', 'sdfsf', '2021-03-13 04:06:09', '2021-03-13 04:06:09', NULL),
(8, 'B00007', '3', '10000', 'asdasd', '2021-03-13 04:06:37', '2021-03-13 04:06:37', NULL),
(9, 'B00007', '1', '10000', 'safas', '2021-03-13 04:46:13', '2021-03-13 04:46:13', NULL),
(10, 'B00007', '2', '1000', 'dfsdff', '2021-03-13 04:46:33', '2021-03-13 04:46:33', NULL),
(11, 'B00003', '2', '10000', 'sadasda', '2021-03-13 04:48:47', '2021-03-13 04:48:47', NULL),
(13, 'a00006', '2', '10000', '345wer', '2021-03-13 06:37:14', '2021-03-13 06:37:14', NULL),
(15, 'S00001', '2', '100000', 'gbgbg', '2021-03-13 06:49:37', '2021-03-13 06:49:37', NULL),
(16, 'D00019', '2', '200000', 'asdasd', '2021-03-13 07:44:18', '2021-03-13 07:44:18', NULL),
(17, 'D00019', '3', '50000', 'asdasd', '2021-03-13 07:44:18', '2021-03-13 07:44:18', NULL),
(18, 'B00027', '2', '17500', 'asdasd', '2021-03-13 07:57:58', '2021-03-13 07:57:58', NULL),
(19, 'X00008', '1', '10000', 'dgdfgdfg', '2021-03-13 18:10:30', '2021-03-13 18:10:30', NULL),
(20, 'X00008', '2', '5000', 'vnvnvbn', '2021-03-13 18:11:21', '2021-03-13 18:11:21', NULL),
(21, 'D00027', '1', '10000', 'sadasdasdasd', '2021-03-13 18:44:35', '2021-03-13 18:44:35', NULL),
(22, 'B00029', '2', '10000', 'sdadasd', '2021-03-13 18:48:49', '2021-03-13 18:48:49', NULL),
(23, 'B00030', '2', '10000', 'sdadasd', '2021-03-13 18:49:10', '2021-03-13 18:49:10', NULL),
(24, 'X00008', '3', '100000', 'fghfgh', '2021-03-14 01:19:56', '2021-03-14 01:19:56', NULL),
(25, '100009', '3', '10000', 'dfhdfh', '2021-03-30 20:49:18', '2021-03-30 20:49:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jenis_barang`
--

CREATE TABLE `jenis_barang` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jenis_barang`
--

INSERT INTO `jenis_barang` (`id`, `nama`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Bahan Jadi', NULL, NULL, NULL),
(2, 'Bahan Baku', NULL, NULL, NULL),
(3, 'asf', '2021-03-12 23:41:58', '2021-03-12 23:41:58', NULL),
(4, 'BBM Trust', '2021-03-12 23:49:35', '2021-03-12 23:49:35', NULL),
(5, 'asdasd', '2021-03-12 23:50:54', '2021-03-12 23:50:54', NULL),
(6, 'asdasd', '2021-03-12 23:52:43', '2021-03-12 23:52:43', NULL),
(7, 'Bahan Bahan', '2021-03-13 00:04:02', '2021-03-13 00:04:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_bank`
--

CREATE TABLE `master_bank` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nomor_rekening` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_bank` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `catatan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `master_bank`
--

INSERT INTO `master_bank` (`id`, `nomor_rekening`, `nama_bank`, `catatan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '0124804102', 'BNI', '', '2021-04-07 03:29:13', NULL, NULL),
(2, '124124', 'BCA', '', '2021-04-08 03:29:16', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_kontak`
--

CREATE TABLE `master_kontak` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipe` enum('PELANGGAN','SUPPLIER','KARYAWAN') COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon` double NOT NULL,
  `identitas` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info_lain` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_perusahaan` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `npwp` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `akun_piutang_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `akun_utang_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wic` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `master_kontak`
--

INSERT INTO `master_kontak` (`id`, `nama`, `tipe`, `telepon`, `identitas`, `email`, `info_lain`, `nama_perusahaan`, `npwp`, `alamat`, `akun_piutang_id`, `akun_utang_id`, `wic`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Lucky Anggara', 'SUPPLIER', 82116562811, NULL, NULL, NULL, NULL, NULL, 'Bandung\r\nBandung asdasdasdasd', NULL, NULL, 0, NULL, NULL, NULL),
(2, 'Desi', 'PELANGGAN', 128104802084, NULL, NULL, NULL, NULL, NULL, 'asdasdasdasdasdasdadas', NULL, NULL, 0, NULL, NULL, NULL),
(3, 'Lucky', 'PELANGGAN', 12312, NULL, NULL, NULL, NULL, NULL, 'asdasd', NULL, NULL, 0, '2021-04-15 05:08:21', '2021-04-15 05:08:21', NULL),
(14, 'a', 'PELANGGAN', 1, NULL, NULL, NULL, NULL, NULL, 'a', NULL, NULL, 0, '2021-04-20 02:08:14', '2021-04-20 02:08:14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_penjualan`
--

CREATE TABLE `master_penjualan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nomor_transaksi` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kontak_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` double NOT NULL,
  `diskon` double NOT NULL,
  `ongkir` double NOT NULL,
  `pajak_masukan` double DEFAULT NULL,
  `grand_total` double NOT NULL,
  `metode_pembayaran` enum('Lunas','Kredit','Cash On Delivery (COD)') COLLATE utf8mb4_unicode_ci NOT NULL,
  `kredit` tinyint(1) DEFAULT NULL,
  `down_payment` double DEFAULT NULL,
  `sisa_pembayaran` double DEFAULT NULL,
  `cara_pembayaran` enum('Tunai','Transfer') COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_jatuh_tempo` datetime DEFAULT NULL,
  `retur` enum('Iya','Tidak') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `master_penjualan`
--

INSERT INTO `master_penjualan` (`id`, `nomor_transaksi`, `kontak_id`, `total`, `diskon`, `ongkir`, `pajak_masukan`, `grand_total`, `metode_pembayaran`, `kredit`, `down_payment`, `sisa_pembayaran`, `cara_pembayaran`, `bank_id`, `tanggal_jatuh_tempo`, `retur`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 'BBM-100421-2', '1', 100000, 0, 0, 10000, 110000, 'Lunas', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-09 19:32:07', '2021-04-09 19:32:07', NULL),
(3, 'BBM-100421-3', '1', 100000, 0, 0, 10000, 110000, 'Kredit', 1, 5000, NULL, 'Tunai', NULL, '2021-04-10 00:00:00', 'Tidak', '1', '2021-04-09 19:33:53', '2021-04-09 19:33:53', NULL),
(4, 'BBM-100421-4', '1', 100000, 0, 0, 10000, 110000, 'Kredit', 1, 5000, NULL, 'Tunai', NULL, '2022-04-16 00:00:00', 'Tidak', '1', '2021-04-09 19:36:18', '2021-04-09 19:36:18', NULL),
(5, 'BBM-100421-5', '1', 100000, 0, 0, 10000, 110000, 'Kredit', 1, 4000, NULL, 'Tunai', NULL, '2022-04-16 00:00:00', 'Tidak', '1', '2021-04-09 19:37:45', '2021-04-09 19:37:45', NULL),
(6, 'BBM-100421-6', '1', 100000, 0, 0, 10000, 110000, 'Kredit', 1, 4000, NULL, 'Transfer', '0', '2022-04-16 00:00:00', 'Tidak', '1', '2021-04-09 20:12:48', '2021-04-09 20:12:48', NULL),
(7, 'BBM-100421-7', '1', 100000, 0, 0, 10000, 110000, 'Kredit', 1, 4000, NULL, 'Transfer', '0', '2022-04-16 00:00:00', 'Tidak', '1', '2021-04-09 20:12:55', '2021-04-09 20:12:55', NULL),
(8, 'BBM-100421-8', '1', 100000, 0, 0, 10000, 110000, 'Kredit', 1, 4000, NULL, 'Transfer', '1', '2022-04-16 00:00:00', 'Tidak', '1', '2021-04-09 20:13:21', '2021-04-09 20:13:21', NULL),
(9, 'BBM-100421-9', '1', 100000, 0, 0, 10000, 110000, 'Lunas', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-09 20:39:11', '2021-04-09 20:39:11', NULL),
(10, 'BBM-100421-10', '1', 100000, 0, 0, 10000, 110000, 'Lunas', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-09 20:39:34', '2021-04-09 20:39:34', NULL),
(11, 'BBM-100421-11', '1', 100000, 0, 0, 10000, 110000, 'Lunas', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-09 21:03:22', '2021-04-09 21:03:22', NULL),
(12, 'BBM-100421-12', '1', 100000, 0, 0, 10000, 110000, 'Kredit', 1, 40000, NULL, 'Tunai', NULL, '2022-04-14 00:00:00', 'Tidak', '1', '2021-04-09 21:06:44', '2021-04-09 21:06:44', NULL),
(13, 'BBM-100421-13', '1', 100000, 0, 0, 10000, 110000, 'Kredit', 0, 0, 10000, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-10 03:12:32', '2021-04-10 03:12:32', NULL),
(14, 'BBM-100421-14', '1', 250000, 0, 0, 25000, 275000, 'Lunas', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-10 03:19:35', '2021-04-10 03:19:35', NULL),
(15, 'BBM-100421-15', '1', 250000, 0, 0, 25000, 275000, 'Lunas', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-10 03:20:06', '2021-04-10 03:20:06', NULL),
(16, 'BBM-100421-16', '1', 400000, 0, 20000, 40000, 460000, 'Kredit', 1, 100000, NULL, 'Transfer', '1', '2022-04-15 00:00:00', 'Tidak', '1', '2021-04-10 05:57:35', '2021-04-10 05:57:35', NULL),
(17, 'BBM-100421-17', '1', 110000, 0, 0, 11000, 121000, 'Kredit', 1, 20000, 1000, 'Transfer', '0', '2022-04-16 00:00:00', 'Tidak', '1', '2021-04-10 06:01:07', '2021-04-10 06:01:07', NULL),
(18, 'BBM-100421-18', '1', 500000, 0, 0, 50000, 550000, 'Kredit', 1, 20000, NULL, 'Transfer', '1', '2022-04-09 00:00:00', 'Tidak', '1', '2021-04-10 06:18:30', '2021-04-10 06:18:30', NULL),
(19, 'BBM-100421-19', '1', 550000, 0, 20000, 55000, 625000, 'Lunas', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-10 07:53:29', '2021-04-10 07:53:29', NULL),
(20, 'BBM-100421-20', '1', 675000, 0, 20000, 67500, 762500, 'Lunas', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-10 07:55:10', '2021-04-10 07:55:10', NULL),
(21, 'BBM-120421-1', '1', 100000, 0, 0, 10000, 110000, 'Cash On Delivery (COD)', 0, 0, 110000, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-11 20:03:14', '2021-04-11 20:03:14', NULL),
(22, 'BBM-120421-2', '1', 100000, 0, 0, 10000, 110000, 'Cash On Delivery (COD)', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-11 20:07:57', '2021-04-11 20:07:57', NULL),
(23, 'BBM-120421-3', '1', 100000, 0, 0, 10000, 110000, 'Cash On Delivery (COD)', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-11 20:14:54', '2021-04-11 20:14:54', NULL),
(24, 'BBM-120421-4', '1', 100000, 0, 0, 10000, 110000, 'Lunas', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-11 20:28:37', '2021-04-11 20:28:37', NULL),
(25, 'BBM-150421-1', '3', 500000, 0, 0, 50000, 550000, 'Lunas', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-15 05:08:21', '2021-04-15 05:08:21', NULL),
(26, 'BBM-190421-1', '2', 530000, 0, 0, 53000, 583000, 'Cash On Delivery (COD)', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-18 17:31:28', '2021-04-18 17:31:28', NULL),
(27, 'BBM-190421-2', '2', 100000, 0, 0, 10000, 110000, 'Cash On Delivery (COD)', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-18 17:37:31', '2021-04-18 17:37:31', NULL),
(28, 'BBM-190421-3', '2', 100000, 0, 0, 10000, 110000, 'Lunas', 0, 0, NULL, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-18 17:39:50', '2021-04-18 17:39:50', NULL),
(29, 'BBM-190421-4', '2', 100000, 0, 0, 10000, 110000, 'Cash On Delivery (COD)', 0, 0, 110000, 'Tunai', NULL, NULL, 'Tidak', '1', '2021-04-18 17:41:07', '2021-04-18 17:41:07', NULL),
(30, 'BBM-190421-5', '2', 100000, 0, 0, 10000, 110000, 'Kredit', 1, 20000, 0, 'Tunai', NULL, '2021-04-30 00:00:00', 'Tidak', '1', '2021-04-18 17:41:32', '2021-04-18 17:41:32', NULL),
(31, 'BBM-190421-6', '2', 50000, 0, 0, 5000, 55000, 'Kredit', 1, 20000, 35000, 'Tunai', NULL, '2021-04-29 00:00:00', 'Tidak', '1', '2021-04-18 17:42:15', '2021-04-18 17:42:15', NULL),
(32, 'BBM-190421-7', '2', 50000, 0, 0, 5000, 55000, 'Kredit', 1, 10000, 45000, 'Transfer', '0', '2021-04-23 00:00:00', 'Tidak', '1', '2021-04-18 22:47:17', '2021-04-18 22:47:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_persediaan`
--

CREATE TABLE `master_persediaan` (
  `id` int(11) NOT NULL,
  `kode_barang_id` varchar(255) NOT NULL,
  `master_penjualan_id` varchar(255) NOT NULL,
  `tanggal_transaksi` datetime NOT NULL,
  `debit` double NOT NULL,
  `kredit` double NOT NULL,
  `saldo` double NOT NULL,
  `keterangan` varchar(512) NOT NULL,
  `nomor_jurnal` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cabang_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_persediaan`
--

INSERT INTO `master_persediaan` (`id`, `kode_barang_id`, `master_penjualan_id`, `tanggal_transaksi`, `debit`, `kredit`, `saldo`, `keterangan`, `nomor_jurnal`, `user_id`, `cabang_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1', '29', '2021-03-30 23:22:44', 30, 0, 30, 'Pembelian Nomor Transaksi #asdasdasd', '', 1, 1, '2021-04-12 03:15:24', NULL, NULL),
(2, '2', '12', '2021-03-30 23:24:20', 5, 0, 5, 'Pembelian', '124124', 1, 1, NULL, NULL, NULL),
(3, '1', '27', '2021-03-31 09:23:26', 0, 15, 15, 'Penjualan', '123', 1, 1, '2021-04-14 03:15:27', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `merek_barang`
--

CREATE TABLE `merek_barang` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `merek_barang`
--

INSERT INTO `merek_barang` (`id`, `nama`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'BBM', NULL, NULL, NULL),
(2, 'BBM Trust', '2021-03-13 00:05:32', '2021-03-13 00:05:32', NULL),
(3, 'LUCKY YO', '2021-03-13 07:35:15', '2021-03-13 07:35:15', NULL),
(4, 'DESI YO', '2021-03-13 07:40:35', '2021-03-13 07:40:35', NULL),
(5, 'LULA', '2021-03-13 07:41:55', '2021-03-13 07:41:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2021_03_08_135321_create_barang', 1),
(5, '2021_03_08_135735_create_jenis_barang', 2),
(6, '2021_03_08_135744_create_merek_barang', 2),
(7, '2021_03_08_135819_create_satuan_barang', 2),
(9, '2021_03_12_042032_create_master_kontak', 3),
(10, '2021_03_13_070812_create_harga_jual', 4),
(11, '2021_03_14_012140_create_gudang', 5),
(12, '2021_03_12_032541_create_master_penjualan', 6),
(13, '2021_04_09_013131_create_tabel_detail_penjualan', 6),
(14, '2021_04_12_034728_create_master_bank', 7);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `satuan_barang`
--

CREATE TABLE `satuan_barang` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `satuan_barang`
--

INSERT INTO `satuan_barang` (`id`, `nama`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Meter', NULL, NULL, NULL),
(2, 'KG', '2021-03-13 02:22:43', '2021-03-13 02:22:43', NULL),
(3, 'Roll', '2021-03-13 02:27:27', '2021-03-13 02:27:27', NULL),
(4, 'CM', '2021-03-13 07:43:34', '2021-03-13 07:43:34', NULL),
(5, 'KILOGRAM', '2021-03-13 07:43:47', '2021-03-13 07:43:47', NULL),
(6, 'yaya', '2021-04-20 01:22:21', '2021-04-20 01:22:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Lucky', 'anggara.lucky@gmail.com', NULL, '', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_barang` (`kode_barang`);

--
-- Indexes for table `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `gudang`
--
ALTER TABLE `gudang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `harga_jual`
--
ALTER TABLE `harga_jual`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jenis_barang`
--
ALTER TABLE `jenis_barang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_bank`
--
ALTER TABLE `master_bank`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `master_bank_nomor_rekening_unique` (`nomor_rekening`);

--
-- Indexes for table `master_kontak`
--
ALTER TABLE `master_kontak`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_penjualan`
--
ALTER TABLE `master_penjualan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `master_penjualan_nomor_transaksi_unique` (`nomor_transaksi`);

--
-- Indexes for table `master_persediaan`
--
ALTER TABLE `master_persediaan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merek_barang`
--
ALTER TABLE `merek_barang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `satuan_barang`
--
ALTER TABLE `satuan_barang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gudang`
--
ALTER TABLE `gudang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `harga_jual`
--
ALTER TABLE `harga_jual`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `jenis_barang`
--
ALTER TABLE `jenis_barang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `master_bank`
--
ALTER TABLE `master_bank`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `master_kontak`
--
ALTER TABLE `master_kontak`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `master_penjualan`
--
ALTER TABLE `master_penjualan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `master_persediaan`
--
ALTER TABLE `master_persediaan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `merek_barang`
--
ALTER TABLE `merek_barang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `satuan_barang`
--
ALTER TABLE `satuan_barang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
