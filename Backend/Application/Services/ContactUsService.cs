using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class ContactUsService:IContactService
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAuthorizationManager _authorizationManager;
        public ContactUsService(AppDbContext context, IMapper mapper, IAuthorizationManager authorizationManager)
        {
            _context = context;
            this._mapper = mapper;
            _authorizationManager = authorizationManager;
        }

        public async Task<List<ContactUsModel>> GetAllContactsAsync(CancellationToken cancellationToken)
        {
            var contacts = await _context.Contacts.Include(x => x.User).ToListAsync(cancellationToken);

            var model = _mapper.Map<List<ContactUsModel>>(contacts);
            return model;

        }

        public async Task<ContactUsModel> GetContactById(int contactId, CancellationToken cancellationToken)
        {
            var contact = await _context.Contacts
                .Where(x => x.Id == contactId)
                .Include(x => x.User)
                .FirstOrDefaultAsync(cancellationToken);
            if (contact is null)
            {
                throw new AppBadDataException();
            }

            var model = _mapper.Map<ContactUsModel>(contact);

            return model;

        }
        public async Task<ContactUsModel> AddContact(ContactUsModel model, CancellationToken cancellationToken)
        {
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }

            var contact = new ContactUs();

            contact.Name = model.Name;
            contact.Email = model.Email;
            contact.Subject = model.Subject;
            contact.Message = model.Message;
            contact.UserId = (Guid)userId;


            await _context.Contacts.AddAsync(contact);
            await _context.SaveChangesAsync(cancellationToken);
            return await GetContactById(contact.Id, cancellationToken);
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
