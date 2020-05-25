package hu.bme.aut.reservationservice.user.controller;

import hu.bme.aut.reservationservice.user.model.LoginDto;
import hu.bme.aut.reservationservice.user.model.NewPassDto;
import hu.bme.aut.reservationservice.user.model.RegistrationDto;
import hu.bme.aut.reservationservice.user.model.UserDto;
import hu.bme.aut.reservationservice.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;


    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping("/ping")
    public List<String> ping(@RequestAttribute("user") String user, @RequestAttribute("role") String role) {
        return new ArrayList<>() {{
            add(user);
            add(role);
        }};
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @GetMapping("/role")
    public String role( @RequestAttribute("role") String role) {
        return role;
    }


    @PostMapping("/registration")
    public UserDto registration(@RequestBody()RegistrationDto registration) {
        return userService.registration(registration);
    }

    @PostMapping("/login")
    public LoginDto login(@RequestBody() LoginDto login) {
        return login;
    }

/*    @PostMapping("/save")
    public UserDto save(UserDto user) {
        return userService.save(user);
    }*/

    @GetMapping("/find")
    public UserDto findUser(@RequestAttribute("user") String user) {
        return userService.findUserByUsernameDto(user);
    }

    @PostMapping("/save")
    public UserDto saveUser(@RequestBody() UserDto userDto, @RequestAttribute("user") String userName) {
        return userService.save(userDto, userName);
    }

    @PostMapping("pass")
    public UserDto newPass(@RequestBody() NewPassDto newPass, @RequestAttribute("user") String userName) {
        return userService.newPass(newPass, userName);
    }


    @PostMapping("/resetPass")
    public String resetPass() {
        return userService.resetPass(null);
    }
}
