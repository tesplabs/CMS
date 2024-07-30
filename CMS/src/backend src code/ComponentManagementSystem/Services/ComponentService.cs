using ComponentManagementSystem.models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.ComponentModel;

namespace ComponentManagementSystem.Services
{
    public class ComponentService : IComponentServices
    {
        private readonly IConfiguration _configuration;

        public ComponentService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<List<Components>> GetComponentsAsync()
        {
            var components = new List<Components>();
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ComponentAppCon")))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("GetComponents", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var component = new Components
                            {
                                SerialNo = reader.GetInt32(0),
                                ManufacturerPartNo = reader.GetString(1),
                                ComponentType = reader.GetString(2),
                                PackageSize = reader.GetString(3),
                                QtyAvailable = reader.GetInt32(4),
                                EntryDate = reader.GetDateTime(5),
                                BinNo = reader.GetString(6),
                                RackNo = reader.GetString(7),
                                ProjectUsed = reader.GetString(8)
                            };
                            components.Add(component);
                        }
                    }
                }
            }
            return components;
        }
        public async Task<int> AddComponentAsync(Components component)
        {
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ComponentAppCon")))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("Addcomponents", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@SerialNo", component.SerialNo);
                    command.Parameters.AddWithValue("@ManufacturerPartNo", component.ManufacturerPartNo);
                    command.Parameters.AddWithValue("@ComponentType", component.ComponentType);
                    command.Parameters.AddWithValue("@PackageSize", component.PackageSize);
                    command.Parameters.AddWithValue("@QtyAvailable", component.QtyAvailable);
                    command.Parameters.AddWithValue("@EntryDate", component.EntryDate);
                    command.Parameters.AddWithValue("@BinNo", component.BinNo);
                    command.Parameters.AddWithValue("@RackNo", component.RackNo);
                    command.Parameters.AddWithValue("@ProjectUsed", component.ProjectUsed);

                    var result = await command.ExecuteScalarAsync();
                    int rowsAffected = Convert.ToInt32(result);
                    return rowsAffected;
                }
            }
        }
        public async Task<int> UpdateComponentAsync(Components component)
        {
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ComponentAppCon")))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("UpdateComponents", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@SerialNo", component.SerialNo);
                    command.Parameters.AddWithValue("@ManufacturerPartNo", component.ManufacturerPartNo);
                    command.Parameters.AddWithValue("@ComponentType", component.ComponentType);
                    command.Parameters.AddWithValue("@PackageSize", component.PackageSize);
                    command.Parameters.AddWithValue("@QtyAvailable", component.QtyAvailable);
                    command.Parameters.AddWithValue("@EntryDate", component.EntryDate);
                    command.Parameters.AddWithValue("@BinNo", component.BinNo);
                    command.Parameters.AddWithValue("@RackNo", component.RackNo);
                    command.Parameters.AddWithValue("@ProjectUsed", component.ProjectUsed);

                    var result = await command.ExecuteScalarAsync();
                    int rowsAffected = Convert.ToInt32(result);
                    return rowsAffected;
                }
            }
        }
        public async Task<int> DeleteComponentAsync(int serialNo)
        {
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ComponentAppCon")))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("DeleteComponent", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@SerialNo", serialNo);

                    var result = await command.ExecuteScalarAsync();
                    int rowsAffected = Convert.ToInt32(result);
                    return rowsAffected;
                }
            }
        }
        public async Task BulkInsertComponentsAsync(List<Components> components)
        {
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ComponentAppCon")))
            {
                await connection.OpenAsync();
                using (SqlTransaction transaction = connection.BeginTransaction())
                {
                    try
                    {
                        foreach (var component in components)
                        {
                            using (SqlCommand command = new SqlCommand("AddComponents", connection, transaction))
                            {
                                command.CommandType = CommandType.StoredProcedure;
                                command.Parameters.AddWithValue("@SerialNo", component.SerialNo);
                                command.Parameters.AddWithValue("@ManufacturerPartNo", component.ManufacturerPartNo);
                                command.Parameters.AddWithValue("@ComponentType", component.ComponentType);
                                command.Parameters.AddWithValue("@PackageSize", component.PackageSize);
                                command.Parameters.AddWithValue("@QtyAvailable", component.QtyAvailable);
                                command.Parameters.AddWithValue("@EntryDate", component.EntryDate);
                                command.Parameters.AddWithValue("@BinNo", component.BinNo);
                                command.Parameters.AddWithValue("@RackNo", component.RackNo);
                                command.Parameters.AddWithValue("@ProjectUsed", component.ProjectUsed);

                                await command.ExecuteNonQueryAsync();
                            }
                        }
                        transaction.Commit();
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }
    }
}
