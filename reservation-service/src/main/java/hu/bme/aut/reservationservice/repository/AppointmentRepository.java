package hu.bme.aut.reservationservice.repository;

import hu.bme.aut.reservationservice.model.Appointment;
import hu.bme.aut.reservationservice.model.Enum.AppointmentStatus;
import hu.bme.aut.reservationservice.model.Enum.AppointmentType;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface AppointmentRepository extends CrudRepository<Appointment, Long> {
    List<Appointment> findAll();

    List<Appointment> findAllByDateAndStatus(Date date, AppointmentStatus status);

    List<Appointment> findAllByDateAndStatusNot(Date date, AppointmentStatus status);

    List<Appointment> findAllByDateAndType(Date date, AppointmentType type);
}
