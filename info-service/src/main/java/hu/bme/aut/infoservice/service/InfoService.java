package hu.bme.aut.infoservice.service;

import hu.bme.aut.infoservice.model.Info;
import hu.bme.aut.infoservice.model.InfoDto;
import hu.bme.aut.infoservice.repository.InfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InfoService {

    @Autowired
    InfoRepository infoRepository;

    public List<InfoDto> getAllInfo() {
        return infoRepository.findAll().stream().map(info ->
            InfoDto.builder()
                    .id(info.getId())
                    .label(info.getLabel())
                    .type(info.getType())
                    .value(info.getValue())
                    .build()).collect(Collectors.toList());
    }

    public InfoDto saveInfo(InfoDto info) {
        Info savedInfo =  infoRepository.save(Info.builder()
                .id(info.getId())
                .label(info.getLabel())
                .type(info.getType())
                .value(info.getValue())
                .build()
        );
        return InfoDto.builder()
                .id(savedInfo.getId())
                .label(savedInfo.getLabel())
                .type(savedInfo.getType())
                .value(savedInfo.getValue())
                .build();
    }

    public void deleteInfo(Long id) {
        infoRepository.deleteById(id);
    }
}
