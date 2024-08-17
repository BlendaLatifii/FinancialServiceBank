using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using FluentValidation.Validators;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreditCardsController : ControllerBase
    {
        private readonly ICreditCardsService creditCardsService;

        public CreditCardsController(ICreditCardsService creditCardsService)
        {
            this.creditCardsService = creditCardsService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<CreditCardsModel>>> GetAllCreditCards(CancellationToken cancellationToken)
        {
            var type = await creditCardsService.GetAllCreditCards(cancellationToken);
            return Ok(type);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCreditCardsId(Guid id, CancellationToken cancellationToken)
        {
            var model = await creditCardsService.GetCreditCardsById(id, cancellationToken);
            return Ok(model);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetCreditCardsCount(CancellationToken cancellationToken)
        {
            var count = await creditCardsService.GetCreditCardsCount(cancellationToken);
            return Ok(count);
        }

        [HttpGet("accountNumber/{accountNumber}")]
        public async Task<IActionResult> GetByAccountNumberAsync(string accountNumber, CancellationToken cancellationToken)
        {
            var model = await creditCardsService.GetByAccountNumberAsync(accountNumber, cancellationToken);
            return Ok(model);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateCreditCards(CreditCardsModel model, CancellationToken cancellationToken)
        {
            var updateType = await creditCardsService.CreateOrUpdateCreditCards(model, cancellationToken);
            return Ok(updateType);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCreditCards(Guid id, CancellationToken cancellationToken)
        {
            await creditCardsService.DeleteCreditCards(id, cancellationToken);
            return Ok();
        }
    }
}