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
    public class BranchController : ControllerBase
    {
        private readonly IBranchService branchService;
        public BranchController(IBranchService branchService)
        {
            this.branchService = branchService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<BranchModel>>> GetAllBranchesAsync(CancellationToken cancellationToken)
        {
            var branches = await branchService.GetAllBranchesAsync(cancellationToken);

            return Ok(branches);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{branchId}")]
        public async Task<IActionResult> GetBranchById([FromRoute] Guid branchId, CancellationToken cancellationToken)
        {
            var model = await branchService.GetBranchById(branchId, cancellationToken);
            return Ok(model);
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetBranchesSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await branchService.GetBranchesSelectListAsync(cancellationToken);
            return Ok(model);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateBranchAsync(BranchModel model, CancellationToken cancellationToken)
        {
            var updateBranch = await branchService.CreateOrUpdateBranchAsync(model, cancellationToken);
            return Ok(updateBranch);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{branchId}")]
        public async Task<IActionResult> DeleteBranch(Guid branchId, CancellationToken cancellationToken)
        {
            await branchService.DeleteBranch(branchId, cancellationToken);
            return Ok();
        }
    }
}