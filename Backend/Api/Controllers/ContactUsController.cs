using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        private readonly AppDbContext appDbContext;
        private readonly IContactService _contactService;

        public ContactUsController(AppDbContext appDbContext, IContactService _contactService)
        {
            this.appDbContext = appDbContext;
            this._contactService = _contactService;
        }
        [HttpGet]
        public async Task<ActionResult<List<ContactUsModel>>> GetAllContacts(CancellationToken cancellationToken)
        {
            var contacts = await _contactService.GetAllContactsAsync(cancellationToken);

            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContactById([FromRoute] int id, CancellationToken cancellationToken)
        {
            var model = await _contactService.GetContactById(id, cancellationToken);
            return Ok(model);
        }
        [HttpPost]
        public async Task<ActionResult<ContactUsModel>> AddContact([FromBody] ContactUsModel model, CancellationToken cancellationToken)
        {
            var contact = new ContactUs()
            {
                Name = model.Name,
                Email = model.Email,
                Subject = model.Subject,
                Message = model.Message
            };

            await appDbContext.Contacts.AddAsync(contact);
            await appDbContext.SaveChangesAsync(cancellationToken);

            return CreatedAtAction(nameof(GetContactById), new { Id = contact.Id } , contact);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id ,CancellationToken cancellationToken)
        {
            await _contactService.DeleteContact(id, cancellationToken);
            return Ok();
        }
    }
}
