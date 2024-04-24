using Infrastructure.Data;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        private readonly AppDbContext appDbContext;
        private readonly ILoanService _loanService;

        public LoanController(AppDbContext appDbContext, ILoanService _loanService)
        {
            this.appDbContext = appDbContext;
            this._loanService = _loanService;
        }
        [HttpGet]
        public async Task<ActionResult<List<LoanModel>>> GetAllLoansAsync(CancellationToken cancellationToken)
        {
            var loans = await _loanService.GetAllLoansAsync(cancellationToken);

            return Ok(loans);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetLoanById(int Id, CancellationToken cancellationToken)
        {
            await _loanService.GetLoanById(Id, cancellationToken);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult<LoanModel>> CreateLoan(LoanModel model)
        {
            var loan = new Loan
            {
                LlojiIKredise = model.LlojiIKredise,
                ShumaEKredise = model.ShumaEKredise,
                NormaEInteresit = model.NormaEInteresit,
                KohaEKredise = model.KohaEKredise,
                MetodaEKredise = model.MetodaEKredise,
                KestiIKredise = model.KestiIKredise,
                StatusiIPunesise = model.StatusiIPunesise,

            };

            appDbContext.Loans.Add(loan);
            await appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLoanById), new { id = loan.Id }, loan);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateLoan([FromRoute] int id, LoanModel model, CancellationToken cancellationToken)
        {
            var loans = await appDbContext.Loans
               .Where(x => x.Id == id)
               .FirstOrDefaultAsync(cancellationToken);

            if (loans == null)
            {
                return NotFound();
            }

            loans.LlojiIKredise = model.LlojiIKredise;
            loans.ShumaEKredise = model.ShumaEKredise;
            loans.NormaEInteresit = model.NormaEInteresit;
            loans.MetodaEKredise = model.MetodaEKredise;
            loans.KohaEKredise = model.KohaEKredise;
            loans.KestiIKredise = model.KestiIKredise;
            loans.StatusiIPunesise = model.StatusiIPunesise;

            await appDbContext.SaveChangesAsync(cancellationToken);

            var updatedLoanModel = new LoanModel
            {
                LlojiIKredise = loans.LlojiIKredise,
                ShumaEKredise = loans.ShumaEKredise,
                NormaEInteresit = loans.NormaEInteresit,
                MetodaEKredise = loans.MetodaEKredise,
                KohaEKredise = loans.KohaEKredise,
                KestiIKredise = loans.KestiIKredise,
                StatusiIPunesise = loans.StatusiIPunesise
            };

            return Ok(updatedLoanModel);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoan(int loanId, CancellationToken cancellationToken)
        {
            await _loanService.DeleteLoan(loanId, cancellationToken);
            return Ok();
        }
    }
}
