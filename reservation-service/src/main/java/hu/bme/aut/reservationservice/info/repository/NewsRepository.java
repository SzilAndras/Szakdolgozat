package hu.bme.aut.reservationservice.info.repository;

import hu.bme.aut.reservationservice.info.model.News;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NewsRepository extends CrudRepository<News, Long> {

    List<News> findAll();
}
