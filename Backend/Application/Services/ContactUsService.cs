using AutoMapper;
using Domain.Exceptions;
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
    public class ContactUsService:IContactService
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public ContactUsService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this._mapper = mapper;
        }

        public async Task<List<ContactUsModel>> GetAllContactsAsync(CancellationToken cancellationToken)
        {
            var contacts = await _context.Contacts.ToListAsync(cancellationToken);

            var model = _mapper.Map<List<ContactUsModel>>(contacts);
            return model;

        }

        public async Task<ContactUsModel> GetContactById(int contactId, CancellationToken cancellationToken)
        {
            var contact = await _context.Contacts
                .Where(x => x.Id == contactId)
                .FirstOrDefaultAsync(cancellationToken);
            if (contact is null)
            {
                throw new AppBadDataException();
            }

            var model = _mapper.Map<ContactUsModel>(contact);

            return model;

        }

        public async Task DeleteContact(int Id, CancellationToken cancellationToken)
        {
            var contact = await _context.Contacts
                 .Where(x => x.Id == Id)
                 .FirstOrDefaultAsync(cancellationToken);

            if (contact != null)
            {
                _context.Contacts.Remove(contact);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
