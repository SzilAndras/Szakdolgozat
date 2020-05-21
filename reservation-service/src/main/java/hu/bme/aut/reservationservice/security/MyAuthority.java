package hu.bme.aut.reservationservice.security;

import hu.bme.aut.reservationservice.user.model.enums.Role;
import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;

@Builder
public class MyAuthority implements GrantedAuthority {

    private Role role;

    @Override
    public String getAuthority() {
        return role.toString();
    }
}
