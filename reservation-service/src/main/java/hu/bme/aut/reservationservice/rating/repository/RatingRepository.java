package hu.bme.aut.reservationservice.rating.repository;

import hu.bme.aut.reservationservice.rating.model.Rating;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RatingRepository extends CrudRepository<Rating, Long> {

    List<Rating> findAll();

}
