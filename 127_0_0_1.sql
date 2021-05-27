-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2021 at 08:59 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `keuangan`
--
CREATE DATABASE IF NOT EXISTS `keuangan` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `keuangan`;

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
-- Table structure for table `jenis_akun`
--

CREATE TABLE `jenis_akun` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jenis_akun`
--

INSERT INTO `jenis_akun` (`id`, `nama`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ASSET', NULL, NULL, NULL),
(2, 'LIABLITIES', NULL, NULL, NULL),
(3, 'MODAL', NULL, NULL, NULL),
(4, 'PENDAPATAN', NULL, NULL, NULL),
(5, 'BEBAN', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_akun`
--

CREATE TABLE `master_akun` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `jenis_akun_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_akun` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `saldo_normal` enum('DEBIT','KREDIT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `header` tinyint(4) NOT NULL DEFAULT 0,
  `komponen` varchar(244) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cabang_id` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `master_akun`
--

INSERT INTO `master_akun` (`id`, `jenis_akun_id`, `kode_akun`, `nama`, `saldo_normal`, `header`, `komponen`, `cabang_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1', '1.0.0', 'ASSET', 'DEBIT', 1, NULL, 0, NULL, NULL, NULL),
(3, '1', '1.1.1', 'KAS', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(4, '1', '1.1.2', 'KAS KECIL', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(5, '1', '1.1.4', 'PIUTANG DAGANG', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(6, '1', '1.1.5', 'PERSEDIAAN DAGANG', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(7, '1', '1.1.6', 'PERLENGKAPAN KANTOR', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(8, '1', '1.1.7', 'SEWA DIBAYAR DIMUKA', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(9, '1', '1.1.8', 'PPN MASUKAN', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(11, '1', '1.2.1', 'PERALATAN KANTOR', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(12, '1', '1.2.2', 'AKUMULASI PENYUSUTAN PERALATAN KANTOR', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(13, '1', '1.2.3', 'GEDUNG', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(14, '1', '1.2.4', 'AKUMULASI PENYUSUTAN GEDUNG', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(15, '1', '1.2.5', 'TANAH', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(16, '1', '1.2.6', 'AKUMULASI PENYUSUTAN TANAH', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(17, '1', '1.2.7', 'KENDARAAN', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(18, '1', '1.2.8', 'AKUMULASI PENYUSUTAN KENDARAAN', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(19, '2', '2.0.0', 'LIABILITIES', 'KREDIT', 1, NULL, 0, NULL, NULL, NULL),
(21, '2', '2.1.1', 'UTANG DAGANG', 'KREDIT', 0, NULL, 0, NULL, NULL, NULL),
(23, '2', '2.2.1', 'UTANG BANK', 'KREDIT', 0, NULL, 0, NULL, NULL, NULL),
(24, '2', '2.2.2', 'UTANG LEASING', 'KREDIT', 0, NULL, 0, NULL, NULL, NULL),
(25, '2', '2.2.3', 'UTANG PIHAK LAINNYA', 'KREDIT', 0, NULL, 0, NULL, NULL, NULL),
(26, '2', '2.3.1', 'PPN KELUARAN', 'KREDIT', 0, NULL, 0, NULL, NULL, NULL),
(27, '3', '3.0.0', 'EKUITAS', 'KREDIT', 1, NULL, 0, NULL, NULL, NULL),
(28, '3', '3.1.0', 'MODAL DI SETOR', 'KREDIT', 0, NULL, 0, NULL, NULL, NULL),
(29, '3', '3.2.0', 'PRIVE', 'KREDIT', 0, NULL, 0, NULL, NULL, NULL),
(30, '3', '3.3.0', 'SALDO LABA', 'KREDIT', 0, NULL, 0, NULL, NULL, NULL),
(31, '4', '4.0.0', 'PENDAPATAN', 'KREDIT', 1, NULL, 0, NULL, NULL, NULL),
(32, '4', '4.1.1', 'PENJUALAN', 'KREDIT', 0, NULL, 0, NULL, NULL, NULL),
(33, '4', '4.1.2', 'PENDAPATAN LAINNYA', 'KREDIT', 0, NULL, 0, NULL, NULL, NULL),
(34, '4', '4.1.3', 'RETUR PENJUALAN', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(35, '4', '4.1.4', 'DISKON PENJUALAN', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(36, '5', '5.0.0', 'BEBAN', 'DEBIT', 1, NULL, 0, NULL, NULL, NULL),
(39, '5', '5.1.3', 'DISKON PEMBELIAN', 'KREDIT', 0, NULL, 0, NULL, NULL, NULL),
(40, '5', '5.3.1', 'BEBAN GAJI', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(41, '5', '5.4.1', 'BEBAN SEWA', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(42, '5', '5.5.1', 'BEBAN OPERASIONAL', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(43, '5', '5.6.1', 'BEBAN LAIN - LAIN', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(44, '5', '5.2.1', 'HARGA POKOK PENJUALAN', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(45, '1', '1.1.3', 'KAS BANK', 'DEBIT', 0, NULL, 0, NULL, NULL, NULL),
(46, '1', '1.1.2-1', 'KAS KECIL KASIR LUCKY ANGGARA', 'DEBIT', 0, '1.1.2', 0, NULL, NULL, NULL),
(47, '5', '5.5.1-1', 'BEBAN OPERASIONAL LISTRIK', 'DEBIT', 0, '5.5.1', 0, '2021-05-24 03:30:49', NULL, NULL),
(48, '5', '5.5.1-2', 'BEBAN OPERASIONAL AIR', 'DEBIT', 0, '5.5.1', 0, '2021-05-24 03:30:49', NULL, NULL),
(49, '5', '5.5.1-3', 'BEBAN OPERASIONAL BENSIN MOBIL', 'DEBIT', 0, '5.5.1', 1, '2021-05-24 03:30:49', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_beban`
--

CREATE TABLE `master_beban` (
  `id` int(11) NOT NULL,
  `master_akun_id` int(11) NOT NULL,
  `nominal` double NOT NULL,
  `catatan` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cabang_id` int(11) NOT NULL,
  `nomor_jurnal` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_beban`
--

INSERT INTO `master_beban` (`id`, `master_akun_id`, `nominal`, `catatan`, `user_id`, `cabang_id`, `nomor_jurnal`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 47, 20000, 'dfsfs', 1, 1, '8', '2021-05-26 04:35:50', '2021-05-26 04:35:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_jurnal`
--

CREATE TABLE `master_jurnal` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reff` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_jurnal` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `master_akun_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nominal` double NOT NULL,
  `jenis` enum('DEBIT','KREDIT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `keterangan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `cabang_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `master_jurnal`
--

INSERT INTO `master_jurnal` (`id`, `reff`, `nomor_jurnal`, `master_akun_id`, `nominal`, `jenis`, `keterangan`, `user_id`, `cabang_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '2105201', '2105201', '3', 2500000, 'DEBIT', 'Setor Modal Usaha', 1, 1, '2021-05-19 19:14:54', '2021-05-20 07:15:16', NULL),
(2, '2105201', '2105201', '28', 2500000, 'KREDIT', 'Setor Modal Usaha', 1, 1, '2021-05-19 19:14:54', '2021-05-20 07:15:16', NULL),
(3, '2105202', '2105202', '3', 2350000, 'KREDIT', 'KAS KELUAR PEMBELIAN NOMOR TRANSAKSI #1', 1, 1, '2021-05-19 19:29:56', '2021-05-20 07:29:58', NULL),
(4, '2105202', '2105202', '6', 2000000, 'DEBIT', 'PEMBELIAN NOMOR TRANSAKSI #1', 1, 1, '2021-05-19 19:29:56', '2021-05-20 07:29:58', NULL),
(5, '2105202', '2105202', '9', 200000, 'DEBIT', 'PAJAK MASUKAN PEMBELIAN NOMOR TRANSAKSI #1', 1, 1, '2021-05-19 19:29:56', '2021-05-20 07:29:58', NULL),
(6, '2105202', '2105202', '43', 150000, 'DEBIT', 'ONGKIR PEMBELIAN NOMOR TRANSAKSI #1', 1, 1, '2021-05-19 19:29:56', '2021-05-20 07:29:58', NULL),
(7, '2105203', '2105203', '46', 301000, 'DEBIT', 'KAS MASUK PENJUALAN NOMOR TRANSAKSI #BBM-200521-1', 1, 1, '2021-05-19 19:31:53', '2021-05-20 07:31:54', NULL),
(8, '2105203', '2105203', '32', 250000, 'KREDIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-200521-1', 1, 1, '2021-05-19 19:31:53', '2021-05-20 07:31:54', NULL),
(9, '2105203', '2105203', '26', 21000, 'KREDIT', 'PAJAK KELUARAN PENJUALAN NOMOR TRANSAKSI #BBM-200521-1', 1, 1, '2021-05-19 19:31:53', '2021-05-20 07:31:54', NULL),
(10, '2105203', '2105203', '33', 50000, 'KREDIT', 'ONGKIR PENJUALAN NOMOR TRANSAKSI #BBM-200521-1', 1, 1, '2021-05-19 19:31:53', '2021-05-20 07:31:54', NULL),
(11, '2105203', '2105203', '35', 20000, 'DEBIT', 'DISKON PENJUALAN NOMOR TRANSAKSI #BBM-200521-1', 1, 1, '2021-05-19 19:31:53', '2021-05-20 07:31:54', NULL),
(12, '2105203', '2105203', '44', 200000, 'DEBIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-200521-1', 1, 1, '2021-05-19 19:31:54', '2021-05-20 07:31:54', NULL),
(13, '2105203', '2105203', '6', 200000, 'KREDIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-200521-1', 1, 1, '2021-05-19 19:31:54', '2021-05-20 07:31:54', NULL),
(14, '2105204', '2105204', '46', 235000, 'DEBIT', 'KAS MASUK PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-19 20:14:26', '2021-05-23 07:32:32', '2021-05-23 07:32:32'),
(15, '2105204', '2105204', '32', 250000, 'KREDIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-19 20:14:26', '2021-05-23 07:32:32', '2021-05-23 07:32:32'),
(16, '2105204', '2105204', '26', 15000, 'KREDIT', 'PAJAK KELUARAN PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-19 20:14:26', '2021-05-23 07:32:32', '2021-05-23 07:32:32'),
(17, '2105204', '2105204', '33', 20000, 'KREDIT', 'ONGKIR PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-19 20:14:26', '2021-05-23 07:32:32', '2021-05-23 07:32:32'),
(18, '2105204', '2105204', '35', 50000, 'DEBIT', 'DISKON PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-19 20:14:26', '2021-05-23 07:32:32', '2021-05-23 07:32:32'),
(19, '2105204', '2105204', '44', 200000, 'DEBIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-19 20:14:28', '2021-05-23 07:32:32', '2021-05-23 07:32:32'),
(20, '2105204', '2105204', '6', 200000, 'KREDIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-19 20:14:28', '2021-05-23 07:32:32', '2021-05-23 07:32:32'),
(21, '2105234', '2105234', '46', 30000, 'DEBIT', 'KAS MASUK PENJUALAN NOMOR TRANSAKSI #BBM-230521-1', 1, 1, '2021-05-22 19:34:10', '2021-05-23 07:34:10', NULL),
(22, '2105234', '2105234', '32', 30000, 'KREDIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-230521-1', 1, 1, '2021-05-22 19:34:10', '2021-05-23 07:34:10', NULL),
(23, '2105234', '2105234', '44', 15000, 'DEBIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-230521-1', 1, 1, '2021-05-22 19:34:10', '2021-05-23 07:34:11', NULL),
(24, '2105234', '2105234', '6', 15000, 'KREDIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-230521-1', 1, 1, '2021-05-22 19:34:10', '2021-05-23 07:34:11', NULL),
(25, '2105235', '2105235', '46', 200000, 'DEBIT', 'KAS MASUK PENJUALAN NOMOR TRANSAKSI #BBM-230521-2', 1, 1, '2021-05-22 19:39:49', '2021-05-23 07:39:49', NULL),
(26, '2105235', '2105235', '32', 200000, 'KREDIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-230521-2', 1, 1, '2021-05-22 19:39:49', '2021-05-23 07:39:49', NULL),
(27, '2105235', '2105235', '44', 40000, 'DEBIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-230521-2', 1, 1, '2021-05-22 19:39:49', '2021-05-23 07:39:49', NULL),
(28, '2105235', '2105235', '6', 40000, 'KREDIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-230521-2', 1, 1, '2021-05-22 19:39:49', '2021-05-23 07:39:49', NULL),
(29, '2105236', '2105236', '46', 251000, 'DEBIT', 'KAS MASUK PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-22 19:45:15', '2021-05-23 07:45:15', NULL),
(30, '2105236', '2105236', '32', 250000, 'KREDIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-22 19:45:15', '2021-05-23 07:45:15', NULL),
(31, '2105236', '2105236', '33', 1000, 'KREDIT', 'ONGKIR PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-22 19:45:15', '2021-05-23 07:45:15', NULL),
(53, '2105237', '2105237', '46', 361000, 'DEBIT', 'KAS MASUK PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-22 20:15:19', '2021-05-23 08:15:19', NULL),
(54, '2105237', '2105237', '32', 360000, 'KREDIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-22 20:15:19', '2021-05-23 08:15:19', NULL),
(55, '2105237', '2105237', '33', 1000, 'KREDIT', 'ONGKIR PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-22 20:15:19', '2021-05-23 08:15:19', NULL),
(56, '2105237', '2105237', '44', 210000, 'DEBIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-22 20:15:19', '2021-05-23 08:15:19', NULL),
(57, '2105237', '2105237', '6', 210000, 'KREDIT', 'PENJUALAN NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-22 20:15:19', '2021-05-23 08:15:19', NULL),
(58, '8', '8', '47', 20000, 'DEBIT', 'DEBIT', 1, 1, '2021-05-26 04:35:50', '2021-05-26 04:35:50', NULL),
(59, '8', '8', '4', 20000, 'KREDIT', 'KREDIT', 1, 1, '2021-05-26 04:35:50', '2021-05-26 04:35:50', NULL);

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
(4, '2021_04_21_052151_create_master_akun', 1),
(5, '2021_04_21_052308_create_jenis_akun', 1),
(6, '2021_04_21_054830_create_master_jurnal', 1);

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
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jenis_akun`
--
ALTER TABLE `jenis_akun`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_akun`
--
ALTER TABLE `master_akun`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nomor_akun` (`kode_akun`);

--
-- Indexes for table `master_beban`
--
ALTER TABLE `master_beban`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_jurnal`
--
ALTER TABLE `master_jurnal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `akun` (`master_akun_id`);

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jenis_akun`
--
ALTER TABLE `jenis_akun`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `master_akun`
--
ALTER TABLE `master_akun`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `master_beban`
--
ALTER TABLE `master_beban`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_jurnal`
--
ALTER TABLE `master_jurnal`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
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
  `harga_beli` double NOT NULL,
  `rak` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis` enum('FIFO','AVERAGE','','') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'FIFO',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `kode_barang`, `nama`, `jenis_id`, `merek_id`, `gudang_id`, `harga_beli`, `rak`, `jenis`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'S00001', 'Spandek 6 Meter', '2', '1', '1', 2000, '', 'FIFO', '2021-03-02 18:28:34', '2021-03-12 18:09:59', NULL),
(2, 'B00002', 'Batu', '1', '1', '1', 0, '', 'FIFO', '2021-03-08 16:01:18', '2021-03-12 18:11:23', '2021-03-12 18:11:23'),
(3, 'B00003', 'Batu', '1', '1', '1', 0, '', 'FIFO', '2021-03-08 16:02:10', '2021-03-12 18:12:30', '2021-03-12 18:12:30'),
(4, 'E00004', 'Emir', '2', '1', '1', 0, '', 'FIFO', '2021-03-08 19:00:35', '2021-03-12 18:06:28', '2021-03-12 18:06:28'),
(5, '100005', '123123', '1', '1', '1', 0, '', 'FIFO', '2021-03-10 07:24:40', '2021-03-10 15:36:41', '2021-03-10 15:36:41'),
(6, 'a00006', 'asdasd', '1', '1', '1', 0, '', 'FIFO', '2021-03-10 07:54:16', '2021-03-12 18:12:41', '2021-03-12 18:12:41'),
(7, 'B00007', 'Beton', '1', '1', '1', 0, '', 'FIFO', '2021-03-10 11:31:40', '2021-03-12 18:12:25', '2021-03-12 18:12:25'),
(8, 'X00008', 'xzczxcz', '2', '1', '1', 5000, '', 'FIFO', '2021-03-10 11:45:58', '2021-03-10 11:45:58', NULL),
(9, '100009', '123', '1', '1', '1', 2000, '', 'FIFO', '2021-03-10 11:56:49', '2021-03-10 11:56:49', NULL),
(10, 'A00010', 'asdasd', '1', '1', '1', 0, '', 'FIFO', '2021-03-10 12:17:39', '2021-03-12 18:12:28', '2021-03-12 18:12:28'),
(11, 'Y00011', 'YOYOYO', '2', '2', '1', 0, '', 'FIFO', '2021-03-12 12:23:46', '2021-03-12 18:12:52', '2021-03-12 18:12:52'),
(12, 'B00012', 'BATOK', '2', '2', '1', 0, '', 'FIFO', '2021-03-12 12:25:32', '2021-03-12 12:25:32', NULL),
(13, 'S00013', 'sadasd', '2', '1', '1', 0, '', 'FIFO', '2021-03-12 12:27:39', '2021-03-12 12:27:39', NULL),
(14, 'D00014', 'da', '3', '2', '1', 0, '', 'FIFO', '2021-03-12 16:02:35', '2021-03-12 16:02:35', NULL),
(15, 'A00015', 'aku', '2', '2', '1', 0, '', 'FIFO', '2021-03-12 16:06:53', '2021-03-12 16:06:53', NULL),
(16, 'L00016', 'lukiki', '2', '2', '1', 0, '', 'FIFO', '2021-03-12 16:09:09', '2021-03-12 16:09:09', NULL),
(17, 'L00017', 'lulu', '2', '2', '1', 0, '', 'FIFO', '2021-03-12 16:09:29', '2021-03-12 16:09:29', NULL),
(18, 'I00018', 'in', '2', '2', '1', 0, '', 'FIFO', '2021-03-12 16:11:33', '2021-03-12 16:11:33', NULL),
(19, 'D00019', 'David', '1', '3', '1', 0, '', 'FIFO', '2021-03-12 17:44:18', '2021-03-12 17:44:18', NULL),
(20, 'A00020', 'asdasd', '1', '1', '1', 0, '', 'FIFO', '2021-03-12 17:46:34', '2021-03-12 18:12:32', '2021-03-12 18:12:32'),
(21, 'A00021', 'asdasd', '1', '1', '1', 0, '', 'FIFO', '2021-03-12 17:46:36', '2021-03-12 17:46:36', NULL),
(22, 'A00022', 'asdasd', '1', '1', '1', 0, '', 'FIFO', '2021-03-12 17:46:38', '2021-03-12 17:46:38', NULL),
(23, 'A00023', 'asdasd', '1', '1', '1', 0, '', 'FIFO', '2021-03-12 17:46:38', '2021-03-12 17:46:38', NULL),
(24, 'A00024', 'asdasd', '1', '1', '1', 0, '', 'FIFO', '2021-03-12 17:46:46', '2021-03-12 17:46:46', NULL),
(25, 'A00025', 'asdasd', '1', '1', '1', 0, '', 'FIFO', '2021-03-12 17:47:39', '2021-03-12 17:47:39', NULL),
(26, 'A00026', 'asdasd', '1', '1', '1', 0, '', 'FIFO', '2021-03-12 17:47:49', '2021-03-12 17:47:49', NULL),
(27, 'B00027', 'BESI BETON', '1', '1', '1', 0, '', 'FIFO', '2021-03-12 17:57:24', '2021-03-12 18:12:48', '2021-03-12 18:12:48'),
(28, 'D00027', 'Detik', '1', '1', '2', 0, 'BA-1', 'FIFO', '2021-03-13 04:44:35', '2021-03-13 04:44:35', NULL),
(29, 'B00029', 'Botak', '1', '2', '2', 0, 'asdasd', 'FIFO', '2021-03-13 04:48:49', '2021-03-13 04:48:49', NULL),
(30, 'B00030', 'Botak', '1', '2', '2', 0, 'asdasd', 'FIFO', '2021-03-13 04:49:10', '2021-03-13 04:49:54', '2021-03-13 04:49:54'),
(31, 'J00030', 'Jakarta', '3', NULL, '3', 0, NULL, 'FIFO', '2021-03-13 04:57:48', '2021-03-13 04:57:48', NULL),
(32, 'J00032', 'Jakarta', '3', '2', '3', 0, 'asdasd', 'FIFO', '2021-03-13 04:57:54', '2021-03-13 04:57:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `detail_opname`
--

CREATE TABLE `detail_opname` (
  `id` int(11) NOT NULL,
  `master_opname_id` int(11) NOT NULL,
  `master_barang_id` int(11) NOT NULL,
  `jumlah_tercatat` double NOT NULL,
  `jumlah_fisik` double NOT NULL,
  `perbedaan` double NOT NULL,
  `harga` double NOT NULL,
  `user_id` int(11) NOT NULL,
  `cabang_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_pembelian`
--

CREATE TABLE `detail_pembelian` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `master_pembelian_id` bigint(20) NOT NULL,
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
-- Dumping data for table `detail_pembelian`
--

INSERT INTO `detail_pembelian` (`id`, `master_pembelian_id`, `kode_barang_id`, `jumlah`, `harga`, `diskon`, `total`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'S00001', 100, 20000, 0, 2000000, '2021-05-20 07:29:58', '2021-05-20 07:29:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `detail_penjualan`
--

CREATE TABLE `detail_penjualan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `master_penjualan_id` bigint(20) NOT NULL,
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
(1, 1, 'S00001', 10, 25000, 20000, 230000, '2021-05-20 07:31:54', '2021-05-20 07:31:54', NULL),
(2, 2, 'S00001', 10, 25000, 50000, 200000, '2021-05-20 08:14:28', '2021-05-23 08:15:19', '2021-05-23 08:15:19'),
(3, 3, 'X00008', 3, 10000, 0, 30000, '2021-05-23 07:34:10', '2021-05-23 07:34:10', NULL),
(4, 4, 'S00001', 2, 100000, 0, 200000, '2021-05-23 07:39:49', '2021-05-23 07:39:49', NULL),
(12, 2, 'S00001', 10, 25000, 50000, 200000, '2021-05-23 08:15:19', '2021-05-23 08:15:19', NULL),
(13, 2, '100009', 5, 5000, 0, 25000, '2021-05-23 08:15:19', '2021-05-23 08:15:19', NULL);

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
(3, 'Jakarta', 'asdasd', '2021-03-13 04:57:23', '2021-03-13 04:57:23', NULL);

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
(1, 'S00013', '3', '2000', 'sadad', '2021-03-12 12:27:39', '2021-03-12 12:27:39', NULL),
(2, 'S00013', '1', '1000', NULL, '2021-03-12 12:27:39', '2021-03-12 12:27:39', NULL),
(3, 'a00006', '1', '100000', NULL, '2021-03-12 13:51:11', '2021-03-12 13:51:11', NULL),
(5, 'B00007', '2', '10000', 'fhdh', '2021-03-12 14:01:41', '2021-03-12 14:01:41', NULL),
(6, 'B00007', '1', '10000', 'dfgdgf', '2021-03-12 14:05:19', '2021-03-12 14:05:19', NULL),
(7, 'B00007', '2', '5000', 'sdfsf', '2021-03-12 14:06:09', '2021-03-12 14:06:09', NULL),
(8, 'B00007', '3', '10000', 'asdasd', '2021-03-12 14:06:37', '2021-03-12 14:06:37', NULL),
(9, 'B00007', '1', '10000', 'safas', '2021-03-12 14:46:13', '2021-03-12 14:46:13', NULL),
(10, 'B00007', '2', '1000', 'dfsdff', '2021-03-12 14:46:33', '2021-03-12 14:46:33', NULL),
(11, 'B00003', '2', '10000', 'sadasda', '2021-03-12 14:48:47', '2021-03-12 14:48:47', NULL),
(13, 'a00006', '2', '10000', '345wer', '2021-03-12 16:37:14', '2021-03-12 16:37:14', NULL),
(15, 'S00001', '2', '100000', 'gbgbg', '2021-03-12 16:49:37', '2021-03-12 16:49:37', NULL),
(16, 'D00019', '2', '200000', 'asdasd', '2021-03-12 17:44:18', '2021-03-12 17:44:18', NULL),
(17, 'D00019', '3', '50000', 'asdasd', '2021-03-12 17:44:18', '2021-03-12 17:44:18', NULL),
(18, 'B00027', '2', '17500', 'asdasd', '2021-03-12 17:57:58', '2021-03-12 17:57:58', NULL),
(19, 'X00008', '1', '10000', 'dgdfgdfg', '2021-03-13 04:10:30', '2021-03-13 04:10:30', NULL),
(20, 'X00008', '2', '5000', 'vnvnvbn', '2021-03-13 04:11:21', '2021-03-13 04:11:21', NULL),
(21, 'D00027', '1', '10000', 'sadasdasdasd', '2021-03-13 04:44:35', '2021-03-13 04:44:35', NULL),
(22, 'B00029', '2', '10000', 'sdadasd', '2021-03-13 04:48:49', '2021-03-13 04:48:49', NULL),
(23, 'B00030', '2', '10000', 'sdadasd', '2021-03-13 04:49:10', '2021-03-13 04:49:10', NULL),
(24, 'X00008', '3', '100000', 'fghfgh', '2021-03-13 11:19:56', '2021-03-13 11:19:56', NULL);

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
(3, 'asf', '2021-03-12 09:41:58', '2021-03-12 09:41:58', NULL),
(4, 'BBM Trust', '2021-03-12 09:49:35', '2021-03-12 09:49:35', NULL),
(5, 'asdasd', '2021-03-12 09:50:54', '2021-03-12 09:50:54', NULL),
(6, 'asdasd', '2021-03-12 09:52:43', '2021-03-12 09:52:43', NULL),
(7, 'Bahan Bahan', '2021-03-12 10:04:02', '2021-03-12 10:04:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kartu_persediaan`
--

CREATE TABLE `kartu_persediaan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nomor_transaksi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `master_barang_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis` enum('DEBIT','KREDIT') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DEBIT',
  `jumlah` double NOT NULL DEFAULT 0,
  `harga` double NOT NULL,
  `catatan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `cabang_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kartu_persediaan`
--

INSERT INTO `kartu_persediaan` (`id`, `nomor_transaksi`, `master_barang_id`, `jenis`, `jumlah`, `harga`, `catatan`, `user_id`, `cabang_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1', '1', 'DEBIT', 100, 20000, 'PEMBELIAN BARANG NOMOR TRANSAKSI #1', 1, 1, '2021-05-20 07:29:58', '2021-05-20 07:29:58', NULL),
(2, 'BBM-200521-1', '1', 'KREDIT', 10, 20000, 'PENJUALAN BARANG NOMOR TRANSAKSI #BBM-200521-1', 1, 1, '2021-05-20 07:31:54', '2021-05-20 07:31:54', NULL),
(3, 'BBM-200521-2', '1', 'KREDIT', 10, 20000, 'PENJUALAN BARANG NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-20 08:14:28', '2021-05-23 08:15:19', '2021-05-23 08:15:19'),
(4, 'BBM-230521-1', '8', 'KREDIT', 3, 5000, 'PENJUALAN BARANG NOMOR TRANSAKSI #BBM-230521-1', 1, 1, '2021-05-23 07:34:10', '2021-05-23 07:34:10', NULL),
(8, 'BBM-200521-2', '1', 'KREDIT', 10, 20000, 'PENJUALAN BARANG NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-23 08:15:19', '2021-05-23 08:15:19', NULL),
(9, 'BBM-200521-2', '9', 'KREDIT', 5, 2000, 'PENJUALAN BARANG NOMOR TRANSAKSI #BBM-200521-2', 1, 1, '2021-05-23 08:15:19', '2021-05-23 08:15:19', NULL);

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
(1, '129084091840', 'BCA', 'sadasd', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_cabang`
--

CREATE TABLE `master_cabang` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode_cabang` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_telepon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `master_cabang`
--

INSERT INTO `master_cabang` (`id`, `kode_cabang`, `nama`, `alamat`, `nomor_telepon`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'BBM001', 'BBM Limbangan (Pusat)', 'JL Raya Limbangan ', '123123123', '2021-04-30 05:51:14', '2021-04-30 05:51:14', NULL),
(2, 'BBM002', 'BBM Kadungora', 'Jl Raya Kadungora', 'xzczxc', '2021-04-30 05:51:47', '2021-04-30 05:51:47', NULL),
(3, 'BBM003', 'BBM Wado', 'Jl Raya Wado', '123123', '2021-04-30 05:51:47', '2021-04-30 05:51:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_kontak`
--

CREATE TABLE `master_kontak` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipe` enum('PELANGGAN','SUPPLIER','KARYAWAN') COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon` double DEFAULT NULL,
  `identitas` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info_lain` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_perusahaan` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `npwp` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `akun_piutang_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `akun_utang_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wic` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `master_kontak`
--

INSERT INTO `master_kontak` (`id`, `nama`, `tipe`, `telepon`, `identitas`, `email`, `info_lain`, `nama_perusahaan`, `npwp`, `alamat`, `akun_piutang_id`, `akun_utang_id`, `wic`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Lucky Anggara', 'PELANGGAN', 82116562811, NULL, NULL, NULL, NULL, NULL, 'Jl Kp Pasir Honje Nomor 37 RT 03 RW 14\r\nBandung\r\nJawa Barat', NULL, NULL, 0, NULL, NULL, NULL),
(2, 'Desi Evilia', 'SUPPLIER', 123123, NULL, NULL, NULL, NULL, NULL, 'Jl Kp Pasir Honje Nomor 37 RT 03 RW 14\r\nBandung\r\nJawa Barat', NULL, NULL, 0, NULL, NULL, NULL),
(3, 'Indah', 'PELANGGAN', 123123, NULL, NULL, NULL, NULL, NULL, 'asdasda', NULL, NULL, 1, '2021-04-13 13:56:46', '2021-04-13 13:56:46', NULL),
(4, 'yora', 'PELANGGAN', NULL, NULL, NULL, NULL, NULL, NULL, 'asdasd', NULL, NULL, 1, '2021-04-15 11:03:54', '2021-04-15 11:03:54', NULL),
(5, 'asdasd', 'PELANGGAN', 23123, NULL, NULL, NULL, NULL, NULL, 'asdasd', NULL, NULL, 1, '2021-04-15 11:04:08', '2021-04-15 11:04:08', NULL),
(6, 'asdas', 'PELANGGAN', NULL, NULL, NULL, NULL, NULL, NULL, 'asdas', NULL, NULL, 1, '2021-04-15 11:04:22', '2021-04-15 11:04:22', NULL),
(7, 'aaaaaaa', 'PELANGGAN', 124124, NULL, NULL, NULL, NULL, NULL, 'aaaa', NULL, NULL, 1, '2021-04-15 11:04:53', '2021-04-15 11:04:53', NULL),
(8, 'dddddddd', 'PELANGGAN', NULL, NULL, NULL, NULL, NULL, NULL, 'dddasd', NULL, NULL, 1, '2021-04-15 11:39:15', '2021-04-15 11:39:15', NULL),
(9, 'david', 'PELANGGAN', 123123, NULL, NULL, NULL, NULL, NULL, 'asdasdasd', NULL, NULL, 0, '2021-04-22 11:07:13', '2021-04-22 11:07:13', NULL),
(10, 'Ivan', 'SUPPLIER', 123123, NULL, NULL, NULL, NULL, NULL, 'asdasd', NULL, NULL, 0, '2021-04-26 13:49:36', '2021-04-26 13:49:36', NULL),
(11, 'Paron', 'SUPPLIER', 123123, NULL, NULL, NULL, NULL, NULL, 'Jakarta', NULL, NULL, 0, '2021-04-26 13:50:45', '2021-04-26 13:50:45', NULL),
(12, 'Paron', 'SUPPLIER', 123123, NULL, NULL, NULL, NULL, NULL, 'Jakarta', NULL, NULL, 0, '2021-04-26 13:50:46', '2021-04-26 13:50:46', NULL),
(13, 'Paron2', 'SUPPLIER', 123123, NULL, NULL, NULL, NULL, NULL, 'asdasd', NULL, NULL, 0, '2021-04-26 13:51:19', '2021-04-26 13:51:19', NULL),
(14, 'asdasd', 'PELANGGAN', 123123, NULL, NULL, NULL, NULL, NULL, 'asdasd', NULL, NULL, 1, '2021-05-05 23:59:11', '2021-05-05 23:59:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_opname`
--

CREATE TABLE `master_opname` (
  `id` int(11) NOT NULL,
  `nomor_opname` varchar(255) NOT NULL,
  `tipe` int(11) NOT NULL DEFAULT 0,
  `kategori` int(11) NOT NULL DEFAULT 0,
  `catatan` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `cabang_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `master_pegawai`
--

CREATE TABLE `master_pegawai` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_lengkap` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sales` int(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `master_pegawai`
--

INSERT INTO `master_pegawai` (`id`, `nama_lengkap`, `avatar`, `sales`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Lucky Anggara', '/img/13-small.d796bffd.png', 0, '2021-05-06 07:24:30', NULL, NULL),
(2, 'Desi Evilia', '/img/13-small.d796bffd.png', 1, '2021-05-06 07:24:30', NULL, NULL),
(3, 'Anggadila', '/img/13-small.d796bffd.png', 1, '2021-05-06 07:24:30', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_pembelian`
--

CREATE TABLE `master_pembelian` (
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
  `cabang_id` int(11) NOT NULL,
  `nomor_jurnal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `catatan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `master_pembelian`
--

INSERT INTO `master_pembelian` (`id`, `nomor_transaksi`, `kontak_id`, `total`, `diskon`, `ongkir`, `pajak_masukan`, `grand_total`, `metode_pembayaran`, `kredit`, `down_payment`, `sisa_pembayaran`, `cara_pembayaran`, `bank_id`, `tanggal_jatuh_tempo`, `retur`, `user_id`, `cabang_id`, `nomor_jurnal`, `catatan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1', '2', 2000000, 0, 150000, 200000, 2350000, 'Lunas', 0, 0, 0, 'Tunai', NULL, NULL, 'Tidak', '1', 1, '2105202', 'asdasdasd', '2021-05-19 17:00:00', '2021-05-19 17:00:00', NULL);

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
  `pajak_keluaran` double DEFAULT NULL,
  `grand_total` double NOT NULL,
  `metode_pembayaran` enum('Lunas','Kredit','Cash On Delivery (COD)') COLLATE utf8mb4_unicode_ci NOT NULL,
  `kredit` tinyint(1) DEFAULT NULL,
  `down_payment` double DEFAULT NULL,
  `sisa_pembayaran` double DEFAULT NULL,
  `cara_pembayaran` enum('Tunai','Transfer') COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_jatuh_tempo` datetime DEFAULT NULL,
  `retur` enum('Iya','Tidak') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sales_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `catatan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `cabang_id` int(11) NOT NULL,
  `nomor_jurnal` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `master_penjualan`
--

INSERT INTO `master_penjualan` (`id`, `nomor_transaksi`, `kontak_id`, `total`, `diskon`, `ongkir`, `pajak_keluaran`, `grand_total`, `metode_pembayaran`, `kredit`, `down_payment`, `sisa_pembayaran`, `cara_pembayaran`, `bank_id`, `tanggal_jatuh_tempo`, `retur`, `sales_id`, `catatan`, `user_id`, `cabang_id`, `nomor_jurnal`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'BBM-200521-1', '1', 230000, 20000, 50000, 0, 260000, 'Lunas', 0, 0, 0, 'Tunai', NULL, NULL, 'Tidak', '3', NULL, 1, 1, '2105203', '2021-05-20 07:31:54', '2021-05-23 05:37:50', NULL),
(2, 'BBM-200521-2', '1', 360000, 0, 1000, 0, 361000, 'Cash On Delivery (COD)', 0, 0, 361000, 'Tunai', NULL, NULL, 'Tidak', '2', NULL, 1, 1, '2105237', '2021-05-20 08:14:28', '2021-05-23 08:15:19', NULL),
(3, 'BBM-230521-1', '1', 30000, 0, 0, 0, 30000, 'Lunas', 0, 0, 0, 'Tunai', NULL, NULL, 'Tidak', '1', NULL, 1, 1, '2105234', '2021-05-23 07:34:10', '2021-05-23 07:34:10', NULL),
(4, 'BBM-230521-2', '9', 200000, 0, 0, 0, 200000, 'Lunas', 0, 0, 0, 'Tunai', NULL, NULL, 'Tidak', '1', NULL, 1, 1, '2105235', '2021-05-23 07:39:49', '2021-05-23 07:39:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_persediaan`
--

CREATE TABLE `master_persediaan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nomor_transaksi` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_transaksi` enum('Penjualan','Pembelian') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Approve','Reject','Retur') COLLATE utf8mb4_unicode_ci NOT NULL,
  `catatan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(2, 'BBM Trust', '2021-03-12 10:05:32', '2021-03-12 10:05:32', NULL),
(3, 'LUCKY YO', '2021-03-12 17:35:15', '2021-03-12 17:35:15', NULL),
(4, 'DESI YO', '2021-03-12 17:40:35', '2021-03-12 17:40:35', NULL),
(5, 'LULA', '2021-03-12 17:41:55', '2021-03-12 17:41:55', NULL);

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
(15, '2021_04_09_013131_create_tabel_detail_penjualan', 7),
(16, '2021_04_12_034728_create_master_bank', 8),
(17, '2021_04_26_042935_create_master_persediaan', 9),
(18, '2021_04_26_050136_create_kartu_persediaan', 9),
(20, '2021_04_30_054712_create_master_cabang', 10),
(22, '2021_05_01_060934_create_role', 11),
(23, '2021_05_01_062510_create_master_pegawai', 11);

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
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`action`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
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
(2, 'KG', '2021-03-12 12:22:43', '2021-03-12 12:22:43', NULL),
(3, 'Roll', '2021-03-12 12:27:27', '2021-03-12 12:27:27', NULL),
(4, 'CM', '2021-03-12 17:43:34', '2021-03-12 17:43:34', NULL),
(5, 'KILOGRAM', '2021-03-12 17:43:47', '2021-03-12 17:43:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ability` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pegawai_id` int(11) NOT NULL,
  `cabang_id` int(11) NOT NULL,
  `kode_akun_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `role`, `ability`, `password`, `remember_token`, `pegawai_id`, `cabang_id`, `kode_akun_id`, `created_at`, `updated_at`) VALUES
(1, 'lucky', 'admin', '[{\"action\" : \"manage\", \"subject\" : \"All\"}]', '123456', NULL, 1, 1, '46', NULL, NULL);

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
-- Indexes for table `detail_opname`
--
ALTER TABLE `detail_opname`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `kartu_persediaan`
--
ALTER TABLE `kartu_persediaan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_bank`
--
ALTER TABLE `master_bank`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `master_bank_nomor_rekening_unique` (`nomor_rekening`);

--
-- Indexes for table `master_cabang`
--
ALTER TABLE `master_cabang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `master_cabang_kode_cabang_unique` (`kode_cabang`);

--
-- Indexes for table `master_kontak`
--
ALTER TABLE `master_kontak`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_opname`
--
ALTER TABLE `master_opname`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_pegawai`
--
ALTER TABLE `master_pegawai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_pembelian`
--
ALTER TABLE `master_pembelian`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `master_penjualan_nomor_transaksi_unique` (`nomor_transaksi`);

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `master_persediaan_nomor_transaksi_unique` (`nomor_transaksi`);

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
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

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
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `detail_opname`
--
ALTER TABLE `detail_opname`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `jenis_barang`
--
ALTER TABLE `jenis_barang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `kartu_persediaan`
--
ALTER TABLE `kartu_persediaan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `master_bank`
--
ALTER TABLE `master_bank`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_cabang`
--
ALTER TABLE `master_cabang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `master_kontak`
--
ALTER TABLE `master_kontak`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `master_opname`
--
ALTER TABLE `master_opname`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_pegawai`
--
ALTER TABLE `master_pegawai`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `master_pembelian`
--
ALTER TABLE `master_pembelian`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_penjualan`
--
ALTER TABLE `master_penjualan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `master_persediaan`
--
ALTER TABLE `master_persediaan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merek_barang`
--
ALTER TABLE `merek_barang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `satuan_barang`
--
ALTER TABLE `satuan_barang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
