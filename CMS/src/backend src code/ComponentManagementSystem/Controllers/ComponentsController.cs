using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using ComponentManagementSystem.Services;
using System.ComponentModel;
using ComponentManagementSystem.models;
using OfficeOpenXml;
using System.IO;

namespace ComponentManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class ComponentsController : ControllerBase
    {
        private readonly IComponentServices _componentService;

        public ComponentsController(IComponentServices componentService)
        {
            _componentService = componentService;
        }

        [HttpGet("GetComponents")]
        public async Task<IActionResult> GetComponents()
        {
            try
            {
                var components = await _componentService.GetComponentsAsync();
                return Ok(components);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("AddComponents")]
        public async Task<IActionResult> AddComponent([FromBody] Components component)
        {
            try
            {
                if (component == null)
                {
                    return BadRequest("Component is null");
                }
                int rowsAffected = await _componentService.AddComponentAsync(component);
                if (rowsAffected > 0)
                {
                    return StatusCode(StatusCodes.Status201Created);
                }
                else
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("UpdateComponents")]
        public async Task<IActionResult> UpdateComponent([FromBody] Components component)
        {
            try
            {
                if (component == null)
                {
                    return BadRequest("Component is null");
                }
                int rowsAffected = await _componentService.UpdateComponentAsync(component);
                if (rowsAffected > 0)
                {
                    return Ok(rowsAffected);
                }
                else
                {
                    return NotFound("Component not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("DeleteComponent/{serialNo}")]
        public async Task<IActionResult> DeleteComponent(int serialNo)
        {
            try
            {
                if (serialNo <= 0)
                {
                    return BadRequest("Invalid serial number.");
                }
                int rowsAffected = await _componentService.DeleteComponentAsync(serialNo);
                if (rowsAffected > 0)
                {
                    return Ok(rowsAffected);
                }
                else
                {
                    return NotFound("Component not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("UploadExcel")]
        public async Task<IActionResult> UploadExcel(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File is Empty");
            }
            try
            {
                var components = new List<Components>();
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    using (var package = new OfficeOpenXml.ExcelPackage(stream))
                    {
                        var worksheet = package.Workbook.Worksheets[0];
                        var rowCount = worksheet.Dimension.Rows;

                        for (int row = 2; row <= rowCount; row++) // Assuming the first row is the header
                        {
                            var component = new Components
                            {
                                ManufacturerPartNo = worksheet.Cells[row, 2].Value.ToString().Trim(),
                                ComponentType = worksheet.Cells[row, 3].Value.ToString().Trim(),
                                PackageSize = worksheet.Cells[row, 4].Value.ToString().Trim(),
                                QtyAvailable = int.Parse(worksheet.Cells[row, 5].Value.ToString().Trim()),
                                EntryDate = DateTime.Parse(worksheet.Cells[row, 6].Value.ToString().Trim()),
                                BinNo = worksheet.Cells[row, 7].Value.ToString().Trim(),
                                RackNo = worksheet.Cells[row, 8].Value.ToString().Trim(),
                                ProjectUsed = worksheet.Cells[row, 9].Value.ToString().Trim()
                            };

                            components.Add(component);
                        }
                    }
                }
                await _componentService.BulkInsertComponentsAsync(components);

                return Ok("Data in the File Uploaded Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
