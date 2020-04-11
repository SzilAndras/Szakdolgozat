package hu.bme.aut.reservationservice.repository;

import hu.bme.aut.reservationservice.model.Work;
import org.springframework.data.repository.CrudRepository;

public interface WorkRepository extends CrudRepository<Work, Long> {
}
