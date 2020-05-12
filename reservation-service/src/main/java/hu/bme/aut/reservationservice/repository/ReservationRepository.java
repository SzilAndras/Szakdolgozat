package hu.bme.aut.reservationservice.repository;

import hu.bme.aut.reservationservice.model.Enum.Status;
import hu.bme.aut.reservationservice.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long>, JpaSpecificationExecutor<Reservation> {
    List<Reservation> findAll();

    List<Reservation> findAllByUserId(Long id);

    List<Reservation> findAllByAdminStatus(Status status);

    List<Reservation> findAllByUserStatus(Status status);

    List<Reservation> findAllByUserIdAndPlateNumberAndVehicleType(Long id, String plateNumber, String vehicleType);
    // TODO by Status
}
