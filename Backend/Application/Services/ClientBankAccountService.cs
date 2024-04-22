using AutoMapper;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class ClientBankAccountService : IClientBankAccountService

    { 
        public readonly AppDbContext _context;
        private readonly IMapper mapper;

        public ClientBankAccountService(AppDbContext _context, IMapper mapper)
        {
            this._context = _context;
            this.mapper = mapper;
        }

        public async Task<List<ClientBankAccountModel>> GetAllClientBankAccountAsync(CancellationToken cancellationToken)
        {
            var clientAcc = await _context.ClientBankAccounts.ToListAsync(cancellationToken);

            var clientAccmodel = mapper.Map<List<ClientBankAccountModel>>(clientAcc);
            return clientAccmodel;
        }
        public async Task GetClientAccountById(string AccountNumberGeneratedID, CancellationToken cancellationToken)
        {
            var clientAcc = await _context.ClientBankAccounts
                .Where(x => x.AccountNumberGeneratedID == AccountNumberGeneratedID)
                .FirstOrDefaultAsync(cancellationToken);
            if (clientAcc != null)
            {
                await _context.SaveChangesAsync(cancellationToken);
            }


        }
        public async Task DeleteClientBankAccount(string AccountNumberGeneratedID, CancellationToken cancellationToken)
        {
            var clientAcc = await _context.ClientBankAccounts
                 .Where(x => x.AccountNumberGeneratedID == AccountNumberGeneratedID)
                 .FirstOrDefaultAsync(cancellationToken);

            if (clientAcc != null)
            {
                _context.ClientBankAccounts.Remove(clientAcc);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }



    }
}
