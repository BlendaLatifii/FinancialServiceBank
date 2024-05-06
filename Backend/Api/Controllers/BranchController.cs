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

        [HttpGet("{branchId}")]
        public async Task<IActionResult> GetBranchById([FromRoute] Guid branchId, CancellationToken cancellationToken)
        {
            var model = await branchService.GetBranchById(branchId, cancellationToken);
            return Ok(model);
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateBranchAsync(BranchModel model, CancellationToken cancellationToken)
        {
            var updateBranch = await branchService.CreateOrUpdateBranchAsync(model, cancellationToken);
            return Ok(updateBranch);
        }

        [HttpDelete("{branchId}")]
        public async Task<IActionResult> DeleteBranch(Guid branchId, CancellationToken cancellationToken)
        {
            await branchService.DeleteBranch(branchId, cancellationToken);
            return Ok();
        }
    }
}