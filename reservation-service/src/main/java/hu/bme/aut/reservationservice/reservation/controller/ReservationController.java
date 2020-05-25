package hu.bme.aut.reservationservice.reservation.controller;

import hu.bme.aut.reservationservice.reservation.model.enums.Status;
import hu.bme.aut.reservationservice.reservation.model.ReservationDto;
import hu.bme.aut.reservationservice.reservation.service.ReservationService;
import hu.bme.aut.reservationservice.user.model.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    ReservationService reservationService;


    @GetMapping
    public Slice<ReservationDto> getByFilter(@RequestParam("page") int page,
                                                @RequestParam("size") int size,
                                                @RequestParam("search") String search,
                                                @RequestAttribute("user") String user,
                                                @RequestAttribute("role") Role role
                                             ) {
        return reservationService.getByFilter(search, page, size, user, role);
    }



    @PostMapping(path = "/save")
    public ReservationDto save(@RequestBody ReservationDto reservation,
                               @RequestAttribute("user") String user,
                               @RequestAttribute("role") Role role) {

        return reservationService.save(reservation, user, role);
    }

    @PostMapping(path = "/accept")
    public ReservationDto accept(@RequestParam("id") Long id, @RequestAttribute("user") String user,
                                 @RequestAttribute("role") Role role) {
        return reservationService.accept(user, role, id);
    }

    @PostMapping(path = "/reject")
    public ReservationDto reject(@RequestParam("id") Long id, @RequestAttribute("user") String user,
                                 @RequestAttribute("role") Role role) {
        return reservationService.reject(user, role, id);
    }

    @PostMapping(path = "/suggest")
    public ReservationDto suggest(@RequestBody ReservationDto reservation,
                               @RequestAttribute("user") String user,
                               @RequestAttribute("role") Role role) {

        return reservationService.suggest(reservation, user, role);
    }



}
