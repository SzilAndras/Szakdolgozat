package hu.bme.aut.ratingservice.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="ratings")
@Builder
@Getter
@Setter
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private Long authorId;

    @Column
    private String authorName;

    @Column
    private int score;

    @Column
    private String comment;
}
