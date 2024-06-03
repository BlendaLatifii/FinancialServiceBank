using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
namespace Application.Services
{
    public class ClientService : IClientService
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ClientService(AppDbContext _context, IMapper _mapper)
        {
            this._context = _context;
            this._mapper = _mapper;
        }

        public async Task<List<ClientModel>> GetAllClientAsync(CancellationToken cancellationToken)
        {
            var clients = await _context.Clients.ToListAsync(cancellationToken);

            var clientModel = _mapper.Map<List<ClientModel>>(clients);
            return clientModel;


        }
        public async Task<ClientModel> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var client = await _context.Clients
               .Where(x => x.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
            if (client == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                await _context.SaveChangesAsync(cancellationToken);
                var model = _mapper.Map<ClientModel>(client);
                return model;
            }
        }

        public async Task<ClientModel> GetByPersonalNumberAsync(string personalNumber, CancellationToken cancellationToken)
        {
            var client = await _context.Clients
               .Where(x => x.PersonalNumberId == personalNumber)
                .FirstOrDefaultAsync(cancellationToken);
            if (client == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                await _context.SaveChangesAsync(cancellationToken);
                var model = _mapper.Map<ClientModel>(client);
                return model;
            }
        }
        public async Task<ClientModel> CreateOrUpdateClientAsync(ClientModel model, CancellationToken cancellationToken)
        {
            if (model.Id == null)
            {
                var newClient = new Client()
                {
                    PersonalNumberId = model.PersonalNumberId,
                    FirstName = model.FirstName,
                    MiddleName = model.MiddleName,
                    LastName = model.LastName,
                    PhoneNumber = model.PhoneNumber,
                    EmailAddress = model.EmailAddress,
                    State = model.State,
                    City = model.City,
                    ZipCode = model.ZipCode,
                };

                await _context.Clients.AddAsync(newClient, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return new ClientModel
                {
                    Id = newClient.Id,
                    PersonalNumberId = newClient.PersonalNumberId,
                    FirstName = newClient.FirstName,
                    MiddleName = newClient.MiddleName,
                    LastName = newClient.LastName,
                    PhoneNumber = newClient.PhoneNumber,
                    EmailAddress = newClient.EmailAddress,
                    State = newClient.State,
                    City = newClient.City,
                    ZipCode = newClient.ZipCode
                };
            }
            else
            {
                var existingClient = await _context.Clients.FindAsync(model.Id);
                if (existingClient == null)
                {
                    throw new AppBadDataException();
                }

                existingClient.PersonalNumberId = model.PersonalNumberId;
                existingClient.FirstName = model.FirstName;
                existingClient.MiddleName = model.MiddleName;
                existingClient.LastName = model.LastName;
                existingClient.PhoneNumber = model.PhoneNumber;
                existingClient.EmailAddress = model.EmailAddress;
                existingClient.State = model.State;
                existingClient.City = model.City;
                existingClient.ZipCode = model.ZipCode;

                await _context.SaveChangesAsync(cancellationToken);

                return new ClientModel
                {
                    Id = existingClient.Id,
                    PersonalNumberId = existingClient.PersonalNumberId,
                    FirstName = existingClient.FirstName,
                    MiddleName = existingClient.MiddleName,
                    LastName = existingClient.LastName,
                    PhoneNumber = existingClient.PhoneNumber,
                    EmailAddress = existingClient.EmailAddress,
                    State = existingClient.State,
                    City = existingClient.City,
                    ZipCode = existingClient.ZipCode
                };
            }
        }
        public async Task DeleteClient(Guid id, CancellationToken cancellationToken)
        {
            var client = await _context.Clients
                 .Where(x => x.Id == id)
                 .FirstOrDefaultAsync(cancellationToken);

            if (client == null) throw new ApplicationException("Client does not exist!");

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
        }

    }
}
