package hu.bme.aut.reservationservice.user.helper;

import hu.bme.aut.reservationservice.user.model.User;
import hu.bme.aut.reservationservice.user.model.UserDto;

public class UserMapper {

    private UserMapper() {
    }

    public static UserDto mapToDto(User user) {
        return UserDto
                .builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .username(user.getUsername())
                .build();
    }

    public static User mapFromDto(UserDto user) {
        return User
                .builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .username(user.getUsername())
                .build();
    }
}
