package hu.bme.aut.reservationservice.repository.specification;

import hu.bme.aut.reservationservice.model.Reservation;
import hu.bme.aut.reservationservice.model.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ReservationSpecificationsBuilder {

    private final List<SearchCriteria> params;

    public ReservationSpecificationsBuilder() {
        params = new ArrayList<SearchCriteria>();
    }

    public ReservationSpecificationsBuilder with(String key, String operation, Object value) {
        params.add(new SearchCriteria(key, operation, value));
        return this;
    }

    public Specification<Reservation> build() {
        if (params.isEmpty()) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(ReservationSpecification::new)
                .collect(Collectors.toList());

        Specification result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = Specification.where(result).and(specs.get(i));
        }
        return result;
    }
}
