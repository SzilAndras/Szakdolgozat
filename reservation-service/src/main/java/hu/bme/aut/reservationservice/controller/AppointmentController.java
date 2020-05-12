package hu.bme.aut.reservationservice.controller;

import hu.bme.aut.reservationservice.model.AppointmentDto;
import hu.bme.aut.reservationservice.model.Enum.AppointmentStatus;
import hu.bme.aut.reservationservice.model.Enum.AppointmentType;
import hu.bme.aut.reservationservice.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {
    long UserID = 1;

    @Autowired
    AppointmentService appointmentService;

    @GetMapping
    public List<AppointmentDto> getAll() {
        return appointmentService.getAll();
    }

    @GetMapping(path = "/byDateAndStatus/{date}/{status}")
    public List<AppointmentDto> getAllByDateAndStatus(@PathVariable("date") Date date,
                                                      @PathVariable("status") AppointmentStatus status) {
        return appointmentService.getAllByDateAndStatus(date, status);
    }

    @GetMapping(path = "/byDateAndType/{date}/{type}")
    public List<AppointmentDto> getAllByDateAndType(@PathVariable("date") Date date,
                                                    @PathVariable("type") AppointmentType type) {
        return appointmentService.getAllByDateAndType(date, type);
    }
}
