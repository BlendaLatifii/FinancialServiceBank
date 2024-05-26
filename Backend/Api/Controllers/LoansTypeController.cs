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
    public class LoansTypeController : ControllerBase
    {
        private readonly ILoansTypeService loansTypeService;
        private readonly AppDbContext appDbContext;

        public LoansTypeController(ILoansTypeService loansTypeService, AppDbContext appDbContext)
        {
            this.loansTypeService = loansTypeService;
            this.appDbContext = appDbContext;
        }
        [HttpGet]
        public async Task<ActionResult<List<LoansTypeModel>>> GetAllLoansTypesAsync(CancellationToken cancellationToken)
        {
            var acc = await loansTypeService.GetAllLoansTypesAsync(cancellationToken);
            return Ok(acc);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLoansTypeById(Guid id, CancellationToken cancellationToken)
        {
            var model = await loansTypeService.GetLoansTypeById(id, cancellationToken);
            return Ok(model);
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateLoansTypeAsync(LoansTypeModel model, CancellationToken cancellationToken)
        {
            var updateloans = await loansTypeService.CreateOrUpdateLoansType(model, cancellationToken);
            return Ok(updateloans);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id, CancellationToken cancellationToken)
        {
            await loansTypeService.DeleteLoansType(id, cancellationToken);
            return Ok();
        }
    }
}