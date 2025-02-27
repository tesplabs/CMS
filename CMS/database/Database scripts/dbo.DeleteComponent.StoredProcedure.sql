USE [ComponentManagementSystem]
GO
/****** Object:  StoredProcedure [dbo].[DeleteComponent]    Script Date: 29-07-2024 10:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteComponent]
	@SerialNo INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
		DELETE FROM Components WHERE SerialNo = @SerialNo;

		SELECT @@ROWCOUNT AS AffectedRows;
	END TRY
	BEGIN CATCH
		SELECT
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END
GO
