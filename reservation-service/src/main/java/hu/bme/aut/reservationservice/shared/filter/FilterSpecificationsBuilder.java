package hu.bme.aut.reservationservice.shared.filter;

import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class FilterSpecificationsBuilder<T> {

    private final List<SearchCriteria> params;

    public FilterSpecificationsBuilder() {
        params = new ArrayList<>();
    }

    public FilterSpecificationsBuilder<T> with(String key, String operation, Object value) {
        params.add(new SearchCriteria(key, operation, value));
        return this;
    }

    public Specification<T> build() {
        if (params.isEmpty()) {
            return null;
        }

        List<Specification<T>> specs = params.stream()
                .map(FilterSpecification<T>::new)
                .collect(Collectors.toList());

        Specification<T> result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = Specification.where(result).and(specs.get(i)); // TODO null pointer
        }
        return result;
    }

}
