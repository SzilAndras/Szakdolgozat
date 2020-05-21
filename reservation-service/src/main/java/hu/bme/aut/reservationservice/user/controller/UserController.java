package hu.bme.aut.reservationservice.user.controller;

import hu.bme.aut.reservationservice.user.model.LoginDto;
import hu.bme.aut.reservationservice.user.model.RegistrationDto;
import hu.bme.aut.reservationservice.user.model.UserDto;
import hu.bme.aut.reservationservice.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;



    @PostMapping("/registration")
    public UserDto registration(@RequestBody()RegistrationDto registration) {
        return userService.registration(registration);
    }

    @PostMapping("/login")
    public LoginDto login(@RequestBody() LoginDto login) {
        return login;
    }



    @PostMapping("/save")
    public UserDto save(UserDto user) {
        return userService.save(user);
    }

    @PostMapping("/resetPass")
    public String resetPass() {
        return userService.resetPass(null);
    }
}
