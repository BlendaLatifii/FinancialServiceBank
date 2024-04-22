using Application.Services;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService clientService;
        private readonly AppDbContext _context;

        public ClientController(IClientService clientService, AppDbContext _context)
        {
            this.clientService = clientService;
            this._context = _context;
        }

		public async Task<ActionResult<List<ClientModel>>> GetAllClient(CancellationToken cancellationToken)
		{
			var users = await clientService.GetAllClientAsync(cancellationToken);

			return Ok(users);
		}
		//[HttpGet]
		//[Route("{personalNumber}")]
		//public async Task<IActionResult> GetClientByPersonalNumber(int personalNumber, CancellationToken cancellationToken)
  //      {
		//	var client = clientService.GetClientByPersonalNumber(personalNumber, cancellationToken);
		//	if (client == null)
		//	{
		//		return NotFound();
		//	}
		//	return Ok(client);
		//}


		[HttpGet]
		[Route("{id}")]
		public async Task<IActionResult> GetClientById(int personalNumber, CancellationToken cancellationToken)
		{
			await clientService.GetByIdAsync(personalNumber, cancellationToken);
			return Ok();
		}

		[HttpPost]
        public async Task<ActionResult<ClientModel>> AddClient([FromBody] ClientModel model, CancellationToken cancellationToken)
        {
			var client = new Client()
			{
				ClientAddress = model.ClientAddress,
				ClientFirstName = model.ClientFirstName,
				ClientMiddleName = model.ClientMiddleName,
				ClientLastName = model.ClientLastName,
				City = model.City,
				State = model.State,
				ZipCode = model.ZipCode,
				EmailAddress = model.EmailAddress,
				PhoneNumber = model.PhoneNumber
			};

			await _context.Clients.AddAsync(client);
			await _context.SaveChangesAsync(cancellationToken);

			return CreatedAtAction(nameof(GetClientById), new { personalNumber = model.PersonalNumberID }, model);
		}

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateClient([FromRoute] int personalNumber, [FromBody] ClientModel model, CancellationToken cancellationToken)
        {
			var client = await _context.Clients
			   .Where(x => x.PersonalNumberID == personalNumber)
			   .FirstOrDefaultAsync(cancellationToken);

			if (client == null)
			{
				return NotFound();
			}

			client.ClientFirstName = model.ClientFirstName;
			client.ClientMiddleName = model.ClientMiddleName;
			client.ClientLastName = model.ClientLastName;
			client.ClientAddress = model.ClientAddress;
			client.City = model.City;
			client.State = model.State;
			client.ZipCode = model.ZipCode;
			client.EmailAddress = model.EmailAddress;
			client.PhoneNumber = model.PhoneNumber;
		    

			await _context.SaveChangesAsync(cancellationToken);

			var updatedClient = new ClientModel
			{
				ClientFirstName = client.ClientFirstName,
				ClientMiddleName = client.ClientMiddleName,
				ClientLastName = client.ClientLastName,
                ClientAddress = client.ClientAddress,
				City = client.City,
				State=client.State,
				ZipCode=client.ZipCode,
				EmailAddress=client.EmailAddress,
				PhoneNumber=client.PhoneNumber
			};
			return Ok(updatedClient);
		}

		[HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClient(int personalNumber , CancellationToken cancellationToken)
        {
            await clientService.DeleteClient(personalNumber, cancellationToken);
            return Ok();
        }
    }
}