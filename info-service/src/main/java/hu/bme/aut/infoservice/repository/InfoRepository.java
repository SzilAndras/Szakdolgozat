package hu.bme.aut.infoservice.repository;

import hu.bme.aut.infoservice.model.Info;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface InfoRepository extends CrudRepository<Info, Long> {
    List<Info> findAll();

/*
    void deleteById(Long id);
*/
}
