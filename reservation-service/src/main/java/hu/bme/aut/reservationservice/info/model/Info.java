package hu.bme.aut.reservationservice.info.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "informations")
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Setter(value = AccessLevel.PACKAGE)
@Getter
public class Info {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String label;
    private String type;
    private String value;

}
