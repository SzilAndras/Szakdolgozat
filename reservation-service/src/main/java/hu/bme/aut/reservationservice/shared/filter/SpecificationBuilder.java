package hu.bme.aut.reservationservice.shared.filter;

import hu.bme.aut.reservationservice.reservation.model.enums.Status;
import hu.bme.aut.reservationservice.user.model.enums.Role;
import org.springframework.data.jpa.domain.Specification;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SpecificationBuilder {

    private SpecificationBuilder() {
    }

    public static <T> Specification<T> build(String search, Long userId, Role role) {
        FilterSpecificationsBuilder<T> builder = new FilterSpecificationsBuilder<T>();
        Pattern pattern = Pattern.compile("(\\w+?)(:|<|>)(\\w+?),", Pattern.UNICODE_CHARACTER_CLASS);
        Matcher matcher = pattern.matcher(search + ",");
        while (matcher.find()) {
            if (matcher.group(1).contains("Status")) {
                Status status = Status.valueOf(matcher.group(3).toUpperCase());
                builder.with(matcher.group(1), matcher.group(2), status);
            } else {
                builder.with(matcher.group(1), matcher.group(2), matcher.group(3));
            }
        }
        if (userId != null && role == Role.USER ) {
            builder.with("userId", ":", userId);
        }

        return builder.build();

    }
}
