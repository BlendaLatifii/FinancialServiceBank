using Domain.Interfaces;
using Infrastructure.Data;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserProfileController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IAuthorizationManager _authorizationManager;


        public UserProfileController(AppDbContext _context, IAuthorizationManager authorizationManager)
        {
            this._context = _context;
            _authorizationManager = authorizationManager;
        }
        [Authorize]
        [HttpGet("User")]
        public async Task<IActionResult> GetUsers()
        {
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                return Unauthorized("User is not authenticated.");
            }

            var users = await _context.Users
                .Where(c => c.Id == userId)
                .ToListAsync();

            if (users == null || !users.Any())
            {
                return NotFound("No bank accounts found for the user.");
            }

            return Ok(users);
        }
        [Authorize]
        [HttpGet("ClientBankAccount")]
        public async Task<IActionResult> GetClientBankAccounts()
        {
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                return Unauthorized("User is not authenticated.");
            }

            var clientBankAccounts = await _context.ClientBankAccounts
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return Ok(clientBankAccounts);
        }
        [Authorize]
        [HttpGet("CreditCards")]
        public async Task<IActionResult> GetCreditCards()
        {
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                return Unauthorized("User is not authenticated.");
            }

            var clientBankAccountIds = await _context.ClientBankAccounts
                .Where(x => x.UserId == userId)
                .Select(x => x.Id)
                .ToListAsync();

            var creditCards = await _context.CreditCards
                .Where(c => clientBankAccountIds.Contains(c.ClientBankAccountId))
                .ToListAsync();
            return Ok(creditCards);
        }
        [Authorize]
        [HttpGet("Transactions")]
        public async Task<IActionResult> GetTransactions()
        {
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                return Unauthorized("User is not authenticated.");
            }

            var clientBankAccountIds = await _context.ClientBankAccounts
                .Where(x => x.UserId == userId)
                .Select(x => x.Id)
                .ToListAsync();

            var transactions = await _context.Transactions
           .Where(t => clientBankAccountIds.Contains(t.SourceClientBankAccountId.Value) ||
                 clientBankAccountIds.Contains(t.DestinationClientBankAccountId.Value))
          .ToListAsync();
            return Ok(transactions);
        }

        [Authorize]
        [HttpGet("Loans")]
        public async Task<IActionResult> GetLoans()
        {
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                return Unauthorized("User is not authenticated.");
            }

            var clientBankAccountIds = await _context.ClientBankAccounts
                .Where(x => x.UserId == userId)
                .Select(x => x.Id)
                .ToListAsync();

            var loans = await _context.Loans
              .Where(c => clientBankAccountIds.Contains(c.ClientBankAccountId))
                .ToListAsync();

            return Ok(loans);
        }
    }
}
