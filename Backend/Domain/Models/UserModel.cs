﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class UserModel
    {
        public Guid? Id { get;set; }
        public string Email { get; set; } = default!;
        public string UserName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string Token { get; set; } = default!;
    }
}
