package hu.bme.aut.reservationservice.reservation.service;

import hu.bme.aut.reservationservice.reservation.helper.AppointmentMapper;
import hu.bme.aut.reservationservice.reservation.model.AppointmentDto;
import hu.bme.aut.reservationservice.reservation.model.enums.AppointmentStatus;
import hu.bme.aut.reservationservice.reservation.model.enums.AppointmentType;
import hu.bme.aut.reservationservice.reservation.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {
    SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<AppointmentDto> getAll() {
        return appointmentRepository.findAll().stream().map(AppointmentMapper::mapToDto).collect(Collectors.toList());
    }

    public List<AppointmentDto> getAllByDate(String date) {
        try {
            return appointmentRepository.findAllByDateAndStatusNot(formatter.parse(date), AppointmentStatus.REJECTED).stream().map(AppointmentMapper::mapToDto).collect(Collectors.toList());
        } catch (ParseException e) {
            e.printStackTrace();
            return null; // TODO error invalid date
        }
    }


    public List<AppointmentDto> getAllByDateAndStatus(Date date, AppointmentStatus status) {
        return appointmentRepository.findAllByDateAndStatus(date, status).stream().map(AppointmentMapper::mapToDto).collect(Collectors.toList());
    }

    public List<AppointmentDto> getAllByDateAndType(Date date, AppointmentType type) {
        return appointmentRepository.findAllByDateAndType(date, type).stream().map(AppointmentMapper::mapToDto).collect(Collectors.toList());
    }
}