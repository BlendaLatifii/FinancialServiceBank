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


		//[HttpGet("{bankAccountNumber}")]
		//public async Task<IActionResult> GetByAccountNumber(string bankAccountNumber, CancellationToken cancellationToken)
		//{
		//	var account = await bankAccountService.GetByAccountNumber(bankAccountNumber, cancellationToken);

		//	if (account == null)
		//	{
		//		return NotFound();
		//	}

		//	return Ok(account);
		//}

        [HttpPut("{accountTypeID}")]
        //     public async Task<IActionResult> UpdateBankAccount([FromRoute] int id, [FromBody] BankAccountModel model, CancellationToken cancellationToken)
        //     {
        //var acc = await appDbContext.BankAccounts
        //            .Where(x => x.ID == id)
        //            .FirstOrDefaultAsync(cancellationToken);

        //         if (acc == null)
        //         {
        //             return NotFound();
        //         }

        //         acc.AccountType= model.AccountType ;
        //         acc.AccountDescription=model.AccountDescription;

        //         await appDbContext.SaveChangesAsync(cancellationToken);

        //         var updatedAcc = new BankAccountModel
        //         {
        //             ID=acc.ID,
        //             AccountType=acc.AccountType ,
        //             AccountDescription=acc.AccountDescription
        //         };
        //         return Ok(updatedAcc);
        //     }

        public async Task<BankAccount> UpdateBankAccount(string accountTypeID, BankAccountModel model, CancellationToken cancellationToken)
        {
            var acc = await appDbContext.BankAccounts.FindAsync(accountTypeID);
            if (acc == null)
            {
                throw new ArgumentException("Bank account not found.");
            }

            acc.AccountDescription = model.AccountDescription;
            acc.AccountTypeID = accountTypeID; // update the accountTypeID as well

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