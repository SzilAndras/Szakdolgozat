package hu.bme.aut.reservationservice.reservation.repository;

import hu.bme.aut.reservationservice.reservation.model.Work;
import org.springframework.data.repository.CrudRepository;

public interface WorkRepository extends CrudRepository<Work, Long> {
}
