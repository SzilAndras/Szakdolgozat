package hu.bme.aut.reservationservice.user.model;

import lombok.Data;

@Data
public class RegistrationDto {
     private String username;
     private String password;
     private String email;
     private String phone;
     private String name;
}
