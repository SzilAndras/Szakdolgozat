package hu.bme.aut.infoservice.repository;

import hu.bme.aut.infoservice.model.News;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NewsRepository extends CrudRepository<News, Long> {

    List<News> findAll();
}
