package hu.bme.aut.reservationservice.info.controller;

import hu.bme.aut.reservationservice.info.model.NewsDto;
import hu.bme.aut.reservationservice.info.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("home/news")
public class NewsController {

    @Autowired
    NewsService newsService;

    @GetMapping
    public List<NewsDto> getAllNews(){
        return newsService.getAllNews();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/save")
    public NewsDto saveNews(@RequestBody NewsDto news, @RequestAttribute("user") String user) {
        return newsService.saveNews(news, user);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete")
    public void deleteNews(@RequestBody NewsDto news) {
        newsService.deleteNews(news);
    }
}
