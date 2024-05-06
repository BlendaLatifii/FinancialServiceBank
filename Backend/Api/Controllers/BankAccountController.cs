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
    public class BankAccountController : ControllerBase
    {
        private readonly IBankAccountService bankAccountService;
        private readonly AppDbContext appDbContext;

        public BankAccountController(IBankAccountService bankAccountService, AppDbContext appDbContext){
            this.bankAccountService = bankAccountService;
            this.appDbContext = appDbContext;
        }
		[HttpGet]
		public async Task<ActionResult<List<BankAccountModel>>> GetAllBankAccountsAsync(CancellationToken cancellationToken)
        {
            var acc = await bankAccountService.GetAllBankAccountsAsync(cancellationToken);
            return Ok(acc);
        }
		[HttpGet("{id}")]
		public async Task<IActionResult> GetBankAccountById(Guid id, CancellationToken cancellationToken)
        {
            var model=await bankAccountService.GetBankAccountById(id, cancellationToken);
				return Ok(model);
		}
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateBankAccountAsync(BankAccountModel model, CancellationToken cancellationToken)
        {
            var updateBankAcc = await bankAccountService.CreateOrUpdateBankAccount(model, cancellationToken);
            return Ok(updateBankAcc);
        }

        [HttpDelete("{id}")]
		public async Task<IActionResult> DeleteAccount(Guid id, CancellationToken cancellationToken)
        {
            await bankAccountService.DeleteAccount(id, cancellationToken);
            return Ok();
        }
    }
}