using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientBankAccountController : ControllerBase
    {
        private readonly IClientBankAccountService clientBankAccService;
        public ClientBankAccountController(IClientBankAccountService clientBankAccService)
        {
            this.clientBankAccService = clientBankAccService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<ClientBankAccountModel>>> GetAllClientBankAccountAsync(CancellationToken cancellationToken)
        {
            var clientAcc = await clientBankAccService.GetAllClientBankAccountAsync(cancellationToken);

            return Ok(clientAcc);
        }
        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetClientAccountSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await clientBankAccService.GetClientAccountsSelectListAsync(cancellationToken);
            return Ok(model);
        }
        [HttpGet("personalNumber/{personalNumber}")]
        public async Task<ActionResult<List<ClientBankAccountModel>>> GetByPersonalNumberAsync(string personalNumber, CancellationToken cancellationToken)
        {
            var clientAcc = await clientBankAccService.GetByPersonalNumberAsync(personalNumber, cancellationToken);

            return Ok(clientAcc);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetClientBankAccountCount(CancellationToken cancellationToken)
        {
            var count = await clientBankAccService.GetClientBankAccountCount(cancellationToken);
            return Ok(count);
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientAccountById([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var model = await clientBankAccService.GetClientAccountById(id, cancellationToken);
            return Ok(model);
        }

        [Authorize(Roles = "Admin, Member")]
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateClientBankAccount(ClientBankAccountModel model, CancellationToken cancellationToken)
        {
            var updateBankAcc = await clientBankAccService.CreateOrUpdateClientBankAccount(model, cancellationToken);
            return Ok(updateBankAcc);
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClientBankAccount(Guid id, CancellationToken cancellationToken)
        {
            await clientBankAccService.DeleteClientBankAccount(id, cancellationToken);
            return Ok();
        }

        [HttpPost("deduct-maintenance-fees-after-a-month")]
        public async Task<IActionResult> DeductMaintenanceFeesAfterAMonth(CancellationToken cancellationToken)
        {
            try
            {
                await clientBankAccService.DeductMaintenanceFeesAfterAMonth(cancellationToken);
                return Ok("Maintenance fees deducted after a month successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("student-accounts/clients")]
        public async Task<IActionResult> GetStudentAccountClients(CancellationToken cancellationToken)
        {
            var clientNames = await clientBankAccService.GetStudentAccountClientsAsync(cancellationToken);
            return Ok(clientNames);
        }
    }
}
