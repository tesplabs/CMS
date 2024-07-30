using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;

namespace ComponentManagementSystem.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
        }
        private readonly IConfiguration _configuration;
        public LoginController(IConfiguration configuration) { _configuration = configuration; }
       
        [HttpPost]
        public IActionResult Login([FromBody] Login login)
        {


            using SqlConnection connection = new(_configuration.GetConnectionString("ComponentAppCon"));
            connection.Open();
            using SqlCommand command = new("[dbo].[ValidateUser]", connection);


            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@Username", login.Username);
            command.Parameters.AddWithValue("@Password", login.Password);


            SqlParameter ErrorMessage = new("ErrorMessage", SqlDbType.NVarChar, 255)
            {
                Direction = ParameterDirection.Output
            };
            command.Parameters.Add(ErrorMessage);
            SqlDataReader reader = command.ExecuteReader();


            if (reader.HasRows)
            {


                return Ok();
            }
            else
            {


                return Unauthorized();
            }
        }
        }
    public class Login
    {


        public string? Username { get; set; }
        public string? Password { get; set; }

    }
}