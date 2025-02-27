USE [ComponentManagementSystem]
GO
/****** Object:  StoredProcedure [dbo].[AddComponents]    Script Date: 29-07-2024 10:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddComponents]
(@SerialNo int,
@ManufacturerPartNo nvarchar(255),
@ComponentType nvarchar(255),
@PackageSize nvarchar(50),
@QtyAvailable int,
@EntryDate datetime,
@BinNo nvarchar(50),
@RackNo nvarchar(50),
@ProjectUsed nvarchar(255)
)
AS
BEGIN
SET NOCOUNT ON;
BEGIN TRY
INSERT INTO Components
 (
 ManufacturerPartNo,
 ComponentType,
 PackageSize,
 QtyAvailable,
 EntryDate,
 BinNo,
 RackNo,
 ProjectUsed)
VALUES  
(
@ManufacturerPartNo,
@ComponentType,
@PackageSize, @QtyAvailable,
@EntryDate,
@BinNo,
@RackNo,
@ProjectUsed) 
select SCOPE_IDENTITY() as Id

END TRY
BEGIN CATCH
SELECT
ERROR_NUMBER() AS ErrorNumber,
ERROR_MESSAGE() AS ErrorMessage;
END CATCH

END
GO
