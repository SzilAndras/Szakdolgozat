package hu.bme.aut.reservationservice.service;

import hu.bme.aut.reservationservice.helper.ReservationMapper;
import hu.bme.aut.reservationservice.model.Enum.Status;
import hu.bme.aut.reservationservice.model.Reservation;
import hu.bme.aut.reservationservice.model.ReservationDto;
import hu.bme.aut.reservationservice.repository.ReservationRepository;
import hu.bme.aut.reservationservice.repository.specification.ReservationSpecificationsBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<ReservationDto> getAll() {
        return reservationRepository.findAll().stream().map(ReservationMapper::mapToReservationDto).collect(Collectors.toList());
    }

    public List<ReservationDto> getAllByUserId(Long id) {
        return reservationRepository.findAllByUserId(id).stream().map(ReservationMapper::mapToReservationDto).collect(Collectors.toList());
    }

    public ReservationDto save(ReservationDto reservation) {
        return ReservationMapper.mapToReservationDto(reservationRepository.save(ReservationMapper.mapFromReservationDto(reservation)));
    }

    public void delete(Long id) {
        reservationRepository.deleteById(id);
    }

    public List<ReservationDto> getAllByUserStatus(Status status) {
        return reservationRepository.findAllByUserStatus(status).stream().map(ReservationMapper::mapToReservationDto).collect(Collectors.toList());
    }

    public List<ReservationDto> getAllByAdminStatus(Status status) {
        return reservationRepository.findAllByAdminStatus(status).stream().map(ReservationMapper::mapToReservationDto).collect(Collectors.toList());
    }


    public List<ReservationDto> getAllByFilter(String search) {
        ReservationSpecificationsBuilder builder = new ReservationSpecificationsBuilder();
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

        Specification<Reservation> spec = builder.build();

        return reservationRepository.findAll(spec).stream().map(ReservationMapper::mapToReservationDto).collect(Collectors.toList());

    }
}
