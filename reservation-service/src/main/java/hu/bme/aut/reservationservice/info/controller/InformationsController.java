package hu.bme.aut.reservationservice.info.controller;

import hu.bme.aut.reservationservice.info.model.InfoDto;
import hu.bme.aut.reservationservice.info.service.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/home/info")
public class InformationsController {

    @Autowired
    InfoService infoService;

    @GetMapping
    public List<InfoDto> getAllInfo() {
        return infoService.getAllInfo();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/save")
    public InfoDto saveInfo(@RequestBody InfoDto info) {
        return infoService.saveInfo(info);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete")
    public void deleteInfo(@RequestBody InfoDto info) {
        infoService.deleteInfo(info.getId());
    }

}
