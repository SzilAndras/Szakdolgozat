package hu.bme.aut.reservationservice.service;

import hu.bme.aut.reservationservice.helper.ReservationMapper;
import hu.bme.aut.reservationservice.model.Enum.Status;
import hu.bme.aut.reservationservice.model.ReservationDto;
import hu.bme.aut.reservationservice.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
}
