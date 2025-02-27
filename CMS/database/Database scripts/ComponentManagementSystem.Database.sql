USE [master]
GO
/****** Object:  Database [ComponentManagementSystem]    Script Date: 29-07-2024 10:29:47 ******/
CREATE DATABASE [ComponentManagementSystem]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ComponentManagementSystem', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS01\MSSQL\DATA\ComponentManagementSystem.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ComponentManagementSystem_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS01\MSSQL\DATA\ComponentManagementSystem_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ComponentManagementSystem] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ComponentManagementSystem].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ComponentManagementSystem] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET ARITHABORT OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ComponentManagementSystem] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ComponentManagementSystem] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ComponentManagementSystem] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ComponentManagementSystem] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ComponentManagementSystem] SET  MULTI_USER 
GO
ALTER DATABASE [ComponentManagementSystem] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ComponentManagementSystem] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ComponentManagementSystem] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ComponentManagementSystem] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ComponentManagementSystem] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ComponentManagementSystem] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [ComponentManagementSystem] SET QUERY_STORE = OFF
GO
ALTER DATABASE [ComponentManagementSystem] SET  READ_WRITE 
GO
