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
		/*[HttpGet]
         public async Task<ActionResult<List<BankAccount>>> GetAllAsync(CancellationToken cancellationToken)
        {
            var acc = await bankingAccService.GetAllAsync(cancellationToken);
            return Ok(acc);
        }
        public async Task<IActionResult<BankAccount>> GetByIdAsync(int id , CancellationToken cancellationToken)
        {
           await bankingAccountService.GetByIdAsync(id , cancellationToken);
            return Ok();
        }
        */
		[HttpPost]
		public async Task<ActionResult<BankAccountModel>> CreateBankAccount([FromBody] BankAccountModel model, CancellationToken cancellationToken)
		{
			var bankAcc = new BankAccount()
            {
                AccountType = model.AccountType,
                AccountDescription = model.AccountDescription,
                CurrentBalance = model.CurrentBalance,
                Email = model.Email,
                DateCreated = model.DateCreated
			};

			await appDbContext.BankAccounts.AddAsync(bankAcc, cancellationToken);
			await appDbContext.SaveChangesAsync(cancellationToken);

			return CreatedAtAction(nameof(GetByAccountNumber), new { bankAccountNumber = model.AccountNumberGenerated }, model);
		}


		[HttpGet("{bankAccountNumber}")]
		public async Task<IActionResult> GetByAccountNumber(string bankAccountNumber, CancellationToken cancellationToken)
		{
			var account = await bankAccountService.GetByAccountNumber(bankAccountNumber, cancellationToken);

			if (account == null)
			{
				return NotFound();
			}

			return Ok(account);
		}

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBankAccount([FromRoute] int id, [FromBody] BankAccountModel model, CancellationToken cancellationToken)
        {
			var acc = await appDbContext.BankAccounts
               .Where(x => x.ID == id)
               .FirstOrDefaultAsync(cancellationToken);

            if (acc == null)
            {
                return NotFound();
            }

            acc.AccountType= model.AccountType ;
            acc.AccountDescription=model.AccountDescription;

            await appDbContext.SaveChangesAsync(cancellationToken);

            var updatedAcc = new BankAccountModel
            {
                ID=acc.ID,
                AccountType=acc.AccountType ,
                AccountDescription=acc.AccountDescription
            };
            return Ok(updatedAcc);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id, CancellationToken cancellationToken)
        {
            await bankAccountService.DeleteAccount(id, cancellationToken);
            return Ok();
        }
    }
}