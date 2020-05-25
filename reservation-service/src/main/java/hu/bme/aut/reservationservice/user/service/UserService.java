package hu.bme.aut.reservationservice.user.service;

import hu.bme.aut.reservationservice.user.helper.UserMapper;
import hu.bme.aut.reservationservice.user.model.NewPassDto;
import hu.bme.aut.reservationservice.user.model.RegistrationDto;
import hu.bme.aut.reservationservice.user.model.User;
import hu.bme.aut.reservationservice.user.model.UserDto;
import hu.bme.aut.reservationservice.user.model.enums.Role;
import hu.bme.aut.reservationservice.shared.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public String login() {
        return null;
    }

    public UserDto registration(RegistrationDto registration) {
        registration.setPassword(bCryptPasswordEncoder.encode(registration.getPassword()));
        return UserMapper.mapToDto(userRepository.save(User.builder()
                .id(null)
                .email(registration.getEmail())
                .fullName(registration.getName())
                .phone(registration.getPhone())
                .role(Role.USER)
                .username(registration.getUsername())
                .password(registration.getPassword())
                .build())
        );
    }

    public UserDto save(UserDto user) {
        return user;
    }

    public UserDto save(UserDto newData, String username) {
        User user = this.userRepository.findByUsername(username);
        if (user.getId().equals(newData.getId())) {
            user.setEmail(newData.getEmail());
            user.setFullName(newData.getFullName());
            user.setPhone(newData.getPhone());
            return UserMapper.mapToDto(this.userRepository.save(user));
        }
        return null;
    }

    public UserDto newPass(NewPassDto pass, String username) {
        User user = this.userRepository.findByUsername(username);
        if (bCryptPasswordEncoder.matches(pass.getOldPass(), user.getPassword()) &&
                pass.getPass0().equals(pass.getPass1())
        ) {
            user.setPassword(bCryptPasswordEncoder.encode(pass.getPass0()));
            return UserMapper.mapToDto(userRepository.save(user));
        }

        return null;
    }

    public String resetPass(UserDto user) {
        return null;
    }

    public User findUserByUsername(String name) {
        return userRepository.findByUsername(name);
    }

    public UserDto findUserByUsernameDto(String name) {
        return UserMapper.mapToDto(userRepository.findByUsername(name));
    }
}
