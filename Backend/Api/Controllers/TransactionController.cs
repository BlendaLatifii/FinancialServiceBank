using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
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
        [HttpGet]
        public async Task<ActionResult<List<TransactionModel>>> GetAllTransactionsAsync(CancellationToken cancellationToken)
        {
            var transactions = await transactionService.GetAllTransactionsAsync(cancellationToken);

            return Ok(transactions);
        }
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(Guid id, CancellationToken cancellationToken)
        {
            await transactionService.DeleteTransaction(id, cancellationToken);
            return Ok();
        }
    }
}