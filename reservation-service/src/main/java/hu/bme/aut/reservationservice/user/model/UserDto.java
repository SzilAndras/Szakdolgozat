package hu.bme.aut.reservationservice.user.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {

    private Long id;

    private String username;

    private String fullName;

    private String email;

    private String phone;
}
