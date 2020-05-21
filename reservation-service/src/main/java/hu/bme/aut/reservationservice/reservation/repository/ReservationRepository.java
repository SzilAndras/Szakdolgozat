package hu.bme.aut.reservationservice.reservation.repository;

import hu.bme.aut.reservationservice.reservation.model.enums.Status;
import hu.bme.aut.reservationservice.reservation.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long>, JpaSpecificationExecutor<Reservation> {
    List<Reservation> findAll();

    List<Reservation> findAllByUserId(Long id);

    List<Reservation> findAllByAdminStatus(Status status);

    List<Reservation> findAllByUserStatus(Status status);

    List<Reservation> findAllByUserIdAndPlateNumberAndVehicleType(Long id, String plateNumber, String vehicleType);
    // TODO by Status
}
