package hu.bme.aut.reservationservice.shared.repository;

import hu.bme.aut.reservationservice.user.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
}
