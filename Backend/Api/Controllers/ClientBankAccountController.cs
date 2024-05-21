using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientBankAccountController : ControllerBase
    {
        private readonly IClientBankAccountService clientBankAccService;
        private readonly AppDbContext _context;

        public ClientBankAccountController(IClientBankAccountService clientBankAccService, AppDbContext _context)
        {
            this.clientBankAccService = clientBankAccService;
            this._context = _context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ClientBankAccountModel>>> GetAllClientBankAccountAsync(CancellationToken cancellationToken)
        {
            var clientAcc = await clientBankAccService.GetAllClientBankAccountAsync(cancellationToken);

            return Ok(clientAcc);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientAccountById([FromRoute]Guid id, CancellationToken cancellationToken)
        {
            await clientBankAccService.GetClientAccountById(id, cancellationToken);
            return Ok();
        }

		[HttpPost]
		public async Task<ActionResult<ClientBankAccountModel>> AddClientBankAccount([FromBody] ClientBankAccountModel model, CancellationToken cancellationToken)
		{
			var clientAcc = new ClientBankAccount()
			{
				ClientId = model.ClientId,
			    AccountId = model.AccountId,
				CurrentBalance = model.CurrentBalance,
				DateCreated = model.DateCreated,
				DateLastUpdated = model.DateLastUpdated
			};

			await _context.ClientBankAccounts.AddAsync(clientAcc);
			await _context.SaveChangesAsync(cancellationToken);

			return CreatedAtAction(nameof(GetClientAccountById), new { Id = model.Id }, model);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult> UpdateClientAcc([FromRoute] Guid id, [FromBody] ClientBankAccountModel model, CancellationToken cancellationToken)
		{
			var clientAcc = await _context.ClientBankAccounts
			   .Where(x => x.Id == id)
			   .FirstOrDefaultAsync(cancellationToken);

			if (clientAcc == null)
			{
				return NotFound();
			}

			clientAcc.ClientId = model.ClientId;
			clientAcc.AccountId = model.AccountId;
			clientAcc.CurrentBalance = model.CurrentBalance;
			clientAcc.DateCreated = model.DateCreated;
			clientAcc.DateLastUpdated = model.DateLastUpdated;


			await _context.SaveChangesAsync(cancellationToken);

			var updatedClient = new ClientBankAccountModel
			{
				ClientId = clientAcc.ClientId,
				AccountId = clientAcc.AccountId,
				CurrentBalance = clientAcc.CurrentBalance,
				DateCreated = clientAcc.DateCreated,
				DateLastUpdated = clientAcc.DateLastUpdated
			};
			return Ok(updatedClient);
		}

		[HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClientBankAccount(Guid id, CancellationToken cancellationToken)
        {
            await clientBankAccService.DeleteClientBankAccount(id, cancellationToken);
            return Ok();
        }




    }
}
