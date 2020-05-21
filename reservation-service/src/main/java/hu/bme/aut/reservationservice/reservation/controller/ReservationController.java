package hu.bme.aut.reservationservice.reservation.controller;

import hu.bme.aut.reservationservice.reservation.model.enums.Status;
import hu.bme.aut.reservationservice.reservation.model.ReservationDto;
import hu.bme.aut.reservationservice.reservation.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/reservation")
public class ReservationController {
    long userID = 1;


    @Autowired
    ReservationService reservationService;


    @GetMapping
    public Slice<ReservationDto> getByFilter(@RequestParam("page") int page,
                                                @RequestParam("size") int size,
                                                @RequestParam("search") String search) {
        return reservationService.getByFilter(search, page, size);
    }



    @PostMapping(path = "/save")
    public ReservationDto save(@RequestBody ReservationDto reservation) {
        reservation.setUserId(userID);
        reservation.setUserStatus(Status.PENDING);

        return reservationService.save(reservation);
    }

    @PostMapping(path = "/accept")
    public ReservationDto acceptByUser(@RequestParam("id") Long id) {
        return null;
    }
}
