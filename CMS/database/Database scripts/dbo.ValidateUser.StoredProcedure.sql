USE [ComponentManagementSystem]
GO
/****** Object:  StoredProcedure [dbo].[ValidateUser]    Script Date: 29-07-2024 10:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ValidateUser]
@Username VARCHAR(50),
@Password VARCHAR(50),
@ErrorMessage NVARCHAR(255) OUTPUT
AS
BEGIN
SET NOCOUNT ON;
DECLARE @UserId INT;
DECLARE @UserPassword NVARCHAR(50);
DECLARE @Useremail NVARCHAR(100);
DECLARE @UserLastLoginDate DATETIME;
DECLARE @UserCreatedDate DATETIME;
 BEGIN TRY
 SELECT
*
 FROM Users
 WHERE Username = @Username AND Password= @Password;


 

 
 END TRY
 BEGIN CATCH
 SET @ErrorMessage = 'Error Occurred while validating';
 END CATCH
 END
GO
