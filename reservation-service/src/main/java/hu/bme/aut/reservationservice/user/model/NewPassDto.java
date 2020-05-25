package hu.bme.aut.reservationservice.user.model;

import lombok.Data;

@Data
public class NewPassDto {
    String oldPass;
    String pass0;
    String pass1;
}
