USE [ComponentManagementSystem]
GO
/****** Object:  StoredProcedure [dbo].[UpdateComponents]    Script Date: 29-07-2024 10:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateComponents]
(
	@SerialNo int,
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
DECLARE @RowsAffected int;

UPDATE Components
SET
	ManufacturerPartNo = @ManufacturerPartNo,
	ComponentType = @ComponentType,
	PackageSize = @PackageSize,
		QtyAvailable = @QtyAvailable,
	EntryDate = @EntryDate,
	BinNo = @BinNo,
	RackNo = @RackNo,
	ProjectUsed = @ProjectUsed  
 WHERE SerialNo = @SerialNo;
 
 SET @RowsAffected = @@ROWCOUNT;

 SELECT @RowsAffected AS RowsAffected;

 END TRY
 BEGIN CATCH
 SELECT 
 ERROR_NUMBER() AS ErrorNumber,
 ERROR_MESSAGE() AS ErrorMessage;
 END CATCH

END
GO
