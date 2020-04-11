package hu.bme.aut.reservationservice.controller;

import hu.bme.aut.reservationservice.model.Enum.Status;
import hu.bme.aut.reservationservice.model.ReservationDto;
import hu.bme.aut.reservationservice.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @GetMapping
    public List<ReservationDto> getAll() {
        return reservationService.getAll();
    }

    @GetMapping(path = "/byUserId/{id}")
    public List<ReservationDto> getAllByUserId(@PathVariable("id") Long id) {
        return reservationService.getAllByUserId(id);
    }

    @PostMapping(path = "/save")
    public ReservationDto save(ReservationDto reservation) {
        return reservationService.save(reservation);
    }

    @DeleteMapping(path = "/delete")
    public void delete(@RequestBody ReservationDto reservation) { //
        reservationService.delete(reservation.getId());
    }

    @GetMapping(path = "/byUserStatus/{status}")
    public List<ReservationDto> getAllByUserStatus(@PathVariable("status") Status status) {
        return reservationService.getAllByUserStatus(status);
    }

    @GetMapping(path = "/byAdminStatus/{status}")
    public List<ReservationDto> getAllByAdminStatus(@PathVariable("status") Status status) {
        return reservationService.getAllByAdminStatus(status);
    }

}
