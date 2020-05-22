package hu.bme.aut.reservationservice.info.repository;

import hu.bme.aut.reservationservice.info.model.Info;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface InfoRepository extends CrudRepository<Info, Long> {
    List<Info> findAll();

/*
    void deleteById(Long id);
*/
}
