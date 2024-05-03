using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IContactService
    {
        Task<ContactUsModel> GetContactById(int Id, CancellationToken cancellationToken);
        Task<List<ContactUsModel>> GetAllContactsAsync(CancellationToken cancellationToken);
        Task DeleteContact(int Id, CancellationToken cancellationToken);
    }
}
