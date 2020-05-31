package hu.bme.aut.reservationservice.rating.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="ratings")
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Setter(value = AccessLevel.PACKAGE)
@Getter
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String authorName;

    @Column
    private int score;

    @Column
    private String comment;
}
