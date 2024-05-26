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

		[HttpGet]
		public async Task<ActionResult<List<ClientModel>>> GetAllClientAsync(CancellationToken cancellationToken)
		{
			var users = await clientService.GetAllClientAsync(cancellationToken);

			return Ok(users);
		}

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientById([FromRoute]Guid id, CancellationToken cancellationToken)
		{
            var model = await clientService.GetByIdAsync(id, cancellationToken);
			return Ok(model);
		}

		[HttpPost]
        public async Task<IActionResult> CreateOrUpdateClientAsync(ClientModel model, CancellationToken cancellationToken)
        {
            var client = await clientService.CreateOrUpdateClientAsync(model, cancellationToken);
            return Ok(client);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClient(Guid id, CancellationToken cancellationToken)
        {
            await clientService.DeleteClient(id, cancellationToken);
            return Ok();
        }
    }
}