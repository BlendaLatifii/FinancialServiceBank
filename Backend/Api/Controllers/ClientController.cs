using Application.Services;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService clientService;

        public ClientController(IClientService clientService)
        {
            this.clientService = clientService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<ClientModel>>> GetAllClientAsync(CancellationToken cancellationToken)
        {
            var users = await clientService.GetAllClientAsync(cancellationToken);

            return Ok(users);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientById([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var model = await clientService.GetByIdAsync(id, cancellationToken);
            return Ok(model);
        }

        [HttpGet("personalNumber/{personalNumber}")]
        public async Task<IActionResult> GetClientByPersonalNumber([FromRoute] string personalNumber, CancellationToken cancellationToken)
        {
            var model = await clientService.GetByPersonalNumberAsync(personalNumber, cancellationToken);
            return Ok(model);
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateClientAsync(ClientModel model, CancellationToken cancellationToken)
        {
            var client = await clientService.CreateOrUpdateClientAsync(model, cancellationToken);
            return Ok(client);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClient(Guid id, CancellationToken cancellationToken)
        {
            await clientService.DeleteClient(id, cancellationToken);
            return Ok();
        }
    }
}