package hu.bme.aut.reservationservice.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class SearchCriteria {
    private String key;
    private String operation;
    private Object value;

}
