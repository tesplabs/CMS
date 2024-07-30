using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Moq;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Xunit;
using ComponentManagementSystem.Controllers;
using ComponentManagementSystem.Services;
using FluentAssertions;
using ComponentManagementSystem.models;

namespace TestProject1
{
    public class ComponentsControllerTests
    {
        private readonly Mock<IComponentServices> _componentServiceMock;
        private readonly ComponentsController _controller;

        public ComponentsControllerTests()
        {
            _componentServiceMock = new Mock<IComponentServices>();
            _controller = new ComponentsController(_componentServiceMock.Object);
        }

        [Fact]
        public async Task GetComponents_ShouldReturnsOkResult_WithComponents()
        {
            //Arrange 1st step
            var expectedComponents = new List<Components>
            {
                new Components
                {
                    SerialNo = 1,
                    ManufacturerPartNo = "MPN1",
                    ComponentType = "Type1",
                    PackageSize = "Size1",
                    QtyAvailable = 10,
                    EntryDate = DateTime.Now,
                    BinNo = "Bin1",
                    RackNo = "Rack1",
                    ProjectUsed = "Project1"
                }
            };
            _componentServiceMock.Setup(service => service.GetComponentsAsync())
                .ReturnsAsync(expectedComponents);

            // Act
            var result = await _controller.GetComponents();

            // Assert
            var okResult = result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult.Value.Should().BeEquivalentTo(expectedComponents);
        }

        [Fact]
        public async Task GetComponents_ShouldReturnOkResult_WithEmptyComponentsList_WhenComponentsAreNotFound()
        {
            var expectedComponents = new List<Components>();

            _componentServiceMock.Setup(service => service.GetComponentsAsync()).ReturnsAsync(expectedComponents);

            var result = await _controller.GetComponents();

            var okResult = result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult.Value.Should().BeEquivalentTo(expectedComponents);
        }

        [Fact]
        public async Task GetComponents_ShouldReturn_InternalServerError_WhenExceptionOccurs()
        {
            var exceptionMessage = "Test Exception";
            _componentServiceMock.Setup(service => service.GetComponentsAsync()).ThrowsAsync(new Exception(exceptionMessage));

            var result = await _controller.GetComponents();

            var objectResult = result as ObjectResult;
            objectResult.Should().NotBeNull();
            objectResult.StatusCode.Should().Be(StatusCodes.Status500InternalServerError);
            objectResult.Value.Should().Be(exceptionMessage);
        }

        // Add Components tests
        [Fact]
        public async Task AddComponent_ShouldReturnSuccessfullStatus()
        {
            //Arrange
            var newComponent = new Components
            {
                SerialNo = 1,
                ManufacturerPartNo = "MPN1",
                ComponentType = "Type1",
                PackageSize = "Size1",
                QtyAvailable = 10,
                EntryDate = DateTime.Now,
                BinNo = "Bin1",
                RackNo = "Rack1",
                ProjectUsed = "Project1"
            };
            _componentServiceMock.Setup(service => service.AddComponentAsync(newComponent)).ReturnsAsync(1);

            //Act
            var result = await _controller.AddComponent(newComponent);

            //Assert
            var statusResult = result as StatusCodeResult;
            statusResult.Should().NotBeNull();
            statusResult.StatusCode.Should().Be(201);
        }

        [Fact]
        public async Task AddComponent_ShouldReturnBadRequest_WhenAddComponentFails()
        {
            var newComponent = new Components
            {
                SerialNo = 1,
                ManufacturerPartNo = "MPN1",
                ComponentType = "Type1",
                PackageSize = "Size1",
                QtyAvailable = 10,
                EntryDate = DateTime.Now,
                BinNo = "Bin1",
                RackNo = "Rack1",
                ProjectUsed = "Project1"
            };
            _componentServiceMock.Setup(service => service.AddComponentAsync(newComponent)).ReturnsAsync(0);

            var result = await _controller.AddComponent(newComponent);

            var badRequestResult = result as StatusCodeResult;
            badRequestResult.Should().NotBeNull();
            badRequestResult.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        }

        [Fact]
        public async Task AddComponent_ShouldReturnBadRequest_WhwnComponentIsNull()
        {
            Components newComponent = null;
            
            var result = await _controller.AddComponent(newComponent);

            var badRequestResult = result as BadRequestObjectResult;
            badRequestResult.Should().NotBeNull();
            badRequestResult.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
            badRequestResult.Value.Should().Be("Component is null");
        }
    
        [Fact]
        public async Task UpdateComponent_ShouldReturnOk_WhenUpdatIsSuccessfull()
        {
            var existingComponent = new Components
            {
                SerialNo = 1,
                ManufacturerPartNo = "MPN1",
                ComponentType = "Type1",
                PackageSize = "Size1",
                QtyAvailable = 10,
                EntryDate = DateTime.Now,
                BinNo = "Bin1",
                RackNo = "Rack1",
                ProjectUsed = "Project1"
            };
            _componentServiceMock.Setup(service => service.UpdateComponentAsync(existingComponent)).ReturnsAsync(1);

            var result = await _controller.UpdateComponent(existingComponent);

            var statusResult = result as OkObjectResult;
            statusResult.Should().NotBeNull();
            statusResult.Value.Should().Be(1);
        }

        [Fact]
        public async Task UpdateComponent_ShouldReturnNotFound_WhenComponentIsNotFound()
        {
            var existingComponent = new Components
            {
                SerialNo = 0,
                ManufacturerPartNo = "MPN1",
                ComponentType = "Type1",
                PackageSize = "Size1",
                QtyAvailable = 10,
                EntryDate = DateTime.Now,
                BinNo = "Bin1",
                RackNo = "Rack1",
                ProjectUsed = "Project1"
            };
            _componentServiceMock.Setup(service => service.UpdateComponentAsync(existingComponent)).ReturnsAsync(0);

            var result = await _controller.UpdateComponent(existingComponent);

            var notFoundResult = result as NotFoundObjectResult;
            notFoundResult.Should().NotBeNull();
            notFoundResult.StatusCode.Should().Be(StatusCodes.Status404NotFound);
            notFoundResult.Value.Should().Be("Component not found.");
        }

        [Fact]
        public async Task UpdateComponent_ShouldReturnBadRequest_WhwnComponentIsNull()
        {
            Components existingComponent = null;

            var result = await _controller.UpdateComponent(existingComponent);

            var badRequestResult = result as BadRequestObjectResult;
            badRequestResult.Should().NotBeNull();
            badRequestResult.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
            badRequestResult.Value.Should().Be("Component is null");
        }

        // Delete Components Tests
        [Fact]
        public async Task DeleteComponent_ShouldReturnOkWhenComponentIsDeleted()
        {
            int SerialNo = 1;
            _componentServiceMock.Setup(service => service.DeleteComponentAsync(SerialNo)).ReturnsAsync(1);

            var result = await _controller.DeleteComponent(SerialNo);

            var okResult = result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult.Value.Should().Be(1);
        }

        [Fact]
        public async Task DeleteComponent_ShouldReturnNotFound_WhenComponentIsNotFound()
        {
            int SerialNo = 1;
            _componentServiceMock.Setup(service => service.DeleteComponentAsync(SerialNo)).ReturnsAsync(0);

            var result = await _controller.DeleteComponent(SerialNo);

            var notFoundResult = result as NotFoundObjectResult;
            notFoundResult.Should().NotBeNull();
            notFoundResult.StatusCode.Should().Be(StatusCodes.Status404NotFound);
            notFoundResult.Value.Should().Be("Component not found.");
        }
       

        [Fact]
        public async Task DeleteComponent_ShouldReturnBadRequest_WhenSerialNoIsInvalid()
        {
            int SerialNo = -1;

            var result = await _controller.DeleteComponent(SerialNo);

            var badRequestResult = result as BadRequestObjectResult;
            badRequestResult.Should().NotBeNull();
            badRequestResult.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
            badRequestResult.Value.Should().Be("Invalid serial number.");
        }

        [Fact]
        public async Task DeleteComponent_ShouldReturn_InternalServerError_WhenExceptionIsThrown()
        {
            int SerialNo = 1;
            _componentServiceMock.Setup(service => service.DeleteComponentAsync(SerialNo)).Throws(new Exception("An error occurred"));

            var result = await _controller.DeleteComponent(SerialNo);

            var internalServerErrorResult = result as ObjectResult;
            internalServerErrorResult.Should().NotBeNull();
            internalServerErrorResult.StatusCode.Should().Be(StatusCodes.Status500InternalServerError);
            internalServerErrorResult.Value.Should().Be("An error occurred");
        }
    }
}