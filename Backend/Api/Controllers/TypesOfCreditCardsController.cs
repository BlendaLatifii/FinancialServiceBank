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
	public class TypesOfCreditCardsController : ControllerBase
	{
		private readonly ITypesOfCreditCardsService creditCardsService;
		private readonly AppDbContext appDbContext;

		public TypesOfCreditCardsController(ITypesOfCreditCardsService creditCardsService, AppDbContext appDbContext)
		{
			this.creditCardsService = creditCardsService;
			this.appDbContext = appDbContext;
		}
		[HttpGet]
		public async Task<ActionResult<List<TypesOfCreditCardsModel>>> GetAllTypesOfCreditCards(CancellationToken cancellationToken)
		{
			var type = await creditCardsService.GetAllTypesOfCreditCards(cancellationToken);
			return Ok(type);
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> GetTypesOfCreditCardsId(Guid id, CancellationToken cancellationToken)
		{
			var model = await creditCardsService.GetTypesOfCreditCardsById(id, cancellationToken);
			return Ok(model);
		}
		[HttpPost]
		public async Task<IActionResult> CreateOrUpdateCreditCards(TypesOfCreditCardsModel model, CancellationToken cancellationToken)
		{
			var updateType = await creditCardsService.CreateOrUpdateTypesOfCreditCards(model, cancellationToken);
			return Ok(updateType);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTypesOfCreditCards(Guid id, CancellationToken cancellationToken)
		{
			await creditCardsService.DeleteTypesOfCreditCards(id, cancellationToken);
			return Ok();
		}
	}
}
