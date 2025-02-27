USE [ComponentManagementSystem]
GO
/****** Object:  StoredProcedure [dbo].[GetComponents]    Script Date: 29-07-2024 10:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetComponents]
as
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT * FROM Components
        
    END TRY
    BEGIN CATCH
        SELECT 
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState,
            ERROR_PROCEDURE() AS ErrorProcedure,
            ERROR_LINE() AS ErrorLine,
            ERROR_MESSAGE() AS ErrorMessage;
    END CATCH

END
GO
