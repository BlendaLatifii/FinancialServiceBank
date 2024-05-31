using Domain.Entities;
using Domain.Models;

namespace Domain.Interfaces
{
    public interface ILoansTypeService
    {
        Task<List<LoansTypeModel>> GetAllLoansTypesAsync(CancellationToken cancellationToken);
        Task<LoansTypeModel> CreateOrUpdateLoansType(LoansTypeModel model, CancellationToken cancellationToken);
        Task<LoansTypeModel> GetLoansTypeById(Guid id, CancellationToken cancellationToken);
        Task<List<ListItemModel>> GetTypesOfLoansSelectListAsync(CancellationToken cancellationToken);
        Task DeleteLoansType(Guid id, CancellationToken cancellationToken);
    }
}

