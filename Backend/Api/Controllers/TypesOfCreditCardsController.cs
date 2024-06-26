using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<TypesOfCreditCardsModel>>> GetAllTypesOfCreditCards(CancellationToken cancellationToken)
        {
            var type = await creditCardsService.GetAllTypesOfCreditCards(cancellationToken);
            return Ok(type);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTypesOfCreditCardsId(int id, CancellationToken cancellationToken)
        {
            var model = await creditCardsService.GetTypesOfCreditCardsById(id, cancellationToken);
            return Ok(model);
        }
        [Authorize(Roles = "Member,Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateCreditCards(TypesOfCreditCardsModel model, CancellationToken cancellationToken)
        {
            var updateType = await creditCardsService.CreateOrUpdateTypesOfCreditCards(model, cancellationToken);
            return Ok(updateType);
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetTypesOfCreditCardsSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await creditCardsService.GetTypesOfCreditCardsSelectListAsync(cancellationToken);
            return Ok(model);
        }

        [Authorize(Roles = "Member,Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTypesOfCreditCards(int id, CancellationToken cancellationToken)
        {
            await creditCardsService.DeleteTypesOfCreditCards(id, cancellationToken);
            return Ok();
        }
    }
}
