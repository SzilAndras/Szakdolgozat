package hu.bme.aut.reservationservice.reservation.service;

import hu.bme.aut.reservationservice.reservation.helper.AppointmentMapper;
import hu.bme.aut.reservationservice.reservation.model.Appointment;
import hu.bme.aut.reservationservice.reservation.model.AppointmentDto;
import hu.bme.aut.reservationservice.reservation.model.enums.AppointmentStatus;
import hu.bme.aut.reservationservice.reservation.model.enums.AppointmentType;
import hu.bme.aut.reservationservice.reservation.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {
    SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    private AppointmentRepository appointmentRepository;


    public List<AppointmentDto> getAllByDate(String date) {
        try {
            return appointmentRepository.findAllByDateAndStatusNot(formatter.parse(date), AppointmentStatus.REJECTED).stream().map(AppointmentMapper::mapToDto).collect(Collectors.toList());
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<AppointmentDto> getAllClosedByDate(String date) {
        try {
            return appointmentRepository.findAllByDateAndType(formatter.parse(date), AppointmentType.CLOSED).stream().map(AppointmentMapper::mapToDto).collect(Collectors.toList());
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void saveClosed(List<AppointmentDto> appointmentDtoList) {
        appointmentDtoList.forEach(
                app -> {
                    Appointment appointment = AppointmentMapper.mapFromDto(app);
                    appointment.setStatus(AppointmentStatus.ACCEPTED);
                    appointment.setType(AppointmentType.CLOSED);
                    appointment.setReservation(null);
                    appointmentRepository.save(appointment);
                }
        );
    }

}
