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
    public class BranchController : ControllerBase
    {
        private readonly AppDbContext appDbContext;
        private readonly IBranchService branchService;
        public BranchController(AppDbContext appDbContext, IBranchService branchService)
        {
            this.appDbContext = appDbContext;
            this.branchService = branchService;

        }
        [HttpGet]
        public async Task<ActionResult<List<BranchModel>>> GetAllBranchesAsync(CancellationToken cancellationToken)
        {
            var branches = await branchService.GetAllBranchesAsync(cancellationToken);

            return Ok(branches);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetBranchById(int branchId, CancellationToken cancellationToken)
        {
            await branchService.GetBranchById(branchId, cancellationToken);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult<BranchModel>> CreateBranch([FromBody] BranchModel model, CancellationToken cancellationToken)
        {
            var branch = new Branch()
            {
                BranchName = model.BranchName,
                Adress = model.Adress,
                PhoneNumber = model.PhoneNumber,
                Opened = model.Opened
            };

            await appDbContext.Branches.AddAsync(branch);
            await appDbContext.SaveChangesAsync(cancellationToken);

            return CreatedAtAction(nameof(GetBranchById), new { Id = model.BranchId });
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateBranch([FromRoute] int id, [FromBody] BranchModel model, CancellationToken cancellationToken)
        {
            var branches = await appDbContext.Branches
               .Where(x => x.BranchId == id)
               .FirstOrDefaultAsync(cancellationToken);

            if (branches == null)
            {
                return NotFound();
            }

            branches.BranchName = model.BranchName;
            branches.Adress = model.Adress;
            branches.PhoneNumber = model.PhoneNumber;
            branches.Opened = model.Opened;

            await appDbContext.SaveChangesAsync(cancellationToken);

            var updatedBranchModel = new BranchModel
            {
                BranchId = branches.BranchId,
                BranchName = branches.BranchName,
                Adress = branches.Adress,
                PhoneNumber = branches.PhoneNumber,
                Opened = branches.Opened
            };
            return Ok(updatedBranchModel);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBranch(CancellationToken cancellationToken, int id)
        {
            await branchService.DeleteBranch(id, cancellationToken);
            return Ok();
        }
    }
}