﻿using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class Loan 
    {
        public Guid Id { get; set; }
        public string LlojiIKredise { get; set; } = string.Empty;
        public decimal ShumaEKredise { get; set; }
        public decimal NormaEInteresit { get; set; }
        public decimal KohaEKredise { get; set; }
        public decimal Rroga6mujore { get; set; }
        public decimal KestiIKredise { get; set; }
        public string StatusiIPunesise { get; set; } = string.Empty;

    }
}