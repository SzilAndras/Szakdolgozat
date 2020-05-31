package hu.bme.aut.reservationservice.reservation.controller;

import hu.bme.aut.reservationservice.reservation.model.AppointmentDto;
import hu.bme.aut.reservationservice.reservation.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @GetMapping
    public List<AppointmentDto> getAllByDate(@RequestParam("date") String date) {
        return appointmentService.getAllByDate(date);
    }

    @GetMapping("/closed")
    public List<AppointmentDto> getAllClosedByDate(@RequestParam("date") String date) {
        return appointmentService.getAllClosedByDate(date);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/closed")
    public ResponseEntity saveClosedAppointments(@RequestBody List<AppointmentDto> appointmentDtoList) {
        appointmentService.saveClosed(appointmentDtoList);
        return new ResponseEntity(HttpStatus.OK);
    }

}
