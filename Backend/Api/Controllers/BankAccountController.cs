using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankAccountController : ControllerBase
    {
        private readonly IBankAccountService bankAccountService;

        public BankAccountController(IBankAccountService bankAccountService)
        {
            this.bankAccountService = bankAccountService;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<BankAccountModel>>> GetAllBankAccountsAsync(CancellationToken cancellationToken)
        {
            var acc = await bankAccountService.GetAllBankAccountsAsync(cancellationToken);
            return Ok(acc);
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBankAccountById(Guid id, CancellationToken cancellationToken)
        {
            var model = await bankAccountService.GetBankAccountById(id, cancellationToken);
            return Ok(model);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateBankAccountAsync(BankAccountModel model, CancellationToken cancellationToken)
        {
            var updateBankAcc = await bankAccountService.CreateOrUpdateBankAccount(model, cancellationToken);
            return Ok(updateBankAcc);
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetBankAccountSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await bankAccountService.GetBankAccountsSelectListAsync(cancellationToken);
            return Ok(model);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id, CancellationToken cancellationToken)
        {
            await bankAccountService.DeleteAccount(id, cancellationToken);
            return Ok();
        }
    }
}