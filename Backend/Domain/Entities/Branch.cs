namespace Domain.Entities
{
    public class Branch
    {
        public Guid BranchId { get; set; } = default!;
        public string BranchName { get; set; } = default!;
        public string Address { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string Opened { get; set; } = default!;
    }
}
