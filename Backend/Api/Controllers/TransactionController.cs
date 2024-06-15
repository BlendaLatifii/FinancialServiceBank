using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService transactionService;
        public TransactionController(ITransactionService transactionService)
        {
            this.transactionService = transactionService;

        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<TransactionModel>>> GetAllTransactionsAsync(CancellationToken cancellationToken)
        {
            var transactions = await transactionService.GetAllTransactionsAsync(cancellationToken);

            return Ok(transactions);
        }
        [HttpGet("type_percentages")]
        public async Task<ActionResult<List<TransactionTypePercentageModel>>> GetTransactionTypePercentages(CancellationToken cancellationToken)
        {
           
             var percentages = await transactionService.GetTransactionTypePercentagesAsync(cancellationToken);
                return Ok(percentages);
            
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateOrEditTransaction([FromBody] TransactionModel model, CancellationToken cancellationToken)
        {
            var transaction = await transactionService.CreateOrEditTransaction(model, cancellationToken);
            return Ok(transaction);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionById([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var model = await transactionService.GetTransactionById(id, cancellationToken);
            return Ok(model);
        }

        [HttpGet("accountNumber/{accountNumber}")]
        public async Task<IActionResult> GetByAccountNumberAsync(string accountNumber, CancellationToken cancellationToken)
        {
            var model = await transactionService.GetByAccountNumberAsync(accountNumber, cancellationToken);
            return Ok(model);
        } 

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(Guid id, CancellationToken cancellationToken)
        {
            await transactionService.DeleteTransaction(id, cancellationToken);
            return Ok();
        }
    }
}