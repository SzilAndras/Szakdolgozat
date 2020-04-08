package hu.bme.aut.ratingservice.repository;

import hu.bme.aut.ratingservice.model.Rating;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RatingRepository extends CrudRepository<Rating, Long> {

    List<Rating> findAll();

}
