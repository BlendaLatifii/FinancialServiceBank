using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
		public async Task GetByIdAsync(int ClientID, CancellationToken cancellationToken)
		{
			var client = await _context.Clients
			   .Where(x => x.PersonalNumberID == ClientID)
				.FirstOrDefaultAsync(cancellationToken);
			if (client != null)
			{
				await _context.SaveChangesAsync(cancellationToken);
			}
		}
		public async Task DeleteClient(int ClientID, CancellationToken cancellationToken)
		{
			var client = await _context.Clients
				 .Where(x => x.PersonalNumberID == ClientID)
				 .FirstOrDefaultAsync(cancellationToken);

			if (client == null)	throw new ApplicationException("Client does not exist!");

			_context.Clients.Remove(client);
			await _context.SaveChangesAsync();
		}

    }
}
