namespace Domain.Entities
{
    public class Branch
    {
        public int BranchId { get; set; } = default!;
        public string BranchName { get; set; } = default!;
        public string Adress { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string Opened { get; set; } = default!;
    }
}
