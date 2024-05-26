using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using FluentValidation.Validators;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CreditCardsController : ControllerBase
	{
		private readonly ICreditCardsService creditCardsService;
		private readonly AppDbContext appDbContext;

		public CreditCardsController(ICreditCardsService creditCardsService, AppDbContext appDbContext)
		{
			this.creditCardsService = creditCardsService;
			this.appDbContext = appDbContext;
		}
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
		[HttpPost]
		public async Task<IActionResult> CreateOrUpdateCreditCards(CreditCardsModel model, CancellationToken cancellationToken)
		{
			var updateType = await creditCardsService.CreateOrUpdateCreditCards(model, cancellationToken);
			return Ok(updateType);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCreditCards(Guid id, CancellationToken cancellationToken)
		{
			await creditCardsService.DeleteCreditCards(id, cancellationToken);
			return Ok();
		}
	}
}
