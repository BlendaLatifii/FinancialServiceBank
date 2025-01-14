﻿using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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

        [Authorize(Roles = "Admin")]
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
            var addContact = await _contactService.AddContact(model, cancellationToken);
            return Ok(addContact);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id ,CancellationToken cancellationToken)
        {
            await _contactService.DeleteContact(id, cancellationToken);
            return Ok();
        }
    }
}
