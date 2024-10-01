using Infrastructure.Data;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        private readonly ILoanService _loanService;
        private readonly AppDbContext appDbContext;

        public LoanController(AppDbContext appDbContext, ILoanService _loanService)
        {
            this.appDbContext = appDbContext;
            this._loanService = _loanService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<LoanModel>>> GetAllLoansAsync(CancellationToken cancellationToken)
        {
            var loans = await _loanService.GetAllLoansAsync(cancellationToken);

            return Ok(loans);
        }
       
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLoanById([FromRoute]Guid id, CancellationToken cancellationToken)
        {
            var model = await _loanService.GetLoanByIdAsync(id, cancellationToken);
            return Ok(model);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetLoanssCount(CancellationToken cancellationToken)
        {
            var count = await _loanService.CountAllLoansAsync(cancellationToken);
            return Ok(count);
        }
        [Authorize(Roles = "Admin, Member")]
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateLoanAsync([FromBody]LoanModel model, CancellationToken cancellationToken)
        {
            var updateLoan = await _loanService.CreateOrUpdateLoanAsync(model, cancellationToken);
            return Ok(updateLoan);
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoan(Guid id, CancellationToken cancellationToken)
        {
            await _loanService.DeleteLoan(id, cancellationToken);
            return Ok();
        }
    }
}
