﻿using Microsoft.AspNetCore.Identity;


namespace Domain.Entities
{
    public class UserRole : IdentityUserRole<Guid>
    {
        public override Guid UserId { get; set; }

        public override Guid RoleId { get; set; }
        public User User { get; set; } = default!;
        public Role Role { get; set; } = default!;
    }
}
