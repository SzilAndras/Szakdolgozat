package hu.bme.aut.reservationservice.controller;

import hu.bme.aut.reservationservice.model.Enum.Status;
import hu.bme.aut.reservationservice.model.Reservation;
import hu.bme.aut.reservationservice.model.ReservationDto;
import hu.bme.aut.reservationservice.repository.specification.ReservationSpecificationsBuilder;
import hu.bme.aut.reservationservice.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/reservation")
public class ReservationController {
    long userID = 1;


    @Autowired
    ReservationService reservationService;


    @GetMapping
    public List<ReservationDto> getAllByFilter(@RequestParam(value = "search") String search) {
        return reservationService.getAllByFilter(search);
    }



    @PostMapping(path = "/save")
    public ReservationDto save(@RequestBody ReservationDto reservation) {
        reservation.setUserId(userID);
        System.out.print(reservation);

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
