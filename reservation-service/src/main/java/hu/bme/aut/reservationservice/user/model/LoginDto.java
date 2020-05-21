package hu.bme.aut.reservationservice.user.model;

import lombok.Data;

@Data
public class LoginDto {
    private String username;
     private String password;
}
