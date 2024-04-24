using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class LoanModel
    {
        
        public int Id { get; set; }
        public string LlojiIKredise { get; set; } = string.Empty;
        public decimal ShumaEKredise { get; set; }
        public decimal NormaEInteresit { get; set; }
        public decimal KohaEKredise { get; set; }
        public string MetodaEKredise { get; set; } = string.Empty;
        public decimal Rroga6mujore { get; set; }
        public decimal KestiIKredise { get; set; }
        public string StatusiIPunesise { get; set; } = string.Empty;

    }
}