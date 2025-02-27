USE [ComponentManagementSystem]
GO
/****** Object:  Table [dbo].[Components]    Script Date: 29-07-2024 10:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Components](
	[SerialNo] [int] IDENTITY(1,1) NOT NULL,
	[ManufacturerPartNo] [nvarchar](255) NOT NULL,
	[ComponentType] [nvarchar](255) NOT NULL,
	[PackageSize] [nvarchar](50) NOT NULL,
	[QtyAvailable] [int] NOT NULL,
	[EntryDate] [datetime] NOT NULL,
	[BinNo] [nvarchar](50) NOT NULL,
	[RackNo] [nvarchar](50) NOT NULL,
	[ProjectUsed] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Components] PRIMARY KEY CLUSTERED 
(
	[SerialNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
