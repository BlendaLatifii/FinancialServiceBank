using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoansTypeController : ControllerBase
    {
        private readonly ILoansTypeService loansTypeService;

        public LoansTypeController(ILoansTypeService loansTypeService)
        {
            this.loansTypeService = loansTypeService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<LoansTypeModel>>> GetAllLoansTypesAsync(CancellationToken cancellationToken)
        {
            var acc = await loansTypeService.GetAllLoansTypesAsync(cancellationToken);
            return Ok(acc);
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLoansTypeById(Guid id, CancellationToken cancellationToken)
        {
            var model = await loansTypeService.GetLoansTypeById(id, cancellationToken);
            return Ok(model);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateLoansTypeAsync(LoansTypeModel model, CancellationToken cancellationToken)
        {
            var updateloans = await loansTypeService.CreateOrUpdateLoansType(model, cancellationToken);
            return Ok(updateloans);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetTypesOfLoansSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await loansTypeService.GetTypesOfLoansSelectListAsync(cancellationToken);
            return Ok(model);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id, CancellationToken cancellationToken)
        {
            await loansTypeService.DeleteLoansType(id, cancellationToken);
            return Ok();
        }
    }
}