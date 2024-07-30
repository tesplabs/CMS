using System.Collections.Generic;
using System.Threading.Tasks;
using ComponentManagementSystem.Controllers;
using ComponentManagementSystem.models;

namespace ComponentManagementSystem.Services
{
    public interface IComponentServices
    {
        Task<List<Components>> GetComponentsAsync();
        Task<int> AddComponentAsync(Components component);
        Task<int> UpdateComponentAsync(Components component);
        Task<int> DeleteComponentAsync(int serialNo);
        Task BulkInsertComponentsAsync(List<Components> component);
    }
}
