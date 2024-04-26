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
		[HttpGet]
		[Route("{id}")]
		public async Task<IActionResult> GetBankAccountById(string AccountTypeID , CancellationToken cancellationToken)
        {
				await bankAccountService.GetBankAccountById(AccountTypeID, cancellationToken);
				return Ok();
		}
        
		[HttpPost]
        public async Task<ActionResult<BankAccountModel>> CreateBankAccount([FromBody] BankAccountModel model, CancellationToken cancellationToken)
        {
            var acc = new BankAccount()
            {
                AccountDescription = model.AccountDescription
            };

            await appDbContext.BankAccounts.AddAsync(acc);
            await appDbContext.SaveChangesAsync(cancellationToken);

            return CreatedAtAction(nameof(GetBankAccountById), new { AccountTypeID = model.AccountTypeID });
        }

        [HttpPut]
		[Route("{id}")]

		public async Task<BankAccount> UpdateBankAccount([FromRoute]string accountTypeID, BankAccountModel model, CancellationToken cancellationToken)
        {
            var acc = await appDbContext.BankAccounts.FindAsync(accountTypeID);
            if (acc == null)
            {
                throw new ArgumentException("Bank account not found.");
            }

            acc.AccountDescription = model.AccountDescription;
            acc.AccountTypeID = accountTypeID;

            await appDbContext.SaveChangesAsync();

            return acc;
        }
        [HttpDelete("{id}")]
		public async Task<IActionResult> DeleteAccount(string accountTypeID, CancellationToken cancellationToken)
        {
            await bankAccountService.DeleteAccount(accountTypeID, cancellationToken);
            return Ok();
        }
    }
}