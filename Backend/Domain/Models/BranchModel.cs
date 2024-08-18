namespace Domain.Models
{
    public class BranchModel
    {
        public Guid? BranchId { get; set; } = default!;
        public Guid? UserId { get; set; } = default!;
        public string BranchName { get; set; } = default!;
        public string? UserName { get; set; } = default!;
        public string Address { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string Opened { get; set; } = default!;
    }
}