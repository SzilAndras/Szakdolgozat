package hu.bme.aut.reservationservice.info.controller;

import hu.bme.aut.reservationservice.info.model.InfoDto;
import hu.bme.aut.reservationservice.info.service.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/info")
public class InformationsController {

    @Autowired
    InfoService infoService;

    @GetMapping
    public List<InfoDto> getAllInfo() {
        return infoService.getAllInfo();
    }

    @PostMapping("/save")
    public InfoDto saveInfo(@RequestBody InfoDto info) {
        return infoService.saveInfo(info);
    }

    @DeleteMapping("/delete")
    public void deleteInfo(@RequestBody InfoDto info) {
        infoService.deleteInfo(info.getId());
    }

}
